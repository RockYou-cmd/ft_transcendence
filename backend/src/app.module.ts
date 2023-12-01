import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FriendRequestModule } from './user/friendRequest/friendRequest.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UserModule, FriendRequestModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
