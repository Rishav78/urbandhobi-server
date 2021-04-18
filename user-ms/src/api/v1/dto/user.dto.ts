import { IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsEmail({}, { message: 'provide a valid email address' })
  public readonly email: string;
}
