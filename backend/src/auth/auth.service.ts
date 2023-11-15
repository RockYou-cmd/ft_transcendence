import { ForbiddenException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
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
			const res = await prisma.users.create({
				data:{
					username: user.username,
					email: user.email,
					password: hash
				}
			})
			delete res.password;
			return res;
		}
		catch(err)
		{
			if (err instanceof PrismaClientKnownRequestError && err.code == "P2002")
				throw new ForbiddenException(err.meta.target[0]+ " already exist");
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
			const payload = {
				sub: ret.id,
				username: ret.username
			}
			return {
				access_token: await this.jwtService.signAsync(payload)
			};
		}
		catch(err) {
			console.log("SignIn !!Error!!");
			throw(err);
		}
	}
}
