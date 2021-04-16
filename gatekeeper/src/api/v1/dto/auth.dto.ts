import { IsEmail, IsString } from 'class-validator';

export class SignUpWithEmailDTO {
  @IsEmail({}, { message: 'provide a valid email address' })
  public readonly email: string;

  @IsString({ message: 'password not provided' })
  public readonly password: string;
}
