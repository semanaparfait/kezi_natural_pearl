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
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  phonenumber: string;
  password: string;
}
