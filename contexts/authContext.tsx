"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { loginUser, getCurrentUser } from "../services/authApi";

import { logoutUser } from "@/api-client/logout";

import type { User } from "../types/user";

type AuthContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<User>;
  loading: boolean;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((data: User) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    const { user } = await loginUser({ email, password });

    setLoading(false);
    setUser(user);

    return user;
  };

  const logOut = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
