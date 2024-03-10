export type IApiBaseEmployee = {
  user_id: number;
  email: string;
  full_name: string;
  phone_number: string;
  date_of_birth: Date;
  gender: string;
  employee_id: string;
  dept_id: number;
  position_id: number;
  join_date: Date;
  resign_date: Date;
  status: number;
};

export type IApiAddEmployee = {
  email: string;
  full_name: string;
  phone_number: string;
  emergency_number: string;
  date_of_birth: string;
  place_of_birth: string;
  address: string;
  gender: string;
  blood_type: string;
  marital_status: string;
  last_education: string;
  identity_number: string;
  employee_id: string;
  dept_id: number;
  position_id: number;
  join_date: string;
  resign_date: string;
  status: number;
  npwp_number: string;
};


export type IApiEmployeeResponse = {
  total: number,
  current_page: number,
  last_page: number,
  data: IApiBaseEmployee[]
}

export interface IApiGenderData {
  label: string,
  value: number,
  percentage: number
}