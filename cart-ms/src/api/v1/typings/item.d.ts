export interface AddService {
  itemId: string;
  cartId: string;
  userId: string;
  serviceId: string;
  serviceTypeId: string;
  count?: number;
}

export interface EventPayload<T> {
  userId: string;
  data: T;
}
