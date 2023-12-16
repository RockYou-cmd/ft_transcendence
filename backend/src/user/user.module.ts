import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
	imports:[AuthModule],
	controllers:[UserController],
	providers: [UserService, AuthGuard, JwtService]
})
export class UserModule {}
