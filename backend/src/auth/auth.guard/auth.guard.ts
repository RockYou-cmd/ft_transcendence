import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthGuard {
	constructor(private jwtServive: JwtService, private configService:ConfigService) {};
	async canActivate(context: ExecutionContext){
		const request = context.switchToHttp().getRequest();
		if (!request.cookies.access_token) throw new UnauthorizedException();
		try {
			const payload = await this.extractPayloadFromToken(request.cookies.access_token);
			request.user = payload;
		}
		catch (err) {
			throw new UnauthorizedException();
		}
		return true;
	}

	async extractPayloadFromToken(token) {
		try{
			return await this.jwtServive.verifyAsync(token, {
        secret: this.configService.get("SECRET"),
      });
		}
		catch(err) {
			throw err;
		}
		
	}

}