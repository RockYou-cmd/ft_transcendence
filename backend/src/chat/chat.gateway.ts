import { Injectable, UseGuards } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable, from, map } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';

@Injectable()
@WebSocketGateway({cors:true, namespace: "chat"})
// @UseGuards(AuthGuard)
export class ChatGateway {
  @WebSocketServer()
  server: Server
  
  afterInit(f) {
    console.log("chat gateway instantiated : ");
  }

  handleConnection(client) {
    console.log(client.id , " connected");
    // console.log(this.server);
  }

  handleDisconnect(client) {
    console.log(client.id, " disconnected");
  }

  @SubscribeMessage('message')
  // @UseGuards(AuthGuard)
  handleMessage(client: Socket, payload) {
    console.log("new message : ", payload);
    client.emit("message", "lesgoooooo motherfather");
  }

}
