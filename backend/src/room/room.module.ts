import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';
import { MemberGuard, OwnerGuard } from './room.guard/role.guard';
import { AdminGuard } from './room.guard/role.guard';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RoomController],
  providers: [RoomService, UserService, OwnerGuard, AdminGuard, MemberGuard],
  imports: [UserModule]
})
export class RoomModule {}
