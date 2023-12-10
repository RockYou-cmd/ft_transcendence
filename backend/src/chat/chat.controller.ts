import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";


@Controller("message")

export class ChatController {
	constructor(private chatService: ChatService) {};

	@Get("chat")
	@UseGuards(AuthGuard)
	async getMessages(@Req() account , @Query() user) {
		return this.chatService.getChat(account.user, user);
	}

	// @Post("send")
	// @UseGuards(AuthGuard)
	// async sendMessage(@Req() account, @Body() user) {
	// 	return this.chatService.sendMessage(account.user, user, user.message);
	// }

}