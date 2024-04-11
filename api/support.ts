import axios from "axios";

export const url = process.env.API_BASE_URL;
export const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export const support = () => {
  const apiUrl = {
    login: "/login",
    refreshToken: "/refresh-token",
    logout: "/logout",
    self: "/self",

    positions: "/positions",
    departments: "/departments",

    employees: "/employees",

    users: {
      self: "/users/self",
      personalData: "/users/personal-data",
      employmentData: "/users/employment-data",
      delete: "/users/delete",
    },

    analytics: {
      genders: "/analytics/genders",
      todaysAttendances: "/analytics/todays-attendances",
      myAttendances: "/analytics/my-attendances",
    },

    attendances: {
      todaySelf: "/attendances/today/self",
      todayClocks: "/attendances/today/clocks",
      todayAll: "/attendances/today/all",
      user: "/attendances",
    },

    application: {
      apply: "/applications/apply",
      applications: "/applications",
    },

    banks: "/banks",
    allowances: {
      types: "/allowances/types",
    },
  };

  return { apiUrl };
};

export type APIType = typeof api;
