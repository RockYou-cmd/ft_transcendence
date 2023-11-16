import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { authDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard/auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post("signUp")
	async signUp(@Body() dto : authDto) {
		console.log(dto);
		return this.authService.signUp(dto);
	}
	@Post("signIn")
	// @UseGuards(AuthGuard)
	async singIn(@Body() ndto) {
		return this.authService.signIn(ndto);
	}
	@Get()
	@UseGuards(AuthGuard)
	test() {
		return "authorized";
	}
}
