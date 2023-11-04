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
		var res;
		try {
			res = await prisma.users.findUnique({
				where: {
					email:"akae"
				}
			})
		}
		catch(err) {
			return err;
		}
		return res;
	}
}
