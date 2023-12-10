import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserService } from "src/user/user.service";

const prisma = new PrismaClient();

@Injectable() 

export class ChatService {
	
	constructor(private userService: UserService) {};

	async getMessages() {

	}

	async sendMessage(payload) {
		try{
			const chatId = payload.chatId;
			console.log("chatId: ",chatId);
			var updatedChat = await prisma.message.create({
				data: {
					content: payload.content,
					chat: {
						connectOrCreate: {
							where: {
								id: chatId
							},
							create: {}
						}
					},
					sender: {
						connect: {
							username: payload.sender
						}
					},
					receiver: {
						connect: {
							username: payload.receiver
						}
					}
				}
			})
			return "message sent!"
		}
		catch (err) {
			throw err;
		}
	}



	async getChat(account, user) {
		const messages = await prisma.message.findMany({
			where: {
				OR: [
					{
						AND: [
							{
								senderId: account.username,
							},
							{
								receiverId: user.username
							}
						]
					}
					,
					{
						AND: [
							{
								senderId: user.username,
							},
							{
								receiverId: account.username
							}

						]
					}

				]
			}
		});
		return {messages};
	}
}