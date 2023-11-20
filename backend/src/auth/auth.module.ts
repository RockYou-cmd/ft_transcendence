import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { googleStrategy } from './strategies/google.strategy';
import { intraStrategy } from './strategies/intra.strategy';

@Module({
  providers: [AuthService, googleStrategy, intraStrategy],
  controllers: [AuthController],
  imports: [JwtModule.register({secret:"hard", signOptions:{expiresIn:"90m"}})]
})
export class AuthModule {}
