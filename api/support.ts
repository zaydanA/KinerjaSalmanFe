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

    getPosition: "/position",
    getDepartment: "/department",

    employee: "/employee",

    user: {
      self: "/user/self",
      personalData: "/user/personal-data",
      employmentData: "/user/employment-data",
      delete: "/user/delete",
    },

    analytics: {
      genders: '/analytics/genders',
      todaysAttendances: '/analytics/todays-attendances',
      myAttendances: '/analytics/my-attendances'
    },

    attendance: {
      todaySelf: '/attendance/today/self',
      todayClocks: '/attendance/today/clocks',
      todayAll: '/attendance/today/all',
      user: '/attendance',
    },

    application: {
      applyLeave: "/application/apply-leave",
      applyDuty: "/application/apply-duty",
    },
  };

  return { apiUrl };
};

export type APIType = typeof api;
