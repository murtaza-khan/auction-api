import * as bcrypt from 'bcrypt';
import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {
  constructErrorResponse,
  constructSuccessResponse,
} from '../common/wrappers';
import { VerificationTokenDto } from '../user/Dto/user.types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByCriteria({ email });
    if (!user) {
      return constructErrorResponse({
        message: 'Email not found!',
        status: 404,
      });
    }
    const res = await bcrypt.compare(pass, user.password);
    if (res === true) {
      return user;
    } else {
      return constructErrorResponse({
        message: 'Password Incorrect!',
        status: 401,
      });
    }
  }

  async login(loginUser: any) {
    try {
      let user: any = await this.validateUser(
        loginUser.email,
        loginUser.password,
      );

      const response = {
        user: undefined,
        accessToken: undefined,
      };

      const payload = {
        email: user.email,
        sub: user._id,
        userRole: user.userRole,
      };
      const accessToken = await this.getAccessToken(payload);

      response.accessToken = accessToken;

      user = JSON.parse(JSON.stringify(user));
      delete user.password;

      response.user = user;

      return constructSuccessResponse(
        response,
        'You are logged in successfully!',
      );
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
  async getAccessToken(payload) {
    return this.jwtService.sign(payload);
  }
  async verifyEmailCode(data: VerificationTokenDto) {
    const { user } = await this.userService.verifyToken(data);

    const payload = {
      email: user.email,
      sub: user._id,
      userRole: user.userRole,
    };
    const accessToken = await this.getAccessToken(payload);
    return constructSuccessResponse(
      { accessToken },
      'Token verified successfully!',
    );
  }
}
