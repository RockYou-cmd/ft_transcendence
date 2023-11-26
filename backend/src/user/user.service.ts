import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as argon from "argon2"

const prisma = new PrismaClient();

@Injectable()

export class userService {
	async getUser(user) {
		try{
			const ret = await prisma.users.findUnique({
				where : {
					username:user.username,
				}
			})
			if (!ret)
				throw new NotFoundException("User Not Found");
			return ret;
			
		}
		catch(err) {
			console.log("getUser !Error!");
			throw err;
		}
	}
	
	async getUsers() {
		return prisma.users.findMany();
	}

	async updateUser(user, field, value) {
		const data = {[field]: value};
		try {
			const ret = await prisma.users.update({
				where: {
					username: user.username,
				},
				data
			})
		} catch(err) {
			throw err;
		}
	}

	
	async search(username) {
		const ret = await prisma.users.findMany({
			where: {
				username: {
					startsWith: username,
					mode: "insensitive"
				}
			}
		});
		return ret;
	}
	
	async addFriend(friend, user) {
		try{
			console.log("friend name : ", friend);
			const friendUser = await this.getUser(friend);
			const ret = await prisma.users.update({
				where: {
					username: user.username,
				},
				data: {
					friends: {
						push: JSON.stringify(friendUser)
					}
				}
			})
			console.log(ret);
			if (!ret)
				throw Error("update Error");
		}
		catch(err) {
			console.log(err);
			return err;
		}
	}
}
