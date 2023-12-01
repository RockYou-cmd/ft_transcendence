import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserService } from "src/user/user.service";

const prisma = new PrismaClient();

@Injectable() 

export class ChatService {
	
	constructor(private userService: UserService) {};

	async getMessages() {

	}

	async sendMessage(account, user, message) {
		try{

			console.log("accountUser: ", account.username)
			console.log("UserName: ", user)
			const {id} = await this.userService.getData(user);
			const chat = await this.isChatCreated(account.username, user.username);
			console.log("chat : ", chat);
			if (!chat.length) {
				console.log("clear chat");
				var createdChat = await prisma.chat.create({
					data: {
						messages: {
							create: {
								content: message,
								sender: {
									connect: {
										username:account.username
									},
								},
								receiver: {
									connect: {
										username: user.username
									}
								}
							}
						}
					}
				})
			}
			else {
				const chatId = chat[0].messages[0].chatId;
				var updatedChat = await prisma.message.create({
					data: {
						content: message,
						chat: {
							connect: {
								id: chatId
							}
						},
						sender: {
							connect: {
								username: account.username
							}
						},
						receiver: {
							connect: {
								username: user.username
							}
						}
					}
				})
			}
			throw new HttpException("Message Sent!", HttpStatus.CREATED);
		}
		catch (err) {
			throw err;
		}
	}

	async isChatCreated(accountID, userId) {
		try {
			const chat = await prisma.chat.findMany({
				select:{
					messages: {
						where: {
							AND:[
								{
									senderId: accountID
								},
								{
									receiverId: userId
								}
							]
						}
					}
				}
			});
			return chat;
		}
		catch(err) {
			throw err;
		}
	}

	async getChat(account, user) {
		const chat = await prisma.chat.findMany({
			select: {
				messages: {
					where: {
						AND: [
							{
								senderId: account.username,
							},
							{
								receiverId: user.username
							}
						]
					}
				}
			}
		});
		return chat;
	}
}