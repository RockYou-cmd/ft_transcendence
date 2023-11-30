import { ForbiddenException, HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common"; 
import { PrismaClient } from "@prisma/client";
import { UserService } from "../user.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

@Injectable()
export class FriendRequestService {

	constructor(private userService: UserService) {};
	
	async sendRequest(user, friend) {

		try{
			const friendUser = await this.userService.getData(friend);
			const sender = await prisma.user.update({
				where: {
					username: user.username,
				},
				data: {
					friends: {
						create:{
							friendId: friendUser.id,
							userId: user.userId
							
						}
					}
				}
			})
			const receiver = await prisma.user.update({
				where: {
					username:friendUser.username
				},
				data: {
					friends: {
						create: {
							friendId: sender.id,
							userId: friendUser.id,
							status: "WAITING"			
						}
					}
				}
			});
		}
		catch(err) {
			if (err instanceof PrismaClientKnownRequestError && err.code == "P2002")
				throw new ForbiddenException(err.meta.target[0]+ " already in the friend list");
			throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
		}
	}

	async acceptRequest(user, sender) {
		try {
			const senderGet = await this.userService.getData(sender);
			const receiverRL = await prisma.friend.update({
				where: {
					friendId_userId: {
						friendId: senderGet.id,
						userId: user.userId
					},					
				},
				data: {
					status: "ACCEPTED"
				}
			})
			await prisma.friend.update({
				where: {
					friendId_userId: {
						friendId: user.userId,
						userId: senderGet.id
					},					
				},
				data: {
					status: "ACCEPTED"
				}
			})
			return new HttpException("User accepted", HttpStatus.ACCEPTED);
		}
		catch (err) {
			console.log("Accept error");
			throw err;
		}
		
	}
}