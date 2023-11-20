import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from "argon2"


const prisma = new PrismaClient();

@Injectable()
export class AuthService {
	constructor (private jwtService: JwtService) {};

	async signUp(user) {
		try
		{
			const hash = await argon.hash(user.password);
			const ret = await prisma.users.create({
				data:{
					username: user.username,
					email: user.email,
					password: hash
				}
			})
			return this.generateJwt(ret);
		}
		catch(err)
		{
			console.log("SignUp error");
			if (err instanceof PrismaClientKnownRequestError && err.code == "P2002")
				throw new ForbiddenException(err.meta.target[0]+ " already exist");
			return err.message;
		}
	}

	async signIn(user) {
		try{
			const ret = await prisma.users.findUnique({
				where : {
					username:user.username,
				}
			});
			if (!ret)
				throw new NotFoundException();
			if (!await argon.verify(ret.password, user.password))
				return {
					status:300,
					message: "Password incorrect"
				} // unAuthorized exception should be thrown
			return this.generateJwt(ret);
		}
		catch(err) {
			console.log("SignIn !!Error!!");
			throw(err);
		}
	}

	async OAuthValidation(user) {
		try {
			if (!user)
				throw new UnauthorizedException();
			var ret = await prisma.users.findUnique({
				where:{
					email:user.email
				}
			})

			if (!ret) {
				await prisma.users.create({
					data:{
						username: user.username,
						email: user.email,
						photo: user.photo
					}
				})
			}
			return this.generateJwt(user);

		}
		catch (err) {
			console.log("oath vlidation error");
			return err;
		}
			
	}

	async generateJwt(user) {
		const payload = {
			sub: user.id,
			username: user.username
		}
		return {
			access_token: await this.jwtService.signAsync(payload)
		};
	}
}
