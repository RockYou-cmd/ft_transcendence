import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './2fa.service';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';
import { twoFactorAuthenticationDto } from './2fa.dto/2fa.dto';

@Controller("2fa")
export class TwoFactorAuthenticationController {
	constructor (private twoFactorAuthenticationService: TwoFactorAuthenticationService) {}

	@Get("generate")
	@UseGuards(AuthGuard)
	generateTwoFactorAuthenticationSecret(@Req() req) {
		return this.twoFactorAuthenticationService.generateTwoFactorAuthSecret(req.user);
	}

	@Post("enable")
	@UseGuards(AuthGuard)
	enableTwoFactorAuthentication(@Req() account, @Body() tokenObj:twoFactorAuthenticationDto) {
		return this.twoFactorAuthenticationService.enableTwoFactorAuthentication(account.user, tokenObj.token);
	}

	@Post("disable")
	@UseGuards(AuthGuard)
	disableTwoFactorAuthentication(@Req() account, @Body() tokenObj:twoFactorAuthenticationDto) {
		return this.twoFactorAuthenticationService.disableTwoFactorAuthentication(account.user);
	}
}
