import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class RoomService {

	async createRoom(account, data) {
		try{
			var roomData = {
				name: data.name,
				owner: {
					connect: {
						username: account.username
					}
				},
				privacy: data.privacy	
			}
			if (data.privacy == "PROTECTED")
				data["password"] = data.password
			const room = await prisma.room.create({
				data: roomData
			})
			return room;
		}
		catch (err) {
			throw err;
		}
	}

}
