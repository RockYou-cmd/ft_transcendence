import { Body, Controller, Get, Post, Put, Query, Req, Request, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";
import { Response } from "express";

@Controller("/user")

export class UserController{
	constructor(private UserService: UserService) {}

	@Get("profile")
	@UseGuards(AuthGuard)
	getProfile(@Request() account){
		return this.UserService.getProfile(account.user);
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
	
	@Get("friends")
	@UseGuards(AuthGuard)
	async getUserFriends(@Query("username") username) {
		return this.getUserFriends(username);
	}
		

	@Get("search")
	@UseGuards(AuthGuard)
	search(@Query() data) {
		return this.UserService.search(data.username);
	}

	@Put("update")
	@UseGuards(AuthGuard)
	async updateData(@Req() account, @Res() res: Response, @Body("updatedData") data) {
		const token = await this.UserService.updateData(account.user, data);
		res.cookie("access_token", token, {httpOnly: true});
		res.send("Name changed successfully");
	}

}
