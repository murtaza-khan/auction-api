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
import { ItemService } from './item.service';
import { ItemDto, UpdateItemDto } from './Dto/item.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MyAuthGuard } from '../auth/authGuard';
import { Roles } from 'src/common/roles.decorator';
import { UserRole } from 'src/common/enums';
import { Public } from 'src/auth/public.decorator';

@Controller('')
@ApiTags('Items')
@Roles(UserRole.ADMIN)
export class ItemController {
  constructor(private itemService: ItemService) {}

  @ApiBearerAuth()
  @Post('item')
  async createItem(@Body() data: ItemDto): Promise<any> {
    return this.itemService.createItem(data);
  }

  @Public()
  @Get('items')
  async getItems(@Request() req): Promise<any> {
    return this.itemService.findItems();
  }

  @Public()
  @Get('item/:id')
  async getItem(@Param('id') id: string): Promise<any> {
    return this.itemService.findItemById(id);
  }

  @ApiBearerAuth()
  @Patch('item/:id')
  async updateItemById(
    @Param('id') id: string,
    @Body() data: UpdateItemDto,
  ): Promise<any> {
    return this.itemService.updateItemById(id, data);
  }

  @ApiBearerAuth()
  @Delete('item/:id')
  async deleteItem(@Param('id') id: string): Promise<any> {
    return this.itemService.deleteItem(id);
  }
}
