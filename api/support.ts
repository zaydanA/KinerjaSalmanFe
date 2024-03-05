import axios from 'axios';

const url = "http://localhost:8000/api/v1/";
export const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export const support = () => {
  const apiUrl = {
    login: '/login',
    refreshToken: '/refresh_token',
    logout: '/logout',

    self: '/self',
    getEmployees: '/employee',
    addEmployee: '/employee',
    getPosition: '/position',
    getDepartment: '/department',
  };

  return { apiUrl };
};

export type APIType = typeof api;