import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInWithEmailDTO {
  @IsEmail({}, { message: 'provide a valid email address' })
  public readonly email: string;

  @IsString({ message: 'password not provided' })
  public readonly password: string;
}

export class SignUpWithEmailDTO {
  @IsEmail({}, { message: 'provide a valid email address' })
  public readonly email: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be of minimum 8 length' })
  @MaxLength(20, { message: 'password can have max 20 charcter' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain a 1 small and capital character, 1 number, 1 special character',
  })
  public readonly password: string;
}
