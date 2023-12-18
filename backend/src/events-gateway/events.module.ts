import { Module } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";
import { JwtService } from "@nestjs/jwt";
import { ChatService } from "src/chat/chat.service";
import { UserService } from "src/user/user.service";
import { ChatModule } from "src/chat/chat.module";
import { RoomService } from "src/room/room.service";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";


@Module({
	providers: [EventsGateway, ChatService, UserService, RoomService],
	imports: [AuthModule]
})

export class EventsModule {}