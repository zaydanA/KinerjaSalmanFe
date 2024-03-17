import { IUserEmploymentData, IUserPayrollData, IUserPersonalData } from "./user";

export type IApiBaseEmployee = {
  user_id: number;
  email: string;
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  employee_id: string;
  dept_id: number;
  position_id: number;
  join_date: string;
  resign_date: string;
  status: number;
};

export interface IApiAddEmployee {
  personal_data: IUserPersonalData,
  employment_data: IUserEmploymentData,
  payroll_data: IUserPayrollData
}

export interface IApiEmployeeResponse {
  total: number,
  current_page: number,
  last_page: number,
  data: IApiBaseEmployee[]
}