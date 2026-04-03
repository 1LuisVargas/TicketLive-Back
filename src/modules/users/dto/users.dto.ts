import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsNotEmpty,
  IsEmail,
  Length,
  Validate,
  IsUrl,
  Matches,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class UserBaseDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'User01',
  })
  @IsNotEmpty()
  @Length(1, 50)
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Debe ser un email válido',
    example: 'user01@mail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description:
      'Mínimo 12 caracteres, una mayúscula, una minúscula, un número y un símbolo (!@#$%^&*)',
    example: 'Abcd1234*Xyz!',
  })
  @IsNotEmpty()
  @IsString()
  @Length(12, 64, {
    message: 'La contraseña debe tener entre 12 y 64 caracteres',
  })
  @Matches(/[a-z]/, {
    message: 'La contraseña debe contener al menos una minúscula',
  })
  @Matches(/[A-Z]/, {
    message: 'La contraseña debe contener al menos una mayúscula',
  })
  @Matches(/[0-9]/, {
    message: 'La contraseña debe contener al menos un número',
  })
  @Matches(/[!@#$%^&*]/, {
    message: 'La contraseña debe contener al menos un símbolo (!@#$%^&*)',
  })
  password!: string;

  @ApiProperty({
    description:
      'La confirmación de la contraseña debe ser igual a la anterior, mínimo 12 caracteres, una mayúscula, una minúscula, un número y un símbolo (!@#$%^&*)',
    example: 'Abcd1234*',
  })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword!: string;

  @ApiProperty({
    description: 'Debe ser un número telefónico con su codigo de area',
    example: '593987654321',
  })
  @IsOptional()
  @IsString()
  phone!: string;

  @ApiProperty({
    description: 'Dirección',
    example: 'Avenida siempre viva y Calle Falsa 123',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Cedula de identidad',
    example: '123456789',
  })
  @IsOptional()
  @IsString()
  @Length(8, 20)
  dni?: string;

  @ApiProperty({
    description: 'Debe ser una imagen de máximo 1MB',
    example:
      'https://res.cloudinary.com/dhm9f8fre/image/upload/v1766970191/profile-img_lghlfe.png',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  profile_photo?: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    example: '01/01/2000',
  })
  @IsOptional()
  @IsDateString()
  birthday?: Date;
}

export class CreateUserDto extends PickType(UserBaseDto, [
  'email',
  'name',
  'password',
  'confirmPassword',
  'address',
  'phone',
] as const) {}

export class LoginUserDto extends PickType(UserBaseDto, [
  'email',
  'password',
] as const) {}

export class UpdateUserDto extends PartialType(
  OmitType(UserBaseDto, ['password', 'confirmPassword'] as const),
) {
  @IsOptional()
  @IsString()
  @IsUrl()
  profile_photo_id?: string;
}

export class BanUserDto {
  @ApiProperty({
    description: 'Razón por la cual se banea el usuario',
    example: 'Comentarios inapropiados',
  })
  @IsOptional()
  @IsString()
  @Length(1, 500)
  reason?: string;
}
