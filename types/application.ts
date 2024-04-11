import { IUserEmploymentData, IUserPayrollData, IUserPersonalData } from "./user";

export type IApiBaseApplication = {
  application_id: number;
  user_id: number;
  user_head_id: number;
  start_date: string;
  end_date: string;
  type: string;
  description: string;
  file_url?: string;
  hr_status: boolean;
  manager_status: boolean;

  leave_type?: string;
  event_name?: string;
  location?: string;
};
