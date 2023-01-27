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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { UserRole } from 'src/common/enums';
import { Roles } from 'src/common/roles.decorator';
import { AuctionService } from './auction.service';
import { AuctionDto, UpdateAuctionDto } from './Dto/auction.types';

@Controller('')
@ApiTags('Auction')
@Roles(UserRole.ADMIN)
export class AuctionController {
  constructor(private auctionService: AuctionService) {}

  @ApiBearerAuth()
  @Post('auction')
  async createAuction(@Body() data: AuctionDto): Promise<any> {
    return this.auctionService.createAuctions(data);
  }

  @Public()
  @Get('auctions')
  async getAuctions(): Promise<any> {
    return this.auctionService.findAuctions();
  }

  @Public()
  @Get('auction/:id')
  async getAuction(@Param('id') id: string): Promise<any> {
    return this.auctionService.findAuctionById(id);
  }

  @ApiBearerAuth()
  @Patch('auction/:id')
  async updateAuctionById(
    @Param('id') id: string,
    @Body() data: UpdateAuctionDto,
  ): Promise<any> {
    return this.auctionService.updateAuctionById(id, data);
  }

  @ApiBearerAuth()
  @Delete('auction/:id')
  async deleteAuction(@Param('id') id: string): Promise<any> {
    return this.auctionService.deleteAuction(id);
  }
}
