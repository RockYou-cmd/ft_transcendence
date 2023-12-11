import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as speakeasy from "speakeasy";
import * as qrcode from "qrcode";
import { UserService } from 'src/user/user.service';

@Injectable()
export class TwoFactorAuthenticationService {
	constructor (private userService: UserService) {};

	async generateTwoFactorAuthSecret(user) {
		try {
			const ret = await this.userService.getData(user);
			if (ret.is2faEnabled)
				throw "2FA already enabled!";
			const secret = speakeasy.generateSecret({
				name: user.name,
				issuer: "RockYou"
			});
			await this.userService.updateUser(ret, "temp2fa", secret.base32);
			const otpAuthUrl = speakeasy.otpauthURL({
				label: "RockYou",
				secret:secret.base32
			})
			const qr = await qrcode.toDataURL(otpAuthUrl);
			console.log(qr)
			return qr;
		}
		catch(err) {
			console.log("generateTwoFactorAuthSecretUrl Error!");
			return err;
		}
	}

	async enableTwoFactorAuthentication(user, token) {
		try{
			const ret = await this.userService.getData(user);
			const validated = await speakeasy.totp.verify({
				secret: ret.temp2fa,
				token
			})	
			if (!validated)
				throw new UnauthorizedException("Invalid 2fa token!");
			this.userService.updateUser(user, "twoFactorAuthenticationSecret", ret.temp2fa)
			this.userService.updateUser(user, "is2faEnabled", true)
			return {status:"2fa enabled succesfully", code:200};
		} catch (err) {
			console.log("enableTwoFactorAuthentication Error!");
			throw err;
		}
	}

	async disableTwoFactorAuthentication(user, token) {
		try{
			this.userService.updateUser(user, "is2faEnabled", false)
		} catch (err) {
			console.log("disableTwoFactorAuthentication Error!");
			throw err;
		}
	}
}
