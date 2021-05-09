export * from './address';

export interface RaiseEvent {
  userId: string;
  cartId: string;
  timingId: number;
  paymentMethod: 'cod';
  addressId: string;
  pickupDate: Date;
}

export interface Cart {
  id: string;
  name: string;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Request {
  id: string;
  userId: string;
  cartId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
