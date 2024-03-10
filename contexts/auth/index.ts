import { IApiBaseAuthContext, IApiBaseAuthLogin } from "@/types/auth";
import { IApiBaseResponse } from "@/types/http";
import { createContext, useContext } from "react";

const context = createContext<IApiBaseAuthContext>({
  user: null,

  // refreshToken: async () => {
  //   return undefined;
  // },

  self: async () => {
    return undefined;
  },

  logout: async () => {
    return undefined;
  }
});

export default context;

export const useAuth = () => {
  return useContext(context);
}