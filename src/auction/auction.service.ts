import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { constructSuccessResponse } from '../common/wrappers';
import { AuctionDocument } from './models/auction.model';

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel('Auction')
    private readonly auctionModel: Model<AuctionDocument>,
  ) {}

  async createAuctions(data: any): Promise<any> {
    try {
      const response = await (await this.auctionModel.create(data)).populate('items');
      return constructSuccessResponse(response, 'Auction created successfully');
    } catch (error) {
      return error;
    }
  }

  async findAuctions(): Promise<any> {
    try {
      const criteria: any = {};
      const items: any = await this.auctionModel.find(criteria).populate('items');
      return constructSuccessResponse(items, 'Auctions fetched successfully');
    } catch (error) {
      return error;
    }
  }

  async findAuctionById(id?: string): Promise<any> {
    try {
      const item: any = await this.auctionModel.findById(id).populate('items');
      return constructSuccessResponse(item, 'Auction fetched successfully!');
    } catch (error) {
      return error;
    }
  }

  async updateAuctionById(id: string, data: any): Promise<any> {
    try {
      const response = await this.auctionModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return constructSuccessResponse(response, 'Auction Updated successfully!');
    } catch (error) {
      return error;
    }
  }

  async deleteAuction(id: string): Promise<any> {
    try {
      const response = await this.auctionModel.findByIdAndDelete(id);
      return constructSuccessResponse(response, 'Auction deleted successfully!');
    } catch (error) {
      return error;
    }
  }
}
