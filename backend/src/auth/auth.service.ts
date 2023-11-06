import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from "argon2"


const prisma = new PrismaClient();

@Injectable()
export class AuthService {
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
		var ret;
		try{
			ret = await prisma.users.findUnique({
				where : {
					username:user.username,
				}
			})
			if (!ret)
				return {
					status:300,
					message:"User not found"
				}
			else if (!await argon.verify(ret.password, user.password))
				return {
					status:300,
					message: "Password incorrect"
				}
			return ret;
		}
		catch(err) {
			throw(err);
		}
	}
}
