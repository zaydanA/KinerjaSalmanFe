import { apiBase } from "@/api";
import { api, support } from "@/api/support";
import { APIContext } from "@/contexts";
import { AxiosRequestHeaders } from "axios";
import { useRouter } from "next/navigation";
import { JwtPayload, jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

interface APIProviderProps {
  children: React.ReactNode;
}

export default function APIProvider({ children }: APIProviderProps) {
  api.interceptors.request.use(
    async (config) => {
      const accessToken = api.defaults.headers.common["Authorization"]?.toString() || "";
      
      if (!accessToken) {
        return config;
      }
      
      const decoded = jwtDecode<JwtPayload>(accessToken);

      const expirationTime = decoded.exp ? dayjs.unix(decoded.exp) : undefined;
      const isExpired = expirationTime ? expirationTime.diff(dayjs(), 'second') < 0 : false;

      if (!isExpired) return config;

      const res = await apiBase().auth().refreshToken();
      if (res.status === "success") {
        setToken(accessToken);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { apiUrl } = support();
  const navigate = useRouter();

  // api.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   async (error) => {
  //     const originalRequest = error.config;

  //     if (
  //       error.response.status === 401 &&
  //       originalRequest.url === apiUrl.refreshToken
  //     ) {
  //       navigateToSSO();
  //       return Promise.reject(error);
  //     }

  //     if (error.response.status === 401 && !originalRequest._retry) {
  //       originalRequest._retry = true;

  //       try {
  //         const res = await apiBase().auth().refreshToken();

  //         if (res.status === "success") {
  //           setToken(res.data?.token);
  //         } else {
  //           return Promise.reject(error);
  //         }
  //         return api(originalRequest);
  //       } catch (error) {
  //         return Promise.reject(error);
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  const setToken = (token: string | null) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };

  const navigateToSSO = () => {
    navigate.push(process.env.SSO_URL as string)
  }

  return (
    <APIContext.Provider
      value={{
        token: api.defaults.headers.common["Authorization"]?.toString() || null,
        setToken,
        navigateToSSO
      }}
    >
      {children}
    </APIContext.Provider>
  );
}
