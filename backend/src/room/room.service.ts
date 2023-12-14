import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';

const prisma = new PrismaClient();

@Injectable()
export class RoomService {


	async createRoom(account, data) {
		try{
			var roomData = {
				name: data.name,
				members: {
					create: {
						user: {
							connect: {
								username: account.username
							}
						},
					}
				},
				privacy: data.privacy
			}
			roomData.members.create["role"] = "OWNER";
			if (data.privacy == "PROTECTED")
				roomData["password"] = data.password;
			const room = await prisma.room.create({
				data: roomData,
			})
			return "Room created succesfully!";
		}
		catch (err) {
			throw err;
		}
	}

	async getChat(account, roomId) {
		try {
			const chat = await prisma.room.findUnique({
				where: {
					id: roomId
				},
				select: {
					messages: true,
					members: true
				}
			})
			// console.log(chat);
			return chat;

		}
		catch(err) {
			throw err;
		}
	
	}

	async addMember(data) {
		try{
			const room = await prisma.roomMembership.create({
				data: {
					room: {
						connect: {
							id: data.id
						}
					},
					user: {
						connect: {
							username: data.username
						}
					}
				}
			})
			return "member added succesfully!";
		}
		catch(err) {
			throw err;
		}
	}

	async addNewMember(roomId) {
		try{
			console.log(roomId);
			const users = await prisma.user.findMany({
				where:{
					rooms: {
						every: {
							roomId: {
								not: roomId
							}
						}
					}
				}
			})
			console.log("users: ", users);
			return {users: users};
		}
		catch(err) {
			throw err;
		}
	}
	
	
	async removeMember(data) {
		try{
			const room = await prisma.roomMembership.delete({
				where: {
					userId_roomId: {
						userId: data.username,
						roomId: data.id
					}
				},
			})
			return "member removed succesfully!";
		}
		catch(err) {
			throw err;
		}
	}
	
	async addAdmin(data) {
		try{
			const room = await prisma.roomMembership.update({
				where: {
					userId_roomId: {
						userId: data.username,
						roomId: data.id
					}
				},
				data: {
					role: "ADMIN"
				}
			})

			return "admin added succesfully!";
		}
		catch(err) {
			throw err;
		}
	}

	async removeAdmin(data) {
		try{
			const room = await prisma.roomMembership.update({
				where: {
					userId_roomId: {
						userId: data.username,
						roomId: data.id
					}
				},
				data: {
					role: "MEMBER"
				}
			})
			return "admin removed succesfully";
		}
		catch(err) {
			throw err;
		}
	}

	async getMembers(account, roomId) {
		try{
			const roomMembers = await prisma.room.findUnique({
				where: {
					id: roomId
				},
				select: {
					members: {
						include: {
							user: true
						}
					}
				}
			})
			return roomMembers;
		}
		catch (err) {
			throw err;
		}
	}

	async getRooms(account) {
		try {
			const rooms = await prisma.room.findMany({
				where: {
					members: {
						every:{
							userId: {
								not: account.username
							}
						}
					}
				}
			});
			return {rooms: rooms};
		}
		catch (err) {
			throw err;
		}
	}

	async getRoomsIn(account) {
		try {
			const roomsIn = await prisma.room.findMany({
				where: {
					members: {
						some: {
							AND: [
								{
									userId: account.username
								},
								{
									status: null
								}
							]
						}
					}
				}
			});
			return {rooms: roomsIn};
		}
		catch(err) {
			throw err;
		}
	}

	async joinRoom(account, roomId) {
		try{
			const room = await prisma.roomMembership.create({
				data: {
					user: {
						connect: {
							username: account.username
						}
					},
					room: {
						connect: {
							id: roomId
						}
					},
				}
			});
			return "User joined"
		}
		catch(err) {
			console.log(err);
			throw err;
		}
	}

	async joinPrivate(account, data) {
		try {
			console.log("data : ", data)
			const room = await prisma.room.findUnique({
				where: {
					id: data.id
				}
			});
			if (data.password != room.password)
				throw new Error("password incorrect");
			return this.joinRoom(account, data.id);
		}	
		catch(err) {
			throw err;
		}
	}

	async leaveRoom(account, roomId) {
		try{
			const room = await prisma.roomMembership.delete({
				where: {
					userId_roomId: {
						userId: account.username,
						roomId: roomId
					}
				}
			});
			return "User left the room";
		}
		catch(err) {
			throw err;
		}
	}

	async banMember(data) {
		try {
			const membership = await prisma.roomMembership.update({
				where: {
					userId_roomId: {
						userId: data.username,
						roomId: data.id
					
					}
				},
				data: {
					status: 'BANNED'					
				}
			});
			return "User Banned";
		}
		catch (err) {
			throw err;
		}
	}

	async unbanMember(data) {
		try {
			const membership = await prisma.roomMembership.delete({
				where: {
					userId_roomId: {
						userId: data.username,
						roomId: data.id
					
					}
				},
			});
			return "User unBanned";
		}
		catch (err) {
			throw err;
		}
	}
	
}