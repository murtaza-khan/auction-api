import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => ItemModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
