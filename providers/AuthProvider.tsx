import { apiBase } from "@/api";
import React, { useEffect, useState } from "react";
import { AuthContext, useAPI } from "@/contexts";
import { IUserSelfData } from "@/types/user";
import { Spinner } from "@nextui-org/react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setToken, navigateToSSO } = useAPI();
  const [user, setUser] = useState<IUserSelfData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const isHRDManagerOrDirector = () => {
    if (user) {
      if (user.position.position_id === 2 && user.dept.dept_id === 2) {
        return true;
      }

      if (user.position.position_id === 1 && user.dept.dept_id === 1) {
        return true;
      }
    }
    
    return false;
  }

  const isManager = () => {
    if (user) {
      if (user.position.position_id === 2) {
        return true;
      }
    }
    
    return false;
  }

  useEffect(() => {
    const fetchSelf = async () => {
      try {
        await self();
        setIsLoading(false);
      } catch (error) {
        navigateToSSO();
      }
    };

    fetchSelf();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        isHRDManagerOrDirector,
        isManager,
      }}
    >
      {isLoading ? (
        <div className='flex w-screen h-screen justify-center items-center'>
          <Spinner color="default" size="lg"/>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}