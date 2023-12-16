import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { RoomService } from "../room.service";


@Injectable()
export class OwnerGuard{
	constructor(private roomService: RoomService) {};
	async canActivate(context: ExecutionContext){
		const request = context.switchToHttp().getRequest();
		const roomId = request.body.id;
		const username = request.user.username;
		return "OWNER" === await this.roomService.getMemberShip(roomId, username);
	}
}

@Injectable()
export class AdminGuard{
	constructor(private roomService: RoomService) {};
	async canActivate(context: ExecutionContext){
		const request = context.switchToHttp().getRequest();
		const roomId = request.body.id;
		const username = request.user.username;
		return "ADMIN" === await this.roomService.getMemberShip(roomId, username);
	}
}