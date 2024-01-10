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
import { GameService } from "src/game/game.service";

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
    private gameService: GameService,
  ) {}

  @WebSocketServer()
  server: Server;

  matches: Map<string, any>[] = [];

  async handleConnection(client: Socket) {
    try {
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
    } catch (err) {
      throw err;
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const cookie = client.handshake.headers.cookie;
      if (cookie) {
        const access_token = parse(cookie).access_token;
        var { username } =
          await this.authGuard.extractPayloadFromToken(access_token);
        client.leave(username);
        var match = this.findMatch(username);
        if (match) {
          const roomName = match.get("roomName");
          this.userService.updateData({ username }, { status: "ONLINE" });
          const player1 = Array.from(match.keys())[0];
          if (!match.has("friend")) {
            var player2 = Array.from(match.keys())[1];
            const game: GameService = match.get("game");
            if (!player2) match.clear();
            else if (username == player1) {
              game["player1"].score = 1;
              game["player2"].score = 6;
            } else {
              game["player2"].score = 1;
              game["player1"].score = 6;
            }
            if (player2)
              this.endRankGame({ player1, player2, roomName }, match, 1);
          } else {
            var player2 = Array.from(match.keys())[2];
            this.endRankGame({ player1, player2, roomName }, match, 0);
          }
        }
        const userTabs = await this.server.in(username).fetchSockets();
        if (!userTabs.length)
          this.userService.updateData({ username }, { status: "OFFLINE" });
      }
      console.log(username, " DISCONNECT");
    } catch (err) {
      throw err;
    }
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

    var blockedBy = userData.user.friends.map(
      (user) => user?.users[0]?.username,
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
      if (!blockedBy.includes(receiver.userId)) {
        console.log("receiver : ", receiver.userId);
        this.server
          .to(receiver.userId)
          .except(payload.sender)
          .emit("roomMessage", payload);
      }
    });
    // console.log("message Sent!");
    this.roomService.sendMessage(payload);
  }

  @SubscribeMessage("update")
  handleBlock(client: Socket, payload: any) {
    if (
      payload.option === "block" ||
      payload.option === "unblock" ||
      payload.option === "newChat"
    )
      this.server
        .to(payload.receiver)
        .to(payload.sender)
        .emit("update", payload);
    else this.server.to(payload.receiver).emit("update", payload);
  }

  findMatch(username) {
    return this.matches.find((e) => {
      return e.has(username);
    });
  }

  @SubscribeMessage("nameUpdate")
  @UseGuards(gameGuard)
  handleNameUpdate(client: Socket, payload: any) {
    try {
      const { user }: any = client;
      this.server.in(user.username).socketsJoin(payload.username);
      this.server.in(user.username).disconnectSockets();
    } catch (err) {
      throw err;
    }
  }

  @SubscribeMessage("matchmaking")
  @UseGuards(gameGuard)
  async handleMatchMaking(client: Socket) {
    const { user }: any = client;
    const already = this.findMatch(user.username);
    if (already) {
      console.log("player already ");
      return;
    }
    const t = this.matches.filter((e) => {
      if (e.size == 1) return true;
    });
    if (t.length) {
      t[0].set(user.username, client.id);
      const player1 = Array.from(t[0].keys())[0];
      const player2 = Array.from(t[0].keys())[1];
      var roomName = player1 + player2;
      this.server.in(player1 + "room").socketsJoin(roomName);
      client.join(roomName);
      this.server.to(roomName).emit("start", { roomName, player1, player2 });
    } else {
      const player = new Map<string, string>();
      player.set(user.username, client.id);
      this.matches.push(player);
      client.join(user.username + "room");
    }
  }

  @SubscribeMessage("leaveMatch")
  @UseGuards(gameGuard)
  async leaveMatch(client: Socket, payload: any) {
    const { user }: any = client;
    var match = this.findMatch(user.username);
    clearInterval(match?.get("loop"));
    match.get("game").reset();
    match?.clear();
    this.server.to(payload.roomName).emit("endGame", "the opponent left");
    this.userService.updateData(user, { status: "ONLINE" });
  }

  @SubscribeMessage("move")
  async movePaddle(client: Socket, payload: any) {
    const { user }: any = client;
    // console.log(payload);
    var match = this.findMatch(user.username);
    match.get("game")[payload.player].y = payload.y;
  }

  @SubscribeMessage("invite")
  @UseGuards(gameGuard)
  async invite(client: Socket, payload: any) {
    this.server.to(payload.player2).emit("invite", payload);
  }

  @SubscribeMessage("accept")
  @UseGuards(gameGuard)
  async accept(client: Socket, payload: any) {
    const { user }: any = client;
    const players = new Map<string, any>();
    //  players.set(payload.player1, client.id);
    players.set(user.username, client.id);
    players.set("friend", true);
    this.matches.push(players);
    const roomName = payload.player1 + payload.player2;
    client.join(roomName);
    this.server
      .to(payload.player1)
      .to(roomName)
      .emit("start", { ...payload, roomName });
  }

  @SubscribeMessage("start")
  @UseGuards(gameGuard)
  async startGame(client: Socket, payload) {
    const { user }: any = client;
    this.userService.updateData(
      { username: payload.player1 },
      { status: "INGAME" },
    );
    this.userService.updateData(
      { username: payload.player2 },
      { status: "INGAME" },
    );
    var match = this.findMatch(payload.player2);
    match.set(user.username, client.id);
    match.set("roomName", payload.roomName);
    client.join(payload.roomName);
    match.set("game", new GameService());
    const game: GameService = match.get("game");
    const loop = setInterval(() => {
      game.updateCOM();
      const player1 = game.player1;
      const player2 = game.player2;
      const ball = game.ball;
      if (player1.score == 7 || player2.score == 7) {
        if (!match.has("friend")) this.endRankGame(payload, match, 1);
        else this.endRankGame(payload, match, 0);
      }
      this.server.to(payload.roomName).emit("frame", {
        player1,
        player2,
        ball,
        payload,
      });
    }, 1000 / 60);
    match.set("loop", loop);
  }

  async endRankGame(payload, match, ranked) {
    const game: GameService = match.get("game");
    const player1 = game.player1;
    const player2 = game.player2;
    // console.log(game);
    var winner =
      player1.score > player2.score ? payload.player1 : payload.player2;
    clearInterval(match?.get("loop"));
    game.reset();
    match.clear();
    this.server.to(payload.roomName).emit("endGame", { winner });
    if (ranked) {
      var loser =
        player1.score > player2.score ? payload.player2 : payload.player1;
      console.log(loser);
      var winnerScore =
        player1.score > player2.score ? player1.score : player2.score;
      var loserScore =
        player1.score > player2.score ? player2.score : player1.score;
      this.gameService.updateGameProfile({
        winner,
        loser,
        winnerScore,
        loserScore,
      });
    }
  }
}
