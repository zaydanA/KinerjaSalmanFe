import { ApplicationsStatus } from "@/enums/enums";
import { IUserEmploymentData, IUserPersonalData } from "./user";

export type IApiBaseApplication = {
  application_id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  type: string;
  description: string;
  file_url?: string;
  hr_status: ApplicationsStatus;
  manager_status: ApplicationsStatus;

  leave_type?: string;
  event_name?: string;
  location?: string;

  user: IUserEmploymentData & IUserPersonalData;
};

export interface IApiBaseApplicationResponse {
  total: number;
  current_page: number;
  last_page: number;
  data: IApiBaseApplication[];
}
