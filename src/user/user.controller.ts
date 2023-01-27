import {
  Controller
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth('JWT-auth')
@ApiTags('User')
export class UserController {
}
