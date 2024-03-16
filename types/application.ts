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
};
