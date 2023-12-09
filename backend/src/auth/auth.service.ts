import { HttpException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
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
			const ret = await prisma.user.create({
				data:{
					username: user.username,
					email: user.email,
					password: hash
				}
			})
			return await this.generateJwt(ret);
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
			const ret = await prisma.user.findUnique({
				where : {
					username:user.username,
				}
			});
			if (!ret || !ret.password)
				throw new NotFoundException();
			if (!await argon.verify(ret.password, user.password))
				throw new HttpException("Password incorrect", 404) // unAuthorized exception should be thrown
			return await this.generateJwt(ret);
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
			var ret = await prisma.user.findUnique({
				where:{
					email:user.email
				}
			})
			
			if (!ret) {
					ret = await prisma.user.create({
					data:{
						username: user.username,
						email: user.email,
						photo: user.photo
					}
				})
			}
			return await this.generateJwt(ret);

		}
		catch (err) {
			console.log("oath vlidation error");
			return err;
		}
			
	}

	async generateJwt(user) {
		const payload = {
			userId: user.id,
			username: user.username
		}
		return await this.jwtService.signAsync(payload);
	}
}
