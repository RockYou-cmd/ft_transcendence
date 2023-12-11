import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Module({
	controllers: [ChatController],
	providers: [ChatService, AuthGuard, JwtService, UserService],
})

export class ChatModule {}