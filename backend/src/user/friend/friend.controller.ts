import { Body, Controller, Get, Post, Request, UseGuards, Req, Put } from "@nestjs/common";
import { authDto } from "src/auth/auth.dto";
import { FriendService } from "./friend.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";


@Controller("friend")
export class FriendController {

	constructor(private friendService: FriendService) {};

	@Post("send/request")
	@UseGuards(AuthGuard)
	async sendRequest(@Body() friend, @Request() account) {
		return this.friendService.sendRequest(account.user, friend);
	}

	@Post("accept/request")
	@UseGuards(AuthGuard)
	async acceptRequest(@Body() friend, @Request() account) {
		return this.friendService.acceptRequest(account.user, friend);
	}

	@Get("/chats")
	@UseGuards(AuthGuard)
	async getFriendsChats(@Req() account) {
		console.log("chats hehe");
		return this.friendService.getFriendsChats(account.user);
	}
	
	@Get("all")
	@UseGuards(AuthGuard)
	async getFriends(@Req() account) {
		return this.friendService.getFriends(account.user);
	}
	
	@Post("remove")
	@UseGuards(AuthGuard)
	async removeUserFromFriends(@Req() account, @Body() friend) {
		return this.friendService.removeFriend(account.user, friend);
	}

	@Put("Block")
	@UseGuards(AuthGuard)
	async blockFriend(@Req()account, @Body()user) {
		return this.friendService.blockFriend(account.user, user);
	}
	
}