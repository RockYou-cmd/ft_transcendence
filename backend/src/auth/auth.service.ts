import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
	async signUp(user) {
		const res = await prisma.users.create({
			data:{
				username: user.username,
				email: user.email,
				password: user.password
			}
		})
		return "user created sucessfully";
	}
}
