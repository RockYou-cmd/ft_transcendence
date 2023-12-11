import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserService } from "src/user/user.service";

const prisma = new PrismaClient();

@Injectable() 

export class ChatService {
	
	constructor(private userService: UserService) {};


	async sendMessage(payload) {
		// try{
		// 	const chatId = payload.chatId;
		// 	// console.log("chatId: ",chatId);
		// 	var updatedChat = await prisma.message.create({
		// 		data: {
		// 			content: payload.content,
		// 			chat: {
		// 				connectOrCreate: {
		// 					where: {
		// 						id: chatId
		// 					},
		// 					create: {}
		// 				}
		// 			},
		// 			sender: {
		// 				connect: {
		// 					username: payload.sender
		// 				}
		// 			},
		// 			receiver: {
		// 				connect: {
		// 					username: payload.receiver
		// 				}
		// 			}
		// 		}
		// 	})
		// 	// console.log(updatedChat)
		// 	return "message sent!"
		// }
		// catch (err) {
		// 	throw err;
		// }
	}



	async getChat(account, user) {
		try {
			const chats = await prisma.chat.findMany({
				where: {
					members: {
						some: {
							username: user.username
						}
					}
				}
			})
			return {chats};
		} catch (err) {
			throw err;
		}
	}

	async createChat(account, data) {
		try {
			const chat = await prisma.chat.create({
				data: {
					members: {
						connect: [
							{
								username: account.username
							},
							{
								username: data.username
							}
						]
					}
				}
			})
			return "new chat created";
		} catch (err) {
			throw err;
		}
	}
}