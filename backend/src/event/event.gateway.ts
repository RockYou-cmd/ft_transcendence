import { Req, UseGuards } from "@nestjs/common";
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";
import { parse } from "cookie";
import { ChatService } from "src/chat/chat.service";
import { RoomService } from "src/room/room.service";
import { UserService } from "src/user/user.service";
import { messageGuard } from "./event.guard/message.guard";
import { gameGuard } from "./event.guard/game.guard";

@WebSocketGateway({
  cors: { credentials: true, origin: "http://localhost:3000" },
  namespace: "events",
})
export class EventGateway {
  constructor(
    private authGuard: AuthGuard,
    private chatService: ChatService,
    private roomService: RoomService,
    private userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  matches: Map<string, string>[] = [];

  async handleConnection(client: Socket) {
    const cookie = client.handshake.headers.cookie;
    if (cookie) {
      const access_token = parse(cookie).access_token;
      var { username } =
        await this.authGuard.extractPayloadFromToken(access_token);
      client.join(username);

      const userTabs = await this.server.in(username).fetchSockets();
      if (userTabs.length <= 1) {
        // console.log("less than 1");
        this.userService.updateData({ username }, { status: "ONLINE" });
      }
    }
    console.log(username, " CONNECTED");
    // console.log(this.matches[0].size);
  }

  async handleDisconnect(client: Socket) {
    const cookie = client.handshake.headers.cookie;
    if (cookie) {
      const access_token = parse(cookie).access_token;
      var { username } =
        await this.authGuard.extractPayloadFromToken(access_token);
      client.leave(username);
      const userTabs = await this.server.in(username).fetchSockets();
      if (!userTabs.length)
        this.userService.updateData({ username }, { status: "OFFLINE" });
    }
    console.log(username, " DISCONNECT");
  }

  @SubscribeMessage("message")
  @UseGuards(messageGuard)
  handleMessage(client: Socket, payload: any) {
    console.log("normal message event called");
    this.server.to(payload.receiver).emit("message", payload);
    this.chatService.sendMessage(payload);
  }

  @SubscribeMessage("roomMessage")
  @UseGuards(messageGuard)
  async handleRoomMessage(client: Socket, payload: any) {
    const userData = await this.roomService.getMemberShip(
      payload.chatId,
      payload.sender,
    );
    if (userData.status == "MUTED") {
      const now = new Date();
      if (userData.mutedTime > now) {
        client.emit("muted", { roomId: payload.chatId });
        return;
      } else
        this.roomService.unMuteMember({
          id: userData.roomId,
          username: userData.userId,
        });
    }
    payload.receivers.forEach((receiver) => {
      this.server
        .to(receiver.userId)
        .except(payload.sender)
        .emit("roomMessage", payload);
    });
    console.log("message Sent!");
    this.roomService.sendMessage(payload);
  }

  @SubscribeMessage("update")
  @UseGuards(messageGuard)
  handleBlock(client: Socket, payload: any) {
    if (payload.option === "block" || payload.option === "unblock")
      this.server
        .to(payload.receiver)
        .to(payload.sender)
        .emit("update", payload);
    else this.server.to(payload.receiver).emit("update", payload);
  }

  @SubscribeMessage("matchmaking")
  @UseGuards(gameGuard)
  async handleMatchMaking(client: Socket) {
    const { user }: any = client;
    const already = this.matches.find((e) => {
      return e.has(user.username);
    })
    if (already) {
      console.log("player already ")
      return;
    }
    const t = this.matches.filter((e) => {
      if (e.size == 1)
        return true
    })
    if (t.length)
    {
      t[0].set(user.username, client.id);
      var roomName = Array.from(t[0].keys())[0] + Array.from(t[0].keys())[1];
      console.log(roomName);
      this.server.in(Array.from(t[0].keys())[0] + "room").socketsJoin(roomName);
      client.join(roomName);
      this.server.to(roomName).emit("start", {roomName});
    }
    else {
      const player = new Map<string, string>();
      player.set(user.username, client.id);
      this.matches.push(player);
      client.join(user.username + "room");
    }
  }
}
