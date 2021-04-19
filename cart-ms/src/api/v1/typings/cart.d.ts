export type Status = 'pending' | 'submited';

export interface CreateServiceArgs {
  userId: string;
  name?: string;
}
