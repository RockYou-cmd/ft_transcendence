import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { authDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("signUp")
	async signUp(@Body() dto : authDto, @Res() res: Response) {
		res.cookie("access_token", await this.authService.signUp(dto), {httpOnly: true});
		res.send("User ignedUp succesfully");
	}
	
	@Post("signIn")
	async singIn(@Body() ndto, @Res() res: Response) {
		const token = await this.authService.signIn(ndto);
		res.cookie("access_token", token, {httpOnly: true});
		res.send("User signedIn succesfully");
	}
	
	@UseGuards(AuthGuard("google"))
	@Get("google")
	google() {}
	
	@Post("google/callback")
	@UseGuards(AuthGuard("google"))
	async googleCallback(@Req() req, @Res() res: Response) {
		res.cookie("access_token", await this.authService.OAuthValidation(req.user), {httpOnly: true});
		res.send("User signedIn succesfully");
	}
	
	@UseGuards(AuthGuard("42"))
	@Get("intra")
	async intra() {}
	
	@Post("intra/callback")
	@UseGuards(AuthGuard("42"))
	async intraCallback(@Req() req, @Res() res: Response) {
		res.cookie("access_token", await this.authService.OAuthValidation(req.user), {httpOnly: true});
		res.send("User signedIn succesfully");
	}
}
