import { Body, Controller, Get, Post, Put, Query, Req, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";

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

	@Get("search")
	@UseGuards(AuthGuard)
	search(@Query() data) {
		return this.UserService.search(data.username);
	}

	@Put("update")
	@UseGuards(AuthGuard)
	async updateData(@Req() account, @Body("updatedData") data) {
		return this.UserService.updateData(account.user, data);
	}
}
