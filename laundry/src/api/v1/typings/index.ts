export interface RaiseEvent {
  userId: string;
  cartId: string;
  timingId: number;
  paymentMethod: 'cod';
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
