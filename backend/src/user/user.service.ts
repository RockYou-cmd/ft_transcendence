import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, PrismaClient, User } from "@prisma/client";
import * as argon from "argon2"

const prisma = new PrismaClient();

@Injectable()

export class UserService {
	async getProfile(user) {
		try{
			const ret = await prisma.user.findUnique({
				where : {
					username:user.username,
				},
				include: {
					friends:true
				}
			})
			if (!ret)
				throw new NotFoundException("User Not Found");
			return ret;
			
		}
		catch(err) {
			console.log("getProfile !Error!");
			throw err;
		}
	}
	async getData(user) {
		try{
			const ret = await prisma.user.findUnique({
				where : {
					username: user.username,
				}
			})
			if (!ret)
				throw new NotFoundException("User Not Found");
			return ret;
			
		}
		catch(err) {
			console.log("getData !Error!");
			throw err;
		}
	}
	
	async getUser(account , user) {
		try{
			const userData = await this.getData(user);
			const ret = await prisma.user.findUnique({
				where : {
					username: account.username,
				},
				include: {
					friends: {
						where: {
							friendId: userData.id
						}
					}
				}
			})
			if (!ret)
				throw new NotFoundException("User Not Found");
			return {...userData, status:ret?.friends[0]?.status};
			
		}
		catch(err) {
			throw err;
		}
	}
	
	async getUsers() {
		try {
			return prisma.user.findMany({
				include: {
					friends:true,
					// messagesSent:true,
					// messagesReceived:true,
					rooms: {
						include: {
							room:true
						}
					}
				}
			});
		}
		catch(err) {
			console.log("get all error");
			return err;
		}
	}

	async updateUser(user, field, value) {
		const data = {[field]: value};
		try {
			const ret = await prisma.user.update({
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
		const ret = await prisma.user.findMany({
			where: {
				username: {
					startsWith: username,
					mode: "insensitive"
				}
			}
		});
		return {users:ret};
	}

	async removeUserFromFriends(account, user) {
		try {
			console.log(account);
			console.log(user);
			const friendUser = await prisma.user.findUnique({
				where: {
					username: user.username
				}
			});
			const deletedUserRl = await prisma.friend.delete({
				where: {
					friendId_userId: {
						userId: account.userId,
						friendId: friendUser.id
					}
				}
			})
	
			const deletedFriendRl = await prisma.friend.delete({
				where: {
					friendId_userId: {
						userId: friendUser.id,
						friendId: account.userId
					}
				}
			})
		}
		catch (err) {
			throw err;
		}

	}

	async getFriendsChats(account) {
		try {
			const friends = await prisma.user.findUnique({
				where: {
					username: account.username
				},
				select: {
					friends: {
						where: {
							users: {
								some: {
									chats: {
										some:{ 
											members: {
												some: {
													username: account.username
												}
											}
										}
									}
								}
							}
						}
					}
				}
			})
			return friends
		} catch (err) {
			return err;
		}
	}

	async getFriends(account) {
		try {
			const friends = await prisma.user.findUnique({
				where: {
					username: account.username
				},
				select: {
					friends: {
						where: {
							status: "ACCEPTED"
						},
						select: {
							users:true
						}
					}
				}
			})
			return friends;
		} catch (err) {
			throw err;
		}
	}
	async updateData(account, data) {
		try {
			console.log(account.username);
			const user = await prisma.user.update({
				where: {
					username: account.username
				},
				data
			})
		}
		catch (err) {
			throw new HttpException("User Not Found Or Data Invalid", HttpStatus.NOT_FOUND);
		}
	}
	
}