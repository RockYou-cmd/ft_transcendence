import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { authDto } from "src/auth/auth.dto";
import { FriendRequestService } from "./friendRequest.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";


@Controller("request")
export class FriendRequestController {

	constructor(private friendRequestService: FriendRequestService) {};

	@Post("send")
	@UseGuards(AuthGuard)
	async sendRequest(@Body() friend, @Request() req) {
		return this.friendRequestService.sendRequest(req.user, friend);
	}

	@Post("accept")
	@UseGuards(AuthGuard)
	async acceptRequest(@Body() friend, @Request() req) {
		return this.friendRequestService.acceptRequest(req.user, friend);
	}

}