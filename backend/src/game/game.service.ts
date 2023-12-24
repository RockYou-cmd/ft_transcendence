import { Injectable } from "@nestjs/common";

@Injectable()
export class GameService {
  FPS = 50;
  ball_SPEED = 1.2;
  COM_LVL = 0.15;
  ball_acc = 0.12;
  gameHeight = 900;
  gameWidth = 1500;

  player1 = {
    x: 20,
    y: this.gameHeight / 2 - 120 / 2,
    width: 12,
    height: 140,
    score: 0,
  };

  player2 = {
    x: this.gameWidth - 32,
    y: this.gameHeight / 2 - 120 / 2,
    width: 12,
    height: 140,
    score: 0,
  };

  ball = {
    x: this.gameWidth / 2,
    y: this.gameHeight / 2,
    radius: 16,
    speed: this.ball_SPEED,
    velocityX: 5,
    velocityY: 5,
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

  ler(a: number, b: number, n: number) {
    return a + (b - a) * n;
  }

  reset() {
    this.ball.x = this.gameWidth / 2;
    this.ball.y = this.gameHeight / 2;
    this.ball.speed = this.ball_SPEED;
    this.ball.velocityX = -this.ball.velocityX;
    this.player1.y = this.gameHeight / 2;
    this.player2.y = this.gameHeight / 2;
  }

  updateCOM() {
    if (this.ball.velocityX == 10 || this.ball.velocityX == -10) {
      this.ball.y += (this.ball.velocityY * this.ball.speed) / 2;
      this.ball.x += (this.ball.velocityX * this.ball.speed) / 2;
    } else {
      this.ball.y += this.ball.velocityY * this.ball.speed;
      this.ball.x += this.ball.velocityX * this.ball.speed;
    }

    if (
      this.ball.y + this.ball.radius >= this.gameHeight ||
      this.ball.y - this.ball.radius <= 0
    ) {
      this.ball.velocityY = -this.ball.velocityY;
    }

    var touch_player =
      this.ball.x < this.gameWidth / 2 ? this.player1 : this.player2;

    if (this.collision(this.ball, touch_player)) {
      const playerPos = {
        top: touch_player.y,
        buttom: touch_player.y + touch_player.height,
        middle: touch_player.height / 2 + touch_player.y,
      };
      // console.log("this.ball.x ", this.ball.x, "this.ball.y ", this.ball.y);

      // if (this.ball.velocityX < 0)
      // 	this.ball.velocityX = 5;
      // else
      // 	this.ball.velocityX = -5;
      this.ball.speed += this.ball_acc;

      // console.log("player Pos", playerPos);
      // console.log("this.ball Pos", this.ball.y + this.ball.radius / 2);

      if (
        playerPos.top <= this.ball.y + this.ball.radius / 2 &&
        this.ball.y + this.ball.radius / 2 < playerPos.middle
      ) {
        // console.log("velocity ", this.ball.velocityY);
        if (this.ball.velocityY > 0) {
          // this.ball.velocityY = -10;
          this.ball.velocityX = 10;
        } else {
          // this.ball.velocityY = 5;
          this.ball.velocityX = 5;
        }
      } else if (
        playerPos.buttom > this.ball.y + this.ball.radius / 2 &&
        this.ball.y + this.ball.radius / 2 >= playerPos.middle
      ) {
        // console.log("velocity ", this.ball.velocityY);
        if (this.ball.velocityY < 0) {
          // this.ball.velocityY = -5;
          this.ball.velocityX = 10;
        } else {
          // this.ball.velocityY = 10;
          this.ball.velocityX = 5;
        }
      }
      // else
      // 	this.ball.velocityX = 100;
      if (touch_player == this.player2)
        this.ball.velocityX = -this.ball.velocityX;
    }

    // Computer
    var pos_player2 = this.ball.y - this.player2.height / 2;
    var cur_pos = this.player2.y;
    this.player2.y = this.ler(cur_pos, pos_player2, this.COM_LVL);

    if (this.ball.x + this.ball.radius <= 0) {
      this.player2.score++;
      this.reset();
    } else if (this.ball.x - this.ball.radius >= this.gameWidth) {
      this.player1.score++;
      this.reset();
    }
  }
}
