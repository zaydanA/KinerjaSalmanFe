import { apiBase } from "@/api";
import React, { useEffect, useState } from "react";
import { AuthContext, useAPI } from "@/contexts";
import { IUserSelfData } from "@/types/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setToken, navigateToSSO } = useAPI();
  const [user, setUser] = useState<IUserSelfData | null>(null);

  const refreshToken = async () => {
    const res = await apiBase().auth().refreshToken();

    if (res.status === "success") {
      setToken(res.data.token);
      try {
        await self();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const self = async () => {
    const res = await apiBase().user().self();

    if (res.status === "success") {
      setUser(res.data);
    }
  };

  const logout = async () => {
    const res = await apiBase().auth().logout();

    if (res.status === "success") {
      setToken(null);
      setUser(null);
      navigateToSSO();
    }
  };

  useEffect(() => {
    const fetchRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        navigateToSSO();
      }
    };

    fetchRefreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshToken,
        self,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}