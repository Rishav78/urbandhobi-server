import { SignInMethod } from './auth';

export interface Token {
  token: string;
  exp: number;
  iat: number;
}

export interface TokenPayload {
  method: SignInMethod;
  id: string;
  admin: boolean;
}

export interface RefreshTokenPayload extends TokenPayload {
  email: string;
}
