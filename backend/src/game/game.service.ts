import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class GameService {
  FPS = 50;
  ball_SPEED = 1.2;
  ball_acc = 0.1;
  gameHeight = 900;
  gameWidth = 1500;
  base_xp = 100;

  player1 = {
    x: 12,
    y: this.gameHeight / 2 - this.gameHeight / 6.5 / 2,
    width: 12,
    height: this.gameHeight / 6.5,
    score: 0,
  };

  player2 = {
    x: this.gameWidth - 24,
    y: this.gameHeight / 2 - this.gameHeight / 6.5 / 2,
    width: 12,
    height: this.gameHeight / 6.5,
    score: 0,
  };

  ball = {
    x: this.gameWidth / 2,
    y: this.gameHeight / 2,
    radius: 16,
    speed: this.ball_SPEED,
    velocityX: 5,
    velocityY: 0,
  };

  collision(b: any, p: any) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return (
      p.left < b.right &&
      p.top < b.bottom &&
      p.right > b.left &&
      p.bottom > b.top
    );
  }

  reset() {
    this.ball.x = this.gameWidth / 2;
    this.ball.y = this.gameHeight / 2;
    this.ball.speed = this.ball_SPEED;
    this.ball.velocityX = -this.ball.velocityX;
    this.ball.velocityY = 0;
    (this.player1.y = this.gameHeight / 2 - this.gameHeight / 6.5 / 2),
      (this.player2.y = this.gameHeight / 2 - this.gameHeight / 6.5 / 2);
  }

  updateCOM() {
    this.ball.y += this.ball.velocityY * this.ball.speed;
    this.ball.x += this.ball.velocityX * this.ball.speed;

    if (
      this.ball.y + this.ball.radius >= this.gameHeight ||
      this.ball.y - this.ball.radius <= 0
    ) {
      if (this.ball.y + this.ball.radius >= this.gameHeight) {
        if (this.ball.velocityY > 0) this.ball.velocityY = -this.ball.velocityY;
      } else if (this.ball.y - this.ball.radius <= 0) {
        if (this.ball.velocityY < 0) this.ball.velocityY = -this.ball.velocityY;
      }
    }

    var touch_player =
      this.ball.x < this.gameWidth / 2 ? this.player1 : this.player2;

    if (this.collision(this.ball, touch_player)) {
      const playerPos = {
        top: touch_player.y,
        buttom: touch_player.y + touch_player.height,
        middle: touch_player.height / 2 + touch_player.y,
      };

      console.log("game Speed", this.ball.speed, this.ball_acc);
      if (this.ball.speed < 8) {
        this.ball.speed += this.ball_acc;
      }
      console.log("game Speed", this.ball.speed);

      if (
        playerPos.top <= this.ball.y + this.ball.radius &&
        this.ball.y + this.ball.radius / 2 < playerPos.middle
      ) {
        this.ball.velocityY = -5;
      } else if (
        playerPos.buttom >= this.ball.y - this.ball.radius &&
        this.ball.y - this.ball.radius / 2 > playerPos.middle
      ) {
        this.ball.velocityY = 5;
      } else this.ball.velocityY = 0;

      this.ball.velocityX = -this.ball.velocityX;
    }
    // Compute

    if (this.ball.x + this.ball.radius <= 0) {
      this.player2.score++;
      this.reset();
    } else if (this.ball.x - this.ball.radius >= this.gameWidth) {
      this.player1.score++;
      this.reset();
    }
  }

  async updateGameProfile(data) {
    try {
      // console.log("data: ", data);
      const { participants } = await prisma.game.create({
        data: {
          participants: {
            create: [
              {
                score: data.winnerScore,
                profile: {
                  connect: {
                    userId: data.winner,
                  },
                },
              },
              {
                score: data.loserScore,
                profile: {
                  connect: {
                    userId: data.loser,
                  },
                },
              },
            ],
          },
        },
        select: {
          participants: {
            select: {
              profile: true,
            },
            orderBy: {
              score: "desc",
            },
          },
        },
      });
      var newWinnerData: any = {xp:participants[0].profile.xp + 50};
      var newLoserData: any = {xp:participants[1].profile.xp + 10};
      if (
        newWinnerData.xp >
        this.base_xp * (1.2 ^ (participants[0].profile.level))
      ) {
        newWinnerData = {
          level: {
            increment: 1,
          },
          xp: 0,
          requiredXp:
            this.base_xp * (1.2 ^ (participants[0].profile.level)),
        };
      }
      if (
        newLoserData.xp >
        this.base_xp * (1.2 ^ (participants[1].profile.level))
      ) {
        newLoserData = {
          level: {
            increment: 1,
          },
          xp: 0,
          requiredXp:
            this.base_xp * (1.2 ^ (participants[1].profile.level)),
        };
      }
      if (!data.loserScore)
        newWinnerData["cs"] = participants[0].profile.cs + 1;
       const ret = await prisma.gameProfile.update({
         where: {
           userId: data.winner,
         },
         data: {
           gamesPlayed: {
             increment: 1,
           },
           goalsScored: {
             increment: data.winnerScore,
           },
           goalsConced: {
             increment: data.loserScore,
           },
           wins: {
             increment: 1,
           },
           ...newWinnerData,
         },
       });
        await prisma.gameProfile.update({
          where: {
            userId: data.loser,
          },
          data: {
            gamesPlayed: {
              increment: 1,
            },
            goalsScored: {
              increment: data.loserScore,
            },
            goalsConced: {
              increment: data.winnerScore,
            },
            losses: {
              increment: 1,
            },
            ...newLoserData,
          },
        });
      // console.log(ret);
    } catch (err) {
      throw err;
    }
  }
}
