import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { constructSuccessResponse } from '../common/wrappers';
import { ItemDocument } from './models/item.model';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel('Item')
    private readonly itemModel: Model<ItemDocument>,
  ) {}

  async createItem(data: any): Promise<any> {
    try {
      const response = await this.itemModel.create(data);
      return constructSuccessResponse(response, 'Item created successfully');
    } catch (error) {
      return error;
    }
  }

  async findItems(): Promise<any> {
    try {
      const criteria: any = {};
      const items: any = await this.itemModel.find(criteria);
      return constructSuccessResponse(items, 'Items fetched successfully');
    } catch (error) {
      return error;
    }
  }

  async findItemById(id?: string): Promise<any> {
    try {
      const item: any = await this.itemModel.findById(id);
      return constructSuccessResponse(item, 'Item fetched successfully!');
    } catch (error) {
      return error;
    }
  }

  async updateItemById(id: string, data: any): Promise<any> {
    try {
      const response = await this.itemModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return constructSuccessResponse(response, 'Item Updated successfully!');
    } catch (error) {
      return error;
    }
  }

  async deleteItem(id: string): Promise<any> {
    try {
      const response = await this.itemModel.findByIdAndDelete(id);
      return constructSuccessResponse(response, 'Item deleted successfully!');
    } catch (error) {
      return error;
    }
  }
}
