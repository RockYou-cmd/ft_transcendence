import { Body, Controller, Get, Post, Query, Request, UseGuards } from "@nestjs/common";
import { userService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";

@Controller("/user")

export class userController{
	constructor(private UserService: userService) {}

	@Get()
	@UseGuards(AuthGuard)
	getUser(@Request() request){
		return this.UserService.getUser(request.user);
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

	@Post("add")
	@UseGuards(AuthGuard)
	addFriend(@Body() friend, @Request() req) {
		this.UserService.addFriend(friend, req.user);
	}
}