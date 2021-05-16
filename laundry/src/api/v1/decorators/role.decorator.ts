import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/typings';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
