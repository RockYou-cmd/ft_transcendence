import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard {
	constructor(private jwtServive: JwtService) {};
	async canActivate(context: ExecutionContext){
		const request = context.switchToHttp().getRequest();
		// console.log(request);
		// const token = this.extractTokenFromHeader(request);
		// if (!token) throw new UnauthorizedException();
		// try {
		// 	const payload = await this.jwtServive.verifyAsync(token, {secret:"hard"});
		// 	request.user = payload;
		// }
		// catch (err) {
		// 	throw new UnauthorizedException();
		// }
		// return true;
	}
	private extractTokenFromHeader(request: Request) {
		const [type, token] = request.headers.authorization?.split(" ") || [];
		return type === 'Bearer' ? token : undefined;
	}
}