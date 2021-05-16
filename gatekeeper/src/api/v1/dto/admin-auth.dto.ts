import { IsEnum } from 'class-validator';
import { ROLES } from 'src/lib/constants';
import { Role } from '../typings';

export class SignupQueryDTO {
  @IsEnum(ROLES)
  role: Role;
}
