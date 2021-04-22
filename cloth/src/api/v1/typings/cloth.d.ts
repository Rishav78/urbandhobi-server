export interface Cloth {
  id: string;
  name: string;
  cost: number;
  active: boolean;
  for: 'men' | 'women';
  kids: boolean;
  createdAt: Date;
  updatedAt: Date;
}
