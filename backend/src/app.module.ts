import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FriendModule } from './user/friend/friend.module';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';
import { EventsModule } from './events-gateway/events.module';

@Module({
  imports: [UserModule, FriendModule, ChatModule, RoomModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
