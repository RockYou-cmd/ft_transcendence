import { Req, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';

@WebSocketGateway({cors: true, namespace: "eventss"})
export class EventsGateway {
  constructor(private authGuard: AuthGuard) {};

  @WebSocketServer()
  server: Server;

  sockets = new Map<string, string>();
  
  async handleConnection(client: any) {
    if (client.handshake.auth.token)
      var {username} = await this.authGuard.extractPayloadFromToken(client.handshake.auth.token);
    console.log(username, " CONNECTED");
  }
  
  async handleDisconnect(client: any) {
    console.log(client.id, " DISCONNECT");
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage("test")
  test(client) {
    this.sockets.set("name", "alae");
    console.log(this.sockets);
    console.log(client.id);
  }
}
