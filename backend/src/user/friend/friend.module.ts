import { Module } from "@nestjs/common";
import { FriendController } from "./friend.controller";
import { FriendService } from "./friend.service";
import { UserService } from "../user.service";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";
import { JwtService } from "@nestjs/jwt";
import { UserModule } from "../user.module";
import { AuthService } from "src/auth/auth.service";




@Module({
	controllers: [FriendController],
	providers: [FriendService, UserService],
	imports: [UserModule]

})

export class FriendModule {}