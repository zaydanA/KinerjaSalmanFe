import { apiBase } from "@/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, useAPI } from "@/contexts";
import { IApiBaseUserSelf } from "@/types/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useRouter();

  const { setToken } = useAPI();
  const [user, setUser] = useState<IApiBaseUserSelf | null>(null);

  const login = async (username: string, password: string) => {
    const res = await apiBase().auth().login(username, password);
    if (res.status === "success") {
      
      // Set token to header
      setToken(res.data.token);
      setUser(res.data.user);
      navigate.push("/");
    }

    return res;
  };

  const refreshToken = async () => {
    const res = await apiBase().auth().refreshToken();

    if (res.status === "success") {
      setToken(res.data.token);
      // setIsLoading(false);

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
      navigate.push("/login");
    }
  };

  useEffect(() => {
    const fetchRefreshToken = async () => {
      if (location.pathname === "/login" || location.pathname === "/register") {
        // setIsLoading(false);

        if (user) {
          navigate.push("/");
        }
      } else {
        try {
          await refreshToken();
        } catch (error) {
          // setIsLoading(false);
          navigate.push("/login");
        }
      }
    };

    fetchRefreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        refreshToken,
        self,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}