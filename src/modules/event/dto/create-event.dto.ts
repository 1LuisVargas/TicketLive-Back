import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsUUID,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Festival de Verano' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Un evento increíble al aire libre' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2023-08-15' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '10:00:00' })
  @IsDateString()
  start_time: string;

  @ApiProperty({ example: '12:00:00' })
  @IsDateString()
  end_time: string;

  @ApiProperty({ example: 'Parque Simón Bolívar, Bogotá, Colombia' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  @IsPositive()
  capacity: number;

  @ApiProperty({ example: 350000 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiPropertyOptional({ example: 'https://url-a-avatar.com/foto.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    description: 'UUID de la categoría',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  categoryId: string;

  ApiPropertyOptional({ example: '-12.123456' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  ApiPropertyOptional({ example: '-12.123456' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;
}
