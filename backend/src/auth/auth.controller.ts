import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { authDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { get } from "http";
import { Response } from "express";
import { TwoFactorAuthenticationService } from "./2fa/2fa.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private twoFactorAuthenticationService: TwoFactorAuthenticationService,
  ) {}

  @Post("signUp")
  async signUp(@Body() dto: authDto, @Res() res: Response) {
    res.cookie("access_token", await this.authService.signUp(dto), {
      httpOnly: true,
    });
    res.send("User ignedUp succesfully");
  }

  @Post("signIn")
  async singIn(@Body() ndto, @Res() res: Response) {
    const token = await this.authService.signIn(ndto);
    if (!token) res.send("2faEnabled").status(425);
    res.cookie("access_token", token, { httpOnly: true });
    res.send("User signedIn succesfully");
  }
  
  @Get("verifyToken")
  async verifyToken(@Query() data, @Res() res: Response) {
    const ret = await this.twoFactorAuthenticationService.verifyToken(
      { username: data.username },
      data.token,
      );
      const token = await this.authService.generateJwt(ret);
      res.cookie("access_token", token, { httpOnly: true });
      res.send("User signedIn succesfully");
  }

  @UseGuards(AuthGuard("google"))
  @Get("google")
  google() {}

  @Post("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(@Req() req, @Res() res: Response) {
    res.cookie(
      "access_token",
      await this.authService.OAuthValidation(req.user),
      { httpOnly: true },
    );
    res.send("User signedIn succesfully");
  }

  @UseGuards(AuthGuard("42"))
  @Get("intra")
  async intra() {}

  @Post("intra/callback")
  @UseGuards(AuthGuard("42"))
  async intraCallback(@Req() req, @Res() res: Response) {
    res.cookie(
      "access_token",
      await this.authService.OAuthValidation(req.user),
      { httpOnly: true },
    );
    res.send("User signedIn succesfully");
  }

  @Get("logout")
  async logOut(@Res() res: Response) {
    res.clearCookie("access_token");
    res.send("User logedout succesfully");
  }
}
