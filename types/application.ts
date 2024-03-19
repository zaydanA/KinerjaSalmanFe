import { IUserPersonalData } from "./user";

export type IApiBaseApplication = {
  application_id: number;
  user_id: number;
  user_head_id: number;
  start_date: string;
  end_date: string;
  description: string;
  status: boolean;

  type?: string;
  event_name?: string;
  location?: string;
  purpose?: string;
  image_url?: string;

  user?: IUserPersonalData;
  application?: IApiApplicationStatus;
};

export interface IApiApplicationStatus {
  apply_status_id: number;
  status: number;
}

export interface IApiApplicationResponse {
  total: number,
  current_page: number,
  last_page: number,
  data: IApiBaseApplication[]
}
