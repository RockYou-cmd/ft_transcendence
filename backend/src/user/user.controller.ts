import { Body, Controller, Get, Post, Put, Query, Req, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";

@Controller("/user")

export class UserController{
	constructor(private UserService: UserService) {}

	@Get("profile")
	@UseGuards(AuthGuard)
	getProfile(@Request() request){
		return this.UserService.getProfile(request.user);
	}

	@Get()
	@UseGuards(AuthGuard)
	getUser(@Req() account, @Query() user){
		return this.UserService.getUser(account.user, user);
	}

	@Get("all")
	getUsers() {
		return this.UserService.getUsers();
	}

	@Get("search")
	@UseGuards(AuthGuard)
	search(@Query() data) {
		return this.UserService.search(data.username);
	}

	@Post("remove")
	@UseGuards(AuthGuard)
	async removeUserFromFriends(@Req() req, @Body() friend) {
		return this.UserService.removeUserFromFriends(req.user, friend);
	}

	@Get("friends")
	@UseGuards(AuthGuard)
	async getFriends(@Req() account, @Query("chat") chat) {
		return this.UserService.getFriends(account.user, chat);
	}

	@Put("update")
	@UseGuards(AuthGuard)
	async updateData(@Req() account, @Body() data) {
		return this.UserService.updateData(account.user, data);
	}
}
