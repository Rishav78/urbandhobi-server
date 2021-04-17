import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class SignInWithEmailDTO {
  @ApiProperty({ description: '', required: true })
  @IsEmail({}, { message: 'provide a valid email address' })
  public readonly email: string;

  @ApiProperty({ description: '', required: true })
  @IsString({ message: 'password not provided' })
  public readonly password: string;
}

export class SignUpWithEmailDTO {
  @ApiProperty({ description: '', required: true })
  @IsEmail({}, { message: 'provide a valid email address' })
  public readonly email: string;

  @ApiProperty({ description: '', required: true })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be of minimum 8 length' })
  @MaxLength(20, { message: 'password can have max 20 charcter' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain a 1 small and capital character, 1 number, 1 special character',
  })
  public readonly password: string;
}
