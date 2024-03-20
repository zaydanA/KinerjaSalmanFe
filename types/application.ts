import { IUserEmploymentData, IUserPayrollData, IUserPersonalData } from "./user";

export type IApiBaseApplication = {
  application_id: number;
  user_id: number;
  user_head_id: number;
  start_date: string;
  end_date: string;
  description: string;
  status: string;

  type?: string;
  event_name?: string;
  location?: string;
  purpose?: string;
  image_url?: string;

  user?: IUserPersonalData & IUserEmploymentData & IUserPayrollData;
};


export interface IApiApplicationResponse {
  total: number,
  current_page: number,
  last_page: number,
  data: IApiBaseApplication[]
}
