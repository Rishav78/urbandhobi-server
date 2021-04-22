import { Request } from 'express';

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomRequest extends Request {
  user: User;
}