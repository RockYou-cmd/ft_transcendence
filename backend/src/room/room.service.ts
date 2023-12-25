import { HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import * as argon from "argon2"

const prisma = new PrismaClient();

@Injectable()
export class RoomService {
  async createRoom(account, data) {
    try {
      var roomData = {
        name: data.name,
        members: {
          create: {
            user: {
              connect: {
                username: account.username,
              },
            },
          },
        },
        privacy: data.privacy,
      };
      roomData.members.create["role"] = "OWNER";
      if (data.privacy == "PROTECTED") roomData["password"] = data.password;
      if (data.photo) roomData["photo"] = data.photo;
      if (data.privacy == "PROTECTED") {
        const hash = await argon.hash(data.password);
        console.log("Hash: ", hash);
        roomData["password"] = hash;
      }
      const room = await prisma.room.create({
        data: roomData,
      });
      return "Room created succesfully!";
    } catch (err) {
      throw err;
    }
  }

  async getChat(account, roomId) {
    try {
      const chat = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
        select: {
          messages: true,
          members: true,
        },
      });
      return chat;
    } catch (err) {
      throw err;
    }
  }

  async addMember(data) {
    try {
      const room = await prisma.roomMembership.create({
        data: {
          room: {
            connect: {
              id: data.id,
            },
          },
          user: {
            connect: {
              username: data.username,
            },
          },
        },
      });
      return "member added succesfully!";
    } catch (err) {
      throw err;
    }
  }

  async getMembersToAdd(roomId) {
    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              rooms: {
                every: {
                  roomId: {
                    not: roomId,
                  },
                },
              },
            },
            {
              rooms: {
                some: {
                  AND: [
                    {
                      roomId: roomId,
                    },
                    {
                      status: "BANNED",
                    },
                  ],
                },
              },
            },
          ],
        },
        include: {
          rooms: {
            where: {
              roomId: roomId,
            },
          },
        },
      });
      // console.log("users: ", users);
      return { users: users };
    } catch (err) {
      throw err;
    }
  }

  async removeMember(data) {
    try {
      const room = await prisma.roomMembership.delete({
        where: {
          userId_roomId: {
            userId: data.username,
            roomId: data.id,
          },
        },
      });
      return "member removed succesfully!";
    } catch (err) {
      throw err;
    }
  }

  async addAdmin(data) {
    try {
      const room = await prisma.roomMembership.update({
        where: {
          userId_roomId: {
            userId: data.username,
            roomId: data.id,
          },
        },
        data: {
          role: "ADMIN",
        },
      });

      return "admin added succesfully!";
    } catch (err) {
      throw err;
    }
  }

  async removeAdmin(data) {
    try {
      const room = await prisma.roomMembership.update({
        where: {
          userId_roomId: {
            userId: data.username,
            roomId: data.id,
          },
        },
        data: {
          role: "MEMBER",
        },
      });
      return "admin removed succesfully";
    } catch (err) {
      throw err;
    }
  }

  async getMembers(account, roomId) {
    try {
      const roomMembers = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
        select: {
          members: {
            include: {
              user: true,
            },
            where: {
              status: {
                not: "BANNED",
              },
            },
          },
        },
      });
      return roomMembers;
    } catch (err) {
      throw err;
    }
  }

  async getRooms(account) {
    try {
      const rooms = await prisma.room.findMany({
        where: {
          AND: [
            {
              members: {
                every: {
                  userId: {
                    not: account.username,
                  },
                },
              },
            },
            {
              privacy: {
                not: "PRIVATE",
              },
            },
          ],
        },
      });
      return { rooms: rooms };
    } catch (err) {
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
                  userId: account.username,
                },
                {
                  status: {
                    not: "BANNED",
                  },
                },
              ],
            },
          },
        },
      });
      return { rooms: roomsIn };
    } catch (err) {
      throw err;
    }
  }

  async joinRoom(account, roomId) {
    try {
      const room = await prisma.roomMembership.create({
        data: {
          user: {
            connect: {
              username: account.username,
            },
          },
          room: {
            connect: {
              id: roomId,
            },
          },
        },
      });
      return "User joined";
    } catch (err) {
      throw err;
    }
  }

  async joinProtected(account, data) {
    try {
      const room = await prisma.room.findUnique({
        where: {
          id: data.id,
        },
      });
      if (!(await argon.verify(room.password, data.password)))
        throw new Error("password incorrect");
      return this.joinRoom(account, data.id);
    } catch (err) {
      throw err;
    }
  }

  async leaveRoom(account, roomId) {
    try {
      const room = await prisma.roomMembership.delete({
        where: {
          userId_roomId: {
            userId: account.username,
            roomId: roomId,
          },
        },
      });
      if (room.role == "OWNER") {
        const newOwner = await prisma.roomMembership.findFirst({
          where: {
            AND: [
              {
                roomId: roomId,
              },
              {
                OR: [
                  {
                    role: "ADMIN"
                  },
                  {
                    role: "MEMBER"
                  }
                ]
              },
            ],
          },
        });
        const assign = await prisma.roomMembership.update({
          where: {
            userId_roomId: {
              roomId: roomId,
              userId: newOwner.userId
            },
          },
          data: {
            role: "OWNER"
          }
        })
      }
      return "User left the room";
    } catch (err) {
      throw err;
    }
  }

  async banMember(data) {
    try {
      const membership = await prisma.roomMembership.update({
        where: {
          userId_roomId: {
            userId: data.username,
            roomId: data.id,
          },
        },
        data: {
          status: "BANNED",
        },
      });
      return "User Banned";
    } catch (err) {
      throw err;
    }
  }

  async unbanMember(data) {
    try {
      const membership = await prisma.roomMembership.delete({
        where: {
          userId_roomId: {
            userId: data.username,
            roomId: data.id,
          },
        },
      });
      return "User unBanned";
    } catch (err) {
      throw err;
    }
  }

  async muteMember(data) {
    try {
      const mutedDate = new Date(
        new Date().setHours(new Date().getHours() + Number(data.duration)),
      );

      const memberShip = await prisma.roomMembership.update({
        where: {
          userId_roomId: {
            userId: data.username,
            roomId: data.id,
          },
        },
        data: {
          status: "MUTED",
          mutedTime: mutedDate,
        },
      });
      return "User muted successfully";
    } catch (err) {
      throw err;
    }
  }

  async unMuteMember(data) {
    try {
      const memberShip = await prisma.roomMembership.update({
        where: {
          userId_roomId: {
            userId: data.username,
            roomId: data.id,
          },
        },
        data: {
          status: "ANGEL",
        },
      });
      return "User unmuted successfully";
    } catch (err) {
      throw err;
    }
  }

  async sendMessage(data) {
    try {
      const message = await prisma.roomMessage.create({
        data: {
          content: data.content,
          room: {
            connect: {
              id: data.chatId,
            },
          },
          sender: {
            connect: {
              username: data.sender,
            },
          },
        },
      });
      return message;
    } catch (err) {
      throw err;
    }
  }

  async modifyRoom(data) {
    try {
      var newData = {
        name: data.name,
        description: data.description,
        photo: data.photo,
        privacy: data.privacy,
        password: data.password,
      };
      const modifiedRoom = await prisma.room.update({
        where: {
          id: data.id,
        },
        data: newData,
      });
      return "room modified successfully";
    } catch (err) {
      throw err;
    }
  }

  async getMemberShip(roomId, username) {
    try {
      const memberShip = await prisma.roomMembership.findUnique({
        where: {
          userId_roomId: {
            userId: username,
            roomId: roomId,
          },
        },
      });
      return memberShip;
    } catch (err) {
      throw err;
    }
  }
}
