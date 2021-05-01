export interface Service {
  id: string;
  name: string;
  imageId: string;
  data: string;
  active: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceType {
  id: string;
  name: string;
  active: boolean;
  services: Service[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
