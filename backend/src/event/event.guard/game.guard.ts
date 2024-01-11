import {
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { parse } from "cookie";

@Injectable()
export class gameGuard {
  constructor(private jwtServive: JwtService) {}
  async canActivate(context: ExecutionContext) {
    var cookie = context.switchToHttp().getRequest().handshake.headers.cookie;
    if (!cookie) throw new UnauthorizedException();
    cookie = parse(cookie);
    try {
      const payload = await this.verifyToken(cookie.access_token);
      const data = context.switchToHttp().getRequest();
      data.user = payload;
			// console.log(data);
			
      // data["user"] = payload;
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
