import { randomUUID } from "node:crypto";
import { User, UserResponse } from "../types/user.type";
import { RegisterRequest, LoginRequest } from "../schemas/auth.schema";

const users: User[] = [];

function toUserResponse(user: User): UserResponse {
  const { id, email, fullName } = user;
  return { id, email, fullName };
}

export function register(payload: RegisterRequest): UserResponse {
  const existing = users.find((u) => u.email === payload.email);
  if (existing) {
    throw new Error("Email already exists");
  }
  const id = randomUUID();
  const user: User = {
    id,
    email: payload.email,
    fullName: payload.fullName,
    password: payload.password,
  };
  users.push(user);
  return toUserResponse(user);
}

export function login(payload: LoginRequest): UserResponse {
  const user = users.find((u) => u.email === payload.email);
  if (!user || user.password !== payload.password) {
    throw new Error("Invalid credentials");
  }
  return toUserResponse(user);
}
