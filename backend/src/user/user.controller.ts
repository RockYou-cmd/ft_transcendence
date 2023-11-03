import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { userService } from "./user.service";

@Controller("/user")

export class userController{
	constructor(private UserService: userService) {}

	@Get()
	getUser(@Query("name") name){
		console.log(name);
		return this.UserService.getUser(name);
	}

	@Get("all")
	getUsers() {
		return this.UserService.getUsers();
	}
}