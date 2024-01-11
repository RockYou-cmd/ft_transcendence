import { HttpException, Injectable, NotFoundException, UseGuards, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from "argon2"


const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signUp(user) {
    try {
      const hash = await argon.hash(user.password);
      const ret = await prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: hash,
          gameProfile: {
            create: {},
          },
        },
      });
      delete ret.password;
      return await this.generateJwt(ret);
    } catch (err) {
      console.log("SignUp error");
      if (err instanceof PrismaClientKnownRequestError && err.code == "P2002")
        throw new UnauthorizedException(err.meta.target[0] + " already exist");
      return err.message;
    }
  }

  async verifyCredintials(user) {
    try {
      const ret = await prisma.user.findUnique({
        where: {
          username: user.username,
        },
      });
      if (!ret || !ret.password) throw new NotFoundException();
      if (!(await argon.verify(ret.password, user.password)))
        throw new HttpException("Password incorrect", 403); // unAuthorized exception should be thrown
      delete ret.password;
      return ret;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async signIn(user) {
    try {
      const ret = await this.verifyCredintials(user);
      if (ret.is2faEnabled) return 0;
      return await this.generateJwt(ret);
    } catch (err) {
      console.log("SignIn !!Error!!");
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  async OAuthValidation(data) {
    try {
      if (!data) throw new UnauthorizedException();
      var user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        var newUser = 1;
        user = await prisma.user.create({
          data: {
            username: data.username,
            email: data.email,
            photo: data.photo,
            gameProfile: {
              create: {},
            },
          },
        });
      }
      if (user.is2faEnabled) return 0;
      var ret = { token: await this.generateJwt(user) };
      if (newUser)
        ret["new"] = 1;
      return ret;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async generateJwt(user) {
    try {
      const payload = {
        userId: user.id,
        username: user.username,
      };
      return await this.jwtService.signAsync(payload, { secret: "doIwannaKnow" });
    } catch (err) {
      throw Error(err.message);
    }
  }
}
