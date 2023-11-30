import { Module } from "@nestjs/common";
import { FriendRequestController } from "./friendRequest.controller";
import { FriendRequestService } from "./friendRequest.service";
import { UserService } from "../user.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";
import { JwtService } from "@nestjs/jwt";




@Module({
	controllers: [FriendRequestController],
	providers: [FriendRequestService, UserService, AuthGuard, JwtService]

})

export class FriendRequestModule {}