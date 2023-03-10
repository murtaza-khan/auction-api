import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { passwordBcrypt } from '../common/bcrypt';
import {
  constructErrorResponse,
  constructSuccessResponse,
} from '../common/wrappers';
import { UserDocument } from './models/user.model';
import { BidDocument } from './models/bid.model';
import { NotificationsService } from '../common/services/notification.service';
import { VerificationTokenDto } from './Dto/user.types';
import { VerifyCodeSource } from 'src/common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Bid') private readonly bidModel: Model<BidDocument>,
    private notificationService: NotificationsService,
  ) {}

  async save(userData: any): Promise<any> {
    try {
      await this.beforeCreate(userData);
      userData.password = await passwordBcrypt(userData.password);
      let user = await this.userModel.create(userData);

      user = JSON.parse(JSON.stringify(user));
      delete user.password;
      await this.generateToken(user.email);
      return constructSuccessResponse(user, 'User registered successfully!');
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
  async findOne(id: any): Promise<any> {
    return await this.userModel.findOne({ _id: id });
  }
  async findByCriteria(criteria: {}): Promise<any> {
    const user = await this.userModel.findOne(criteria);
    return user;
  }
  async update(user: any): Promise<{ message: string }> {
    return new Promise(async (resolve, rejects) => {
      if (user.password) {
        user.password = await passwordBcrypt(user.password);
      }
      this.userModel.updateOne({ _id: user.id }, user, (err, result) => {
        if (err) {
          rejects(err);
        }
        if (result) {
          if (result.nModified === 0) {
            resolve({ message: 'User not updated!' });
          } else {
            resolve({ message: 'User  updated!' });
          }
        }
      });
    });
  }
  async beforeCreate(userData: any) {
    try {
      if (userData.email) {
        const existingUser = await this.userModel.findOne({
          email: userData.email,
        });
        if (existingUser) {
          return constructErrorResponse({
            message: 'Email already exists!',
            status: 404,
          });
        } else {
          return true;
        }
      }
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async generateToken(email) {
    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    const response = await this.userModel.updateOne(
      {
        email,
      },
      { verificationToken: 123456 },
    );
    return response;
  }

  async verifyToken({
    email,
    source,
    verificationToken,
  }: VerificationTokenDto) {
    const user = await this.userModel.findOne({
      email,
    });
    if (!user) {
      return constructErrorResponse({ message: 'Invalid code', status: 400 });
    }

    if (!user.verificationToken) {
      return constructErrorResponse({
        message: 'Code not generated',
        status: 400,
      });
    }

    if (source === VerifyCodeSource.EMAIL_VERIFICATION) {
      if (user.isEmailVerified) {
        return constructErrorResponse({
          message: 'You email is already verified',
          status: 409,
        });
      }
    }

    if (user.emailVerificationAttempts >= 10) {
      return constructErrorResponse({
        message: 'Account is blocked, please contact support',
        status: 403,
      });
    }

    if (user.verificationToken === verificationToken) {
      // Code in valid
      const response = await this.userModel.updateOne(
        {
          email,
        },
        {
          isEmailVerified: true,
          emailVerificationAttempts: 0,
          verificationToken: null,
        },
      );
      return { response, user };
    }

    // Code in invalid
    await this.userModel.updateOne(
      { email },
      {
        emailVerificationAttempts: user.emailVerificationAttempts
          ? user.emailVerificationAttempts + 1
          : 1,
      },
    );
    return constructErrorResponse({ message: 'Invalid code!', status: 400 });
  }

  async createBid(data: any): Promise<any> {
    try {
      const response = await (
        await this.bidModel.create(data)
      ).populate(['item', 'auction', 'user']);
      return constructSuccessResponse(response, 'Bid created successfully');
    } catch (error) {
      return error;
    }
  }

  async findBids(): Promise<any> {
    try {
      const criteria: any = {};
      const items: any = await this.bidModel
        .find(criteria)
        .populate(['auction', 'item', 'user']);
      return constructSuccessResponse(items, 'Auctions fetched successfully');
    } catch (error) {
      return error;
    }
  }

  async findBidById(id?: string): Promise<any> {
    try {
      const item: any = await this.bidModel
        .findById(id)
        .populate(['auction', 'item']);
      return constructSuccessResponse(item, 'Bid fetched successfully!');
    } catch (error) {
      return error;
    }
  }

  async findBidByUserId(userId?: string): Promise<any> {
    try {
      const item: any = await this.bidModel
        .find({ user: userId })
        .populate(['auction', 'item']);
      return constructSuccessResponse(item, 'Bid fetched successfully!');
    } catch (error) {
      return error;
    }
  }

  async updateBidById(id: string, data: any): Promise<any> {
    try {
      const response = await this.bidModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return constructSuccessResponse(response, 'Bid Updated successfully!');
    } catch (error) {
      return error;
    }
  }

  async deleteBid(id: string): Promise<any> {
    try {
      const response = await this.bidModel.findByIdAndDelete(id);
      return constructSuccessResponse(response, 'Bid deleted successfully!');
    } catch (error) {
      return error;
    }
  }

  async sendNotification(data: any): Promise<any> {
    try {
      let pushNotificationPayload = [];
      const users = await this.userModel.find();
      for (const user of users) {
        if (user.notificationToken) {
          pushNotificationPayload.push({
            title: data.title,
            message: data.message,
            token: user.notificationToken,
          });
        }
      }
      const response = await this.notificationService.sendFirebaseMessages(
        pushNotificationPayload,
      );
      return constructSuccessResponse(response);
    } catch (error) {
      return error;
    }
  }
}
