import { HttpException, HttpStatus, Injectable, NotFoundException, Req } from "@nestjs/common";
import { Prisma, PrismaClient, User } from "@prisma/client";
import * as argon from "argon2"
import { AuthService } from "src/auth/auth.service";

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(private authService: AuthService) { }
  async delete() {
    await prisma.roomMessage.deleteMany()
    await prisma.roomMembership.deleteMany()
    await prisma.message.deleteMany()
    // await prisma.friendShip.deleteMany()
    await prisma.user.deleteMany();
  }


  async getProfile(user) {
    try {
      const ret = await prisma.user.findUnique({
        where: {
          username: user.username,
        },
        include: {
          friends: true,
          gameProfile: true
        },
      });
      if (!ret) throw new NotFoundException("User Not Found");
      return ret;
    } catch (err) {
      console.log("getProfile !Error!");
      throw err;
    }
  }
  async getData(user) {
    try {
      const ret = await prisma.user.findUnique({
        where: {
          username: user.username,
        },
      });
      if (!ret) throw new NotFoundException("User Not Found");
      return ret;
    } catch (err) {
      console.log("getData !Error!");
      throw err;
    }
  }

  async getUser(account, user) {
    try {
      const userData = await this.getData(user);
      const ret = await prisma.user.findUnique({
        where: {
          username: account.username,
        },
        include: {
          friends: {
            where: {
              users: {
                some: {
                  username: user.username,
                },
              },
            },
            include: {
              sender: true,
              blocked: true,
            },
          },
        },
      });
      if (!ret) throw new NotFoundException("User Not Found");
      console.log(userData);
      return {
        ...userData,
        friendShipstatus: ret.friends[0]?.status,
        sender: ret.friends[0]?.sender?.username,
        blocked: ret.friends[0]?.blocked?.username,
      };
    } catch (err) {
      throw err;
    }
  }

  async getUserFriends(username) {
    try {
      const friends = await prisma.user.findUnique({
        where: { username: username },
        select: {
          friends: {
            where: {
              status: "ACCEPTED"
            },
            select: {
              users: {
                where: {
                  NOT: {
                    username: username,
                  },
                },
              },
            },
          },
        },
      });
      return friends;
    } catch (err) {
      throw err;
    }
  }

  async getUsers() {
    try {
      return await prisma.user.findMany({
        include: {
          friends: true,
          // messagesSent:true,
          // messagesReceived:true,
          rooms: {
            include: {
              room: true,
            },
          },
        },
      });
    } catch (err) {
      console.log("get all error");
      return err;
    }
  }

  async getGames(account) {
    try {
      const games = await prisma.game.findMany({
        where: {
          participants: {
            some: {
              profile: {
                userId: account.username
              }
            }
          }
        },
        select: {
          participants: true
        }
      });
      console.log(games)
      return games;
    } catch (err) {
      console.log("get games error :  ",err);
      return err;
    }
  }

  async updateUser(user, field, value) {
    const data = { [field]: value };
    try {
      const ret = await prisma.user.update({
        where: {
          username: user.username,
        },
        data,
      });
    } catch (err) {
      throw err;
    }
  }

  async search(username) {
    const ret = await prisma.user.findMany({
      where: {
        username: {
          startsWith: username,
          mode: "insensitive",
        },
      },
    });
    return { users: ret };
  }

  async updateData(account, data) {
    try {
      const user = await prisma.user.update({
        where: {
          username: account.username,
        },
        data,
      });
      return this.authService.generateJwt(user);
    } catch (err) {
      console.log("invalid data or user not found");
      throw new HttpException("User Not Found Or Data Invalid", HttpStatus.NOT_FOUND);
    }
  }

  async changePassword(account, data) {
    try {
      const verified = this.authService.verifyCredintials({username:account.username, password:data.password})
      console.log(verified);
      if (!verified) throw new HttpException("password incorrect", HttpStatus.UNAUTHORIZED);
      const hash = await argon.hash(data.password);
      const ret = await prisma.user.update({
        where: {
          username: account.username
        },
        data: {
          password: hash
        }
      })
    } catch (err) {
      throw err;
    }
  }
}