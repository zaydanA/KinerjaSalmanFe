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

export type IApiEmployeeResponse = {
  total: number,
  current_page: number,
  last_page: number,
  data: IApiBaseEmployee[]
}