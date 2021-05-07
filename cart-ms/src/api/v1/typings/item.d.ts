export interface AddService {
  itemId: string;
  serviceId: string;
  serviceTypeId: string;
  count?: number;
}

export interface EventPayload<T> {
  userId: string;
  data: T;
}
