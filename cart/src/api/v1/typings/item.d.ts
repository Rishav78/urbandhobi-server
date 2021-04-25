export class AddItem {
  userId: string;
  itemId: string;
  cartId: string;
  serviceId: string;
  serviceTypeId: string;
  count?: number;
}

export interface Item {
  id: string;
  userId: string;
  cartId: string;
  itemId: string;
  serviceId: string;
  serviceTypeId: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteItem {
  id: string;
}
