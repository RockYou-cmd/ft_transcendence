import { Module } from '@nestjs/common';
import { TwoFactorAuthenticationController } from './2fa.controller';
import { TwoFactorAuthenticationService } from './2fa.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [TwoFactorAuthenticationController],
  providers: [TwoFactorAuthenticationService, UserService],
})
export class TwoFactorAuthenticationModule {}
