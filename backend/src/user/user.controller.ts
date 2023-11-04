import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { userService } from "./user.service";

@Controller("/user")

export class userController{
	constructor(private UserService: userService) {}

	@Get("one")
	getUser(@Query() log){
		return this.UserService.getUser(log);
	}

	@Get("all")
	getUsers() {
		return this.UserService.getUsers();
	}
}