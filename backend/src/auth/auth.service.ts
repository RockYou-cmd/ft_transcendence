import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
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
		}
		catch(err)
		{
			console.log("error occured");
			console.log(err);
			return err;
		}
		return "user created sucessfully";
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
			
		}
		catch(err) {
			console.log("err");
			return err;
		}
		return ret;
	}
}
