import { Role } from 'src/api/v1/typings';
import { SignInMethod } from './auth';

export interface Token {
  token: string;
  exp: number;
  iat: number;
}

export interface TokenPayload {
  method: SignInMethod;
  id: string;
  role: Role;
}

export interface RefreshTokenPayload extends TokenPayload {
  email: string;
}
