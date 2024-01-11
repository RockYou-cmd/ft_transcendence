import { IsAlphanumeric, IsEmail, IsNotEmpty, IsStrongPassword, Length } from "class-validator"

export class authDto {

	@IsNotEmpty()
	@Length(4, 12)
	@IsAlphanumeric()
	username: String

	@IsEmail()
	email: String

	@IsStrongPassword()
	password: String
}