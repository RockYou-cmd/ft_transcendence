import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { userService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
	imports:[AuthModule],
	controllers:[userController],
	providers: [userService, AuthGuard, JwtService]
})
export class UserModule {}
