import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard {
	constructor(private jwtServive: JwtService) {};
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
			return await this.jwtServive.verifyAsync(token, {secret:"doIwannaKnow"});
		}
		catch(err) {
			throw err;
		}
		
	}

}