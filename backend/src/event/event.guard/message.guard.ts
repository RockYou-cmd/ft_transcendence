import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {parse} from "cookie"

@Injectable()
export class messageGuard {
  constructor(private jwtServive: JwtService) {}
  async canActivate(context: ExecutionContext) {
    var cookie = context.switchToHttp().getRequest().handshake.headers.cookie;
    if (!cookie) throw new UnauthorizedException();
    cookie = parse(cookie);
    try {
      const payload = await this.verifyToken(cookie.access_token);
      const data = context.switchToWs().getData();
      if (data.sender != payload.username)
        throw new Error();
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async verifyToken(token) {
    try {
      return await this.jwtServive.verifyAsync(token, {
        secret: "doIwannaKnow",
      });
    } catch (err) {
      throw err;
    }
  }
}
