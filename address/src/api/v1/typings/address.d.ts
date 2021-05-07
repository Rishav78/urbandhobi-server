export interface AddAddressMS {
  title?: string;
  userId: string;
  email: string;
  houseno: string;
  city: string;
  postalCode: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  locality: string;
  district?: string;
}

export interface FindAllMS {
  userId: string;
}

export interface UpdateDefaultAddressMS {
  userId: string;
  id: string;
}

export interface Address {
  id: string;
  title: string;
  userId: string;
  email: string;
  houseno: string;
  city: string;
  postalCode: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  locality: string;
  district: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
