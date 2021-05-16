import { Request } from 'express';

export type Role = 'ADMIN' | 'USER';

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Authentication {
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomRequest extends Request {
  user: User;
  auth: Authentication;
}
