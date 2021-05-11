import { IsEnum } from 'class-validator';
import { ROLES } from 'src/lib/constants';
import { Role } from '../typings';

export class SignupParamsDTO {
  @IsEnum(ROLES)
  role: Role;
}
