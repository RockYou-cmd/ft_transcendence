import {
  UnauthorizedException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common"; 
import { PrismaClient } from "@prisma/client";
import { UserService } from "../user.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

@Injectable()
export class FriendService {
  constructor(private userService: UserService) {}

  async sendRequest(account, friend) {
    try {
      const friendShip = await prisma.friendShip.create({
        data: {
          sender: {
            connect: {
              username: account.username,
            },
          },
          users: {
            connect: [
              {
                username: account.username,
              },
              {
                username: friend.username,
              },
            ],
          },
          userId: friend.username,
        },
      });
      return "Request Sent";
    } catch (err) {

      if (err instanceof PrismaClientKnownRequestError && err.code == "P2002")
        throw new UnauthorizedException(
          err.meta.target[0] + " already in the friend list",
        );
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async acceptRequest(account, sender) {
    try {
      const friendShipId = await this.getFriendShipId(account, sender);
      const updated = await prisma.friendShip.update({
        where: {
          id: friendShipId,
        },
        data: {
          status: "ACCEPTED",
        },
      });
      return "User accepted";
    } catch (err) {
      throw err;
    }
  }

  async getFriendsChats(account) {
    try {
      const chats = await prisma.chat.findMany({
        where: {
          AND: [
            {
              members: {
                some: {
                  username: account.username,
                },
              },
            },
            {
              messages: {
                some: {},
              },
            },
          ],
        },
        select: {
          members: {
            where: {
              NOT: {
                username: account.username,
              },
            },
            include: {
              friends: {
                where: {
                  users: {
                    some: {
                      username: account.username,
                    },
                  },
                },
                include: {
                  blocked: {
                    select: {
                      username: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      // console.log(chats[0].members[0].friends)
      return { chats };
    } catch (err) {
      return err;
    }
  }

  async getFriends(account) {
    try {
      const friends = await prisma.user.findUnique({
        where: { username: account.username },
        select: {
          friends: {
            where: {
              status: "ACCEPTED",
            },
            select: {
              users: {
                where: {
                  NOT: {
                    username: account.username,
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

  async removeFriend(account, user) {
    try {
      const friendShipId = await this.getFriendShipId(account, user);
      const deleted = await prisma.friendShip.delete({
        where: {
          id: friendShipId,
        },
      });
      return "friendShip deleted";
    } catch (err) {
      throw err;
    }
  }

  async getFriendShipId(user1, user2) {
    const friendShip = await prisma.user.findUnique({
      where: {
        username: user1.username,
      },
      select: {
        friends: {
          where: {
            users: {
              some: {
                username: user2.username,
              },
            },
          },
        },
      },
    });
    if (!friendShip || !friendShip.friends)
      throw new HttpException("friend not found", HttpStatus.NOT_FOUND);
    return friendShip.friends[0]?.id;
  }

  async blockFriend(account, user) {
    try {
      const friendShipId = await this.getFriendShipId(account, user);
      if (!friendShipId) {
        var blocked = await prisma.friendShip.create({
          data: {
            sender: {
              connect: {
                username: account.username,
              },
            },
            blocked: {
              connect: {
                username: user.username,
              },
            },
            users: {
              connect: [
                {
                  username: account.username,
                },
                {
                  username: user.username,
                },
              ],
            },
            status: "BLOCKED",
            userId: user.username,
          },
        });
      } else {
        var blocked = await prisma.friendShip.update({
          where: {
            id: friendShipId,
          },
          data: {
            blocked: {
              connect: {
                username: user.username,
              },
            },
            sender: {
              connect: {
                username: account.username,
              },
            },
            status: "BLOCKED",
          },
        });
      }
      return "User blocked";
    } catch (err) {
      throw err;
    }
  }

	async getPendingRequests(account) {
		try {
      const friends = await prisma.user.findUnique({
        where: { username: account.username },
        select: {
          friends: {
						where: {
							AND: [
								{
									status: "PENDING",
								},
								{
									sender: {
										username: {
											not: account.username
										}
									}
								}
							]
            },
						select: {
              users: {
                where: {
                  NOT: {
                    username: account.username,
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
}