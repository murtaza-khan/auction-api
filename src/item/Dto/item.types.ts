import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class Location {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  lat: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  long: string;
}

class ItemDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    type: Location,
    example: { lat: '0.0222555', long: '23544847' },
  })
  @IsObject()
  location: Location;
}

class UpdateItemDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  price: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  category: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  brand: string;

  @ApiProperty({
    type: Location,
  })
  location: Location;
}

export { ItemDto, UpdateItemDto };
