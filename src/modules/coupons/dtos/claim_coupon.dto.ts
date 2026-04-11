import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClaimCouponDto {
  @ApiProperty({ example: 'VERANO2026', description: 'El código del cupón' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'El ID del carrito',
  })
  @IsString()
  @IsNotEmpty()
  cartId: string;
}
