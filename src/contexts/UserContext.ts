import { createContext } from "react";
import { z } from "zod";

export type User = {
  id: string;
  title: string;
  body: string;
  published: boolean;
  created_at: Date;
  updated_at: Date;
};

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type RegisterData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginData = z.infer<typeof loginSchema>;

type UserState = {
  user: User | undefined;
  success: string | undefined;
  token: string | undefined;
  error: string | undefined;
  loading: boolean;
  pending: boolean;
  register: (registerData: RegisterData) => Promise<void>;
  login: (loginData: LoginData) => Promise<void>;
};

const initialState: UserState = {
  user: undefined,
  success: undefined,
  token: undefined,
  error: undefined,
  loading: false,
  pending: false,
  register: async () => {},
  login: async () => {},
};

export const UserContext = createContext<UserState>(initialState);
