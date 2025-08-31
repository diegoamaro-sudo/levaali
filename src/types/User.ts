export interface BaseUser {
  id: string;
  email: string;
  userType: 'establishment' | 'driver' | 'admin';
  createdAt: string;
}

export interface EstablishmentUser extends BaseUser {
  userType: 'establishment';
  name: string;
  establishmentName: string;
  cpfCnpj: string;
  address: string;
  houseNumber: string;
  referencePoint?: string;
  neighborhood: string;
  city: string;
  logoUrl?: string;
  balance: number;
  isApproved: boolean;
}

export interface DriverUser extends BaseUser {
  userType: 'driver';
  name: string;
  cpf: string;
  dateOfBirth: string;
  photoWithDocUrl?: string;
  idCardFrontUrl?: string;
  idCardBackUrl?: string;
  balance: number;
  isApproved: boolean;
  cancellationsToday: number;
  pixKey?: string;
}

export interface AdminUser extends BaseUser {
  userType: 'admin';
}

export type User = EstablishmentUser | DriverUser | AdminUser;