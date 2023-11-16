import { Body, Controller, Get, Post, Query, Request, UseGuards } from "@nestjs/common";
import { userService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";

@Controller("/user")

export class userController{
	constructor(private UserService: userService) {}

	@Get()
	@UseGuards(AuthGuard)
	getUser(@Query() log, @Request() request){
		return this.UserService.getUser(request.user);
	}

	@Get("all")
	getUsers() {
		return this.UserService.getUsers();
	}
}