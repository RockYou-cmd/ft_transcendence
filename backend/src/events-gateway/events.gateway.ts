import { Req, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';
import {parse} from "cookie";
import { ChatService } from 'src/chat/chat.service';

@WebSocketGateway({cors: {credentials:true, origin: "http://localhost:3000"}, namespace: "events"})
export class EventsGateway {
  constructor(private authGuard: AuthGuard, private chatService: ChatService) {};

  @WebSocketServer()
  server: Server;

  sockets = new Map<string, string[]>();
  
  async handleConnection(client: Socket) {
    const cookie = client.handshake.headers.cookie;
    if (cookie) {
      const access_token = parse(cookie).access_token;
      var {username} = await this.authGuard.extractPayloadFromToken(access_token);
      var newSocket = this.sockets.get(username) || [];
      newSocket.push(client.id)
      this.sockets.set(username, newSocket);
      client.join(username);
    //   console.log(this.sockets)
    }
    console.log(username, " CONNECTED");
  }
  
  async handleDisconnect(client: Socket) {
    console.log(client.id, " DISCONNECT");
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    console.log(payload.chatId)
    this.server.to(payload.receiver).emit("message", payload);
    this.chatService.sendMessage(payload);
  }

}
