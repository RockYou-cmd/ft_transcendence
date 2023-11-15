import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as argon from "argon2"

const prisma = new PrismaClient();

@Injectable()

export class userService {
	async getUser(user) {
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
			
		}
		catch(err) {
			return err;
		}
		return ret;
	}
	
	async getUsers() {
		return prisma.users.findMany();
	}

}
