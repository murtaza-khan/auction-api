import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums';
import { Roles } from '../common/roles.decorator';
import { BidDto, UpdateBidDto } from './Dto/user.types';
import { UserService } from './user.service';

@Controller('')
@ApiTags('Bids')
export class BidController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @Post('bid')
  async createBid(@Body() data: BidDto): Promise<any> {
    return this.userService.createBid(data);
  }

  @ApiBearerAuth()
  @Get('bids')
  async getBids(): Promise<any> {
    return this.userService.findBids();
  }

  @ApiBearerAuth()
  @Get('bid/:id')
  async getBidById(@Param('id') id: string): Promise<any> {
    return this.userService.findBidById(id);
  }

  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @Get('user/bids')
  async getBidByUserId(@Request() req: any): Promise<any> {
    return this.userService.findBidByUserId(req.user.user);
  }

  @ApiBearerAuth()
  @Patch('bid/:id')
  async updateBidById(
    @Param('id') id: string,
    @Body() data: UpdateBidDto,
  ): Promise<any> {
    return this.userService.updateBidById(id, data);
  }

  @ApiBearerAuth()
  @Delete('bid/:id')
  async deleteBid(@Param('id') id: string): Promise<any> {
    return this.userService.deleteBid(id);
  }
}
