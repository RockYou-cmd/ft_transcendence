import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FriendRequestModule } from './user/friendRequest/friendRequest.module';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';
import { EventsModule } from './events-gateway/events.module';

@Module({
  imports: [UserModule, FriendRequestModule, ChatModule, RoomModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
