import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

class AuctionDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  auctionName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  auctionDate: string;

  @ApiProperty({
    type: [String],
    example:['63d2c6c04ac0ed6a094e3e0f']
  })
  @IsArray()
  @IsNotEmpty()
  items: string[];

}

class UpdateAuctionDto {
  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  auctionName: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  auctionDate: string;

  @ApiProperty({
    type: [String],
    example:["63d2c6c04ac0ed6a094e3e0f"]
  })
  @IsOptional()
  @IsArray()
  items: string[];
}

export { AuctionDto, UpdateAuctionDto };
