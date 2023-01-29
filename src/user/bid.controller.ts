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
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../common/enums';
import { Roles } from '../common/roles.decorator';
import { BidDto, UpdateBidDto } from './Dto/user.types';
import { UserService } from './user.service';

@Controller('')
@ApiTags('Bids')
export class BidController {
  constructor(private userService: UserService) {}

  @Roles(UserRole.USER)
  @Post('bid')
  async createBid(@Body() data: BidDto): Promise<any> {
    return this.userService.createBid(data);
  }

  @Get('bids')
  async getBids(): Promise<any> {
    return this.userService.findBids();
  }

  @Get('bid/:id')
  async getBidById(@Param('id') id: string): Promise<any> {
    return this.userService.findBidById(id);
  }

  @Roles(UserRole.USER)
  @Get('user/bids')
  async getBidByUserId(@Request() req: any): Promise<any> {
    return this.userService.findBidByUserId(req.user.user);
  }

  @Patch('bid/:id')
  async updateBidById(
    @Param('id') id: string,
    @Body() data: UpdateBidDto,
  ): Promise<any> {
    return this.userService.updateBidById(id, data);
  }

  @Delete('bid/:id')
  async deleteBid(@Param('id') id: string): Promise<any> {
    return this.userService.deleteBid(id);
  }
}
