/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserService } from "src/user/user.service";

const prisma = new PrismaClient();

@Injectable()
export class ChatService {
  constructor(private userService: UserService) {}

  async sendMessage(payload) {
    try {
      console.log(payload);
      const chatId = payload.chatId;
      // console.log("chatId: ",chatId);
      var updatedChat = await prisma.message.create({
        data: {
          content: payload.content,
          chat: {
            connectOrCreate: {
              where: {
                id: chatId,
              },
              create: {},
            },
          },
          sender: {
            connect: {
              username: payload.sender,
            },
          },
        },
      });
      // console.log(updatedChat)
      return "message sent!";
    } catch (err) {
      throw err;
    }
  }

  async getChat(account, user) {
    try {
        // await prisma.message.deleteMany();
        // await prisma.chat.deleteMany();
		// await prisma.friendShip.deleteMany();
      const chat = await prisma.user.findUnique({
        where: {
          username: account.username,
        },
        select: {
          chats: {
            where: {
              members: {
                some: {
                  username: user.username,
                },
              },
            },
            include: {
              messages: true,
            },
          },
          friends: {
            where: {
              users: {
                some: {
                  username: user.username
                }
              },
            },
            select: {
              status: true,
              blocked: {
                select: {
                  username: true
                }
              }
            }
          },
        },
      });
      return chat;
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
                username: account.username,
              },
              {
                username: data.username,
              },
            ],
          },
        },
      });
      return await this.getChat(account, data);
    } catch (err) {
      throw err;
    }
  }
}
