import { Body, Controller, Post } from '@nestjs/common';
import { authDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post("signUp")
	async signUp(@Body() dto : authDto) {
		console.log(dto);
		return this.authService.signUp(dto);
	}
}
