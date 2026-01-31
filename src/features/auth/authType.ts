export interface User {
  id: string;
  fullname: string;
  email: string;
  phonenumber: string;
  password?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}
export interface AuthResponse {
  user: User;
  email: string;
  profile: string;
  fullName: string;
  phoneNumber: string;
  createdAt: string;
  role: string;
  token: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterData {
  email: string;
  fullName?: string;
  profile?: string;
  phoneNumber: string;
  password: string;
}
