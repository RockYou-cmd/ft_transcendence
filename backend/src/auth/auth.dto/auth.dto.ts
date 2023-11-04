import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsStrongPassword, Min } from "class-validator"

export class authDto {

	@IsNotEmpty()
	username: String

	@IsEmail()
	email: String

	@IsStrongPassword()
	password: String
}