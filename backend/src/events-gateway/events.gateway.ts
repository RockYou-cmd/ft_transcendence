import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({origin: true, namespace: "events"})
export class EventsGateway {

  @WebSocketServer()
  server: Server

  handleConnection(client: any) {
    console.log(client.id, " CONNECTED");
  }

  handleDisconnect(client: any) {
    console.log(client.id, " DISCONNECT");
  }
}
