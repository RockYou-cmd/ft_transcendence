import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { googleStrategy } from './strategies/google.strategy';
import { intraStrategy } from './strategies/intra.strategy';
import { TwoFactorAuthenticationModule } from './2fa/2fa.module';

@Module({
  providers: [AuthService, googleStrategy, intraStrategy],
  controllers: [AuthController],
  imports: [JwtModule.register({secret:"hard", signOptions:{expiresIn:"90m"}}), TwoFactorAuthenticationModule]
})
export class AuthModule {}
