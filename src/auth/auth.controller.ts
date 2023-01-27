import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto, UserDto } from '../user/Dto/user.types';
import { UserService } from '../user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';

@Controller('')
@Public()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @ApiTags('Auth')
  @Post('user/create')
  async create(@Body() userData: UserDto): Promise<any> {
    const user = await this.userService.save(userData);
    return user;
  }

  @ApiTags('Auth')
  @Post('user/login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
