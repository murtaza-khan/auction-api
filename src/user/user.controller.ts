import {
  Body,
  Controller, Post
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../common/enums';
import { Roles } from '../common/roles.decorator';
import { NotificationDto } from './Dto/user.types';
import { UserService } from './user.service';

@Controller('user')
@ApiBearerAuth('JWT-auth')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('send-notification')
  @Roles(UserRole.ADMIN)
  async sendNotification(@Body() data: NotificationDto): Promise<any> {
    return this.userService.sendNotification(data);
  }
}
