import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNotEmptyObject,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Location } from '../../item/Dto/item.types';
import { UserRole, VerifyCodeSource } from '../../common/enums';

class DefaultMessageType {
  @IsString()
  message: string;
}

class UserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  notificationToken: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: Location,
  })
  @IsNotEmptyObject()
  @IsNotEmpty()
  location: Location;

  @ApiProperty({ enum: UserRole, example: 'USER' })
  @IsEnum(UserRole)
  @IsNotEmpty()
  userRole: string;
}
class LoginDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

class BidDto {
  @ApiProperty({
    type: String,
    example: '1500',
  })
  @IsString()
  @IsNotEmpty()
  bidPrice: string;

  @ApiProperty({
    type: String,
    example: '63d2c6c04ac0ed6a094e3e0f',
  })
  @IsString()
  @IsNotEmpty()
  item: string;

  @ApiProperty({
    type: String,
    example: '63d2c6c04ac0ed6a094e3e0f',
  })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    type: String,
    example: '63d2c6c04ac0ed6a094e3e0f',
  })
  @IsString()
  @IsNotEmpty()
  auction: string;
}

class UpdateBidDto {
  @ApiProperty({
    type: String,
    example: '1500',
  })
  @IsString()
  @IsNotEmpty()
  bidPrice: string;
}

class NotificationDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  email: string;
}

class VerificationTokenDto {
  @ApiProperty({ type: String, enum: VerifyCodeSource })
  @IsEnum(VerifyCodeSource)
  @IsString()
  @IsOptional()
  source: string = VerifyCodeSource.EMAIL_VERIFICATION;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  verificationToken: number;
}
export {
  UserDto,
  DefaultMessageType,
  LoginDto,
  BidDto,
  UpdateBidDto,
  NotificationDto,
  VerificationTokenDto
};
