import { Module } from '@nestjs/common';
import { TwoFactorAuthenticationController } from './2fa.controller';
import { TwoFactorAuthenticationService } from './2fa.service';
import { UserService } from 'src/user/user.service';
import { AuthModule } from '../auth.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TwoFactorAuthenticationController],
  providers: [TwoFactorAuthenticationService, UserService, AuthService, JwtService],
  exports: [TwoFactorAuthenticationService]
})
export class TwoFactorAuthenticationModule {}
