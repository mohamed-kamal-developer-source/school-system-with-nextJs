import api from "./api";

import type { User } from "../types/admin";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type ApiResponse<T> = {
  data: T;
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>(
    "/users/sign",
    payload,
  );

  return data.data.user;
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const { data } = await api.get<ApiResponse<AuthResponse>>("/users/me");


  return data.data.user;
};
