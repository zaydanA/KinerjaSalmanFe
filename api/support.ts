import axios from "axios";
import employee from "./employee";

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
      payrollData: "/users/payroll-data",
      delete: "/users/delete",
      resetPassword:"/users/reset-password",
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
      generateFileUrl:"/applications/generate-file-url"
    },

    banks: "/banks",
    allowances: {
      types: "/allowances/types",
    },

    payrollItems: {
      user: "/payroll-items",
      employees: "/payroll-items/employees",
      employeesRun: "/payroll-items/employees/run",
      employeesReview: "/payroll-items/employees/review",
    },

    kpi: "/kpi-evaluation",
  };

  return { apiUrl };
};

export type APIType = typeof api;
