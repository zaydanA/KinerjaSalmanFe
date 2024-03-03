export type IApiBaseEmployee = {
  user_id: number;
  email: string;
  full_name: string;
  phone_number: string;
  date_of_birth: Date;
  gender: string;
  employee_id: string;
  dept: {
    dept_name: string;
  };
  position: {
    title: string;
  }
  join_date: Date;
  resign_date: Date;
};