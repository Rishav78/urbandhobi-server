export * from './address';

export interface RaiseEvent {
  userId: string;
  cartId: string;
  paymentMethod: 'cod';
}

export interface ScheduleEvent {
  id: string;
  userId: string;
  pickupDate: Date;
  timingId: number;
  addressId: string;
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
