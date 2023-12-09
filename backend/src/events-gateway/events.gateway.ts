import { Req, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';

@WebSocketGateway({cors: {credentials:true, origin: "http://localhost:3000"}, namespace: "events", cookie: false})
export class EventsGateway {
  constructor(private authGuard: AuthGuard) {};

  @WebSocketServer()
  server: Server;

  sockets = new Map<string, string[]>();
  
  async handleConnection(client: any) {
    // var newSocket = this.sockets.get("name");
    // newSocket.push("woiui")
    // console.log(newSocket);
    console.log(client.handshake);
    // if (client.handshake)
    //   var {username} = await this.authGuard.extractPayloadFromToken(client.handshake.auth.token);
    console.log(client.id, " CONNECTED");
  }
  
  async handleDisconnect(client: any) {
    console.log(client.id, " DISCONNECT");
  }

  // @UseGuards(AuthGuard)
  @SubscribeMessage("test")
  test(client) {
    // this.sockets.set("name" );
    // this.sockets.set("name", "alae");
    // console.log("all connected sockets: \n", this.sockets);
    console.log(client.id);
  }
}
