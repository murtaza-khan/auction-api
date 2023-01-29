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
import { ItemService } from './item.service';
import { ItemDto, UpdateItemDto } from './Dto/item.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/roles.decorator';
import { UserRole } from '../common/enums';
import { Public } from '../auth/public.decorator';

@Controller('')
@ApiBearerAuth('JWT-auth')
@ApiTags('Items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post('item')
  @Roles(UserRole.ADMIN)
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

  @Roles(UserRole.ADMIN)
  @Patch('item/:id')
  async updateItemById(
    @Param('id') id: string,
    @Body() data: UpdateItemDto,
  ): Promise<any> {
    return this.itemService.updateItemById(id, data);
  }

  @Roles(UserRole.ADMIN)
  @Delete('item/:id')
  async deleteItem(@Param('id') id: string): Promise<any> {
    return this.itemService.deleteItem(id);
  }
}
