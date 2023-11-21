import { IsNotEmpty, Min } from "class-validator";


export class twoFactorAuthenticationDto {

	@IsNotEmpty()
	token: String
}