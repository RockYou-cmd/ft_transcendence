import { Module } from "@nestjs/common";
import { ChatService } from "src/chat/chat.service";
import { UserService } from "src/user/user.service";
import { RoomService } from "src/room/room.service";
import { AuthModule } from "src/auth/auth.module";
import { messageGuard } from "./event.guard/message.guard";
import { gameGuard } from "./event.guard/game.guard";
import { EventGateway } from "./event.gateway";

@Module({
  providers: [
    EventGateway,
    ChatService,
    UserService,
    RoomService,
    messageGuard,
    gameGuard,
  ],
  imports: [AuthModule],
})
export class eventModule {}
