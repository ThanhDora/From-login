export interface User {
  id: string;
  email: string;
  fullName: string;
  password: string;
}

export type UserResponse = Omit<User, "password">;
