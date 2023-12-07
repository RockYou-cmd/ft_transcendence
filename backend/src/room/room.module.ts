import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';

@Module({
  controllers: [RoomController],
  providers: [RoomService, UserService, JwtService, AuthGuard],
  imports: [UserModule]
})
export class RoomModule {}
