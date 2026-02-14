export interface User {
  userId: string;
  fullName: string | null;
  email: string;
  phoneNumber: string;
  password?: string;
  role: 'customer' | 'admin';
  status: string;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AuthResponse {
  user: User;
  email: string;
  profile: string;
  fullName: string;
  phoneNumber: string;
  createdAt: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  fullName?: string;
  profile?: string;
  phoneNumber: string;
  password: string;
}
