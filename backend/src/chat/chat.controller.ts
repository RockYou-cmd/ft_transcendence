import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";


@Controller("chat")

export class ChatController {
	constructor(private chatService: ChatService) {};

	@Get("get")
	@UseGuards(AuthGuard)
	async getMessages(@Req() account , @Query() user) {
		return this.chatService.getChat(account.user, user);
	}

	@Post("create")
	@UseGuards(AuthGuard)
	async createChat(@Req()account, @Query() data) {
		return this.chatService.createChat(account.user, data);
	}
}