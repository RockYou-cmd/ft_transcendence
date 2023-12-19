import { Req, UseGuards } from '@nestjs/common'
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AuthGuard } from 'src/auth/auth.guard/auth.guard'
import { parse } from 'cookie'
import { ChatService } from 'src/chat/chat.service'
import { RoomService } from 'src/room/room.service'
import { UserService } from 'src/user/user.service'

@WebSocketGateway({
  cors: { credentials: true, origin: 'http://localhost:3000' },
  namespace: 'events',
})
export class EventsGateway {
  constructor(
    private authGuard: AuthGuard,
    private chatService: ChatService,
    private roomService: RoomService,
    private userService: UserService
  ) {}

  @WebSocketServer()
  server: Server

  async handleConnection(client: Socket) {
    const cookie = client.handshake.headers.cookie
    if (cookie) {
      const access_token = parse(cookie).access_token
      var { username } =
        await this.authGuard.extractPayloadFromToken(access_token)
      client.join(username)
      const userTabs = await this.server.in(username).fetchSockets()
      if (userTabs.length)
        this.userService.updateData({ username }, { status: 'ONLINE' })
    }
    console.log(username, ' CONNECTED')
  }

  async handleDisconnect(client: Socket) {
    const cookie = client.handshake.headers.cookie
    if (cookie) {
      const access_token = parse(cookie).access_token
      var { username } =
        await this.authGuard.extractPayloadFromToken(access_token)
      client.leave(username)
      const userTabs = await this.server.in(username).fetchSockets()
      if (!userTabs.length)
        this.userService.updateData({ username }, { status: 'OFFLINE' })
    }
    console.log(username, ' DISCONNECT')
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    console.log('normal message event called')
    this.server.to(payload.receiver).emit('message', payload)
    this.chatService.sendMessage(payload)
  }

  @SubscribeMessage('roomMessage')
  async handleRoomMessage(client: Socket, payload: any) {
    const userData = await this.roomService.getMemberShip(
      payload.chatId,
      payload.sender
    )
    if (userData.status == "MUTED") {
      const now = new Date();
      if (userData.mutedTime > now) {
<<<<<<< HEAD
        client.emit('muted', {roomId: payload.chatId})
        return
=======
        client.emit("muted");
        return;
>>>>>>> eadfab87bc21867c3dd3e41d60a87ca8a9c0f07b
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
        .emit('roomMessage', payload)
    })
    console.log("message Sent!");
    this.roomService.sendMessage(payload)
  }

  @SubscribeMessage('update')
  handleBlock(client: Socket, payload: any) {
    this.server.to(payload.receiver).emit('update', payload)
  }
}
