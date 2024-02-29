import { IApiBaseAPIContext } from "@/types/api";
import { createContext, useContext } from "react";

const context = createContext<IApiBaseAPIContext>({
  token: null,
  setToken: () => {
    return undefined;
  },
});

export default context;

export const useAPI = () => {
  return useContext(context);
}