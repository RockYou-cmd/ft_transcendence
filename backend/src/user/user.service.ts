import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()

export class userService {
	async getUser(username) {
		const user = await prisma.users.findFirst({
			where : {
				username:username
			}
		})
		return user;
	}

	async createUser(username) {
		const user = await prisma.users.create({
			data: {
				username:username
			}
		})
	}
}
