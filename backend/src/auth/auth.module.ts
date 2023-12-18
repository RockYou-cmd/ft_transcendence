import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { googleStrategy } from './strategies/google.strategy';
import { intraStrategy } from './strategies/intra.strategy';
import { AuthGuard } from './auth.guard/auth.guard';
import { TwoFactorAuthenticationModule } from './2fa/2fa.module';

@Module({
  providers: [
    AuthService,
    googleStrategy,
    intraStrategy,
    AuthGuard,
    JwtService,
  ],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard, JwtService],
  imports: [TwoFactorAuthenticationModule],
})
export class AuthModule {}
