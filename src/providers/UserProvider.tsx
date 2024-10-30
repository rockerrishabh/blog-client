import { useEffect, useState } from "react";
import {
  UserContext,
  User,
  RegisterData,
  LoginData,
} from "../contexts/UserContext";

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>();
  const [token, setToken] = useState<string>();

  const register = async (registerData: RegisterData) => {
    setSuccess(undefined);
    setError(undefined);
    setPending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = (await res.json()) as string;
      if (res.ok) {
        setSuccess(data);
      } else {
        setError(data);
      }
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setPending(false);
    }
  };

  const login = async (loginData: LoginData) => {
    setSuccess(undefined);
    setError(undefined);
    setPending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setToken((data as { token: string }).token);
        setSuccess("Successfully logged in");
      } else {
        setError((data as { error: string }).error);
      }
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setPending(false);
    }
  };

  const value = {
    user,
    success,
    token,
    error,
    loading,
    pending,
    register,
    login,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
