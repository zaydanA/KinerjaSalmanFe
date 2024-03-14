import { IApiBaseAuthContext, IApiBaseAuthLogin } from "@/types/auth";
import { IApiBaseResponse } from "@/types/http";
import { createContext, useContext } from "react";

const context = createContext<IApiBaseAuthContext>({
  user: null,

  logout: async () => {
    return undefined;
  },

  isHRDManagerOrDirector: () => {
    return false;
  },

  isManager: () => {
    return false;
  }
});

export default context;

export const useAuth = () => {
  return useContext(context);
}