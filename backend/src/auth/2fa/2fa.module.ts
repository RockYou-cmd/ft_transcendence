import { Module } from '@nestjs/common';
import { TwoFactorAuthenticationController } from './2fa.controller';
import { TwoFactorAuthenticationService } from './2fa.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [TwoFactorAuthenticationController],
  providers: [TwoFactorAuthenticationService, JwtService, UserService]
})
export class TwoFactorAuthenticationModule {}
