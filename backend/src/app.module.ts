import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FriendModule } from './user/friend/friend.module';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';
import { eventModule } from './event/event.module';
import { GameModule } from './game/game.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    FriendModule,
    ChatModule,
    RoomModule,
    eventModule,
    GameModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    global.CONFIG = this.configService;
  }
}
