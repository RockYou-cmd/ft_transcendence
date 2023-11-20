import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { authDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("signUp")
	signUp(@Body() dto : authDto) {
		return this.authService.signUp(dto);
	}

	@Post("signIn")
	singIn(@Body() ndto) {
		return this.authService.signIn(ndto);
	}

	@UseGuards(AuthGuard("google"))
	@Get("google")
	google() {}
	
	@Post("google/callback")
	@UseGuards(AuthGuard("google"))
	googleCallback(@Req() req) {
		return this.authService.OAuthValidation(req.user);
	}

	@UseGuards(AuthGuard("42"))
	@Get("intra")
	async intra() {
		return "intra";
	}

	@Post("intra/callback")
	@UseGuards(AuthGuard("42"))
	intraCallback(@Req() req) {
		return this.authService.OAuthValidation(req.user);
	}
}
