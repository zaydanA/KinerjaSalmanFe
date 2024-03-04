import axios from 'axios';

const url = process.env.API_BASE_URL;
export const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export const support = () => {
  const apiUrl = {
    login: '/login',
    refreshToken: '/refresh-token',
    logout: '/logout',

    user: {
      self: 'user/self',
      personalData: 'user/personal-data'
    },

    getEmployees: '/employee'
  };

  return { apiUrl };
};

export type APIType = typeof api;