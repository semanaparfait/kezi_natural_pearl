export interface Users {
  id: string;
  profile: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: "admin" | "user";
  status: string;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}