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

@WebSocketGateway({
  cors: { credentials: true, origin: "http://localhost:3000" },
  namespace: "events",
})
export class EventsGateway {
  constructor(
    private authGuard: AuthGuard,
    private chatService: ChatService,
    private roomService: RoomService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const cookie = client.handshake.headers.cookie;
    if (cookie) {
      const access_token = parse(cookie).access_token;
      var { username } =
        await this.authGuard.extractPayloadFromToken(access_token);
      client.join(username);
    }
    console.log(username, " CONNECTED");
  }

  async handleDisconnect(client: Socket) {
    const cookie = client.handshake.headers.cookie;
    if (cookie) {
      const access_token = parse(cookie).access_token;
      var { username } =
        await this.authGuard.extractPayloadFromToken(access_token);
      client.leave(username);
    }
    console.log(username, " DISCONNECT");
  }

  @SubscribeMessage("message")
  handleMessage(client: Socket, payload: any) {
    console.log("normal message event called");
    this.server.to(payload.receiver).emit("message", payload);
    this.chatService.sendMessage(payload);
  }

  @SubscribeMessage("roomMessage")
  handleRoomMessage(client: Socket, payload: any) {
    payload.receivers.forEach((receiver) => {
      this.server
        .to(receiver.userId)
        .except(payload.sender)
        .emit("roomMessage", payload);
    });
    this.roomService.sendMessage(payload);
  }
}
