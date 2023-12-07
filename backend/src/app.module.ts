import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FriendRequestModule } from './user/friendRequest/friendRequest.module';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [UserModule, FriendRequestModule, ChatModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
