import { IApiBaseAuthLogin, IApiBaseAuthRefreshToken } from '@/types/auth';
import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';

const auth = () => {
  const { apiUrl } = support();

  const url = {
    login: apiUrl.login,
    refreshToken: apiUrl.refreshToken,
    logout: apiUrl.logout,
  }

  const login = async (
    email: string, 
    password: string
  ) => {
    
    const response = await api.post<IApiBaseResponse<IApiBaseAuthLogin>>(
      url.login, 
      {
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }

  const refreshToken = async () => {
    const res = await api.post<IApiBaseResponse<IApiBaseAuthRefreshToken>>(
      url.refreshToken,
      {},
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    return res.data;
  }

  const logout = async () => {
    const res = await api.post<IApiBaseResponse<null>>(
      url.logout,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return res.data;
  }

  return {
    login,
    refreshToken,
    logout
  }
}

export default auth;