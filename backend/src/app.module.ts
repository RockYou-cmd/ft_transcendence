import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FriendModule } from './user/friend/friend.module';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';
import { EventModule } from './event-gateway/event.module';
import { GameModule } from './game-gateway/game.module';

@Module({
  imports: [UserModule, FriendModule, ChatModule, RoomModule, EventModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
