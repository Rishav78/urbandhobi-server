export type Role = 'USER' | 'DELIVERY_MANAGER' | 'ADMIN';

export interface Authentication {
  _id: string;
  email: string;
  isDeleted: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
