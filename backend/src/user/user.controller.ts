import { Body, Controller, Get, Post, Put, Query, Req, Request, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";
import { Response } from "express";

@Controller("/user")
export class UserController {
  constructor(private UserService: UserService) {}

  @Get("profile")
  @UseGuards(AuthGuard)
  getProfile(@Request() account) {
    return this.UserService.getProfile(account.user);
  }

  @Get("delete")
  delete() {
    this.UserService.delete();
    return "done";
  }

  @Get()
  @UseGuards(AuthGuard)
  getUser(@Req() account, @Query() user) {
		return this.UserService.getUser(account.user, user);
  }
	
  @Get("all")
  getUsers() {
    return this.UserService.getUsers();
  }
	
  @Get("games")
	@UseGuards(AuthGuard)
	getGames(@Req() account) {
		return this.UserService.getGames(account.user);	
	}

  @Get("friends")
  @UseGuards(AuthGuard)
  async getUserFriends(@Query("username") username) {
    return this.UserService.getUserFriends(username);
  }

  @Get("search")
  @UseGuards(AuthGuard)
  search(@Query() data) {
    return this.UserService.search(data.username);
  }

  @Get("password")
  @UseGuards(AuthGuard)
  chanePassword(@Req()account, @Query() data) {
    return this.UserService.changePassword(account.user, data);
  }

  @Put("update")
  @UseGuards(AuthGuard)
  async updateData(
    @Req() account,
    @Res() res: Response,
    @Body("updatedData") data,
  ) {
    const token = await this.UserService.updateData(account.user, data);
    res.cookie("access_token", token, { httpOnly: true });
    res.send("Name changed successfully");
  }
}
