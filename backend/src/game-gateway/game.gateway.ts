import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: { credentials: true }, namespace: "game" })
export class GameGateway {

	@WebSocketServer()
	server: Server

	

}
