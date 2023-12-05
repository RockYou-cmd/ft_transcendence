import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
			throw new HttpException("Room created succesfully!", HttpStatus.CREATED);
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
					members: {
						where: {
							userId: account.username
						}
					}
				}
			})
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
			throw new HttpException("member added succesfully!", HttpStatus.CREATED);
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
			throw new HttpException("member removed succesfully!", HttpStatus.ACCEPTED);
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

			throw new HttpException("admin added succesfully!", HttpStatus.ACCEPTED);
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
			throw new HttpException("admin removed succesfully!", HttpStatus.CREATED);
		}
		catch(err) {
			throw err;
		}
	}

	async getMembers(roomId) {
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
			console.log(account)
			console.log(roomId)
			// const room = await prisma.roomMembership.create({
			// 	data: {
			// 		user: {
			// 			connect: {
			// 				username: account.username
			// 			}
			// 		},
			// 		room: {
			// 			connect: {
			// 				id: roomId
			// 			}
			// 		},
			// 	}
			// });
			throw new HttpException("User joined the room", HttpStatus.ACCEPTED);
		}
		catch(err) {
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
			{
				console.log("passs ",data.password);
				throw new HttpException("Password incorrect!", HttpStatus.NOT_ACCEPTABLE);
			}
			console.log(room);
			this.joinRoom(account, data.id);
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
			throw new HttpException("User left the room", HttpStatus.ACCEPTED);
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
			throw new HttpException("User Banned", HttpStatus.ACCEPTED);
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
			throw new HttpException("User unBanned", HttpStatus.ACCEPTED);
		}
		catch (err) {
			throw err;
		}
	}
	
}