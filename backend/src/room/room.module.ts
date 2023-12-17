import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';
import { OwnerGuard } from './room.guard/role.guard';
import { AdminGuard } from './room.guard/role.guard';

@Module({
  controllers: [RoomController],
  providers: [RoomService, UserService, JwtService, AuthGuard, OwnerGuard, AdminGuard],
  imports: [UserModule]
})
export class RoomModule {}
