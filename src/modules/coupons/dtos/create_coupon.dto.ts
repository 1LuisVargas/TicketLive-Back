import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { CouponType } from '../entities/coupon.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty({ example: 'VERANO2026', description: 'El código del cupón' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional({ enum: CouponType, description: 'El tipo de cupón' })
  @IsNotEmpty()
  @IsEnum(CouponType)
  type: CouponType;

  @ApiProperty({ example: 10, description: 'El valor del descuento del cupón' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  value: number;

  @ApiPropertyOptional({
    example: 5,
    description: 'El número de veces que el cupón puede ser redimido',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxRedemptions?: number;

  @ApiPropertyOptional({
    example: ['1', '2'],
    description:
      'Los IDs de los eventos en los que se puede usar el cupón (en caso de ser aplicable)',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  eventIds?: string[];

  @ApiPropertyOptional({
    example: ['1', '2'],
    description:
      'Los IDs de las categorías en las que se puede usar el cupón (en caso de ser aplicable)',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categoryIds?: string[];
}
