import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class authDto {

	@IsNotEmpty()
	username: String

	@IsEmail()
	email: String

	@IsStrongPassword()
	password: String
}