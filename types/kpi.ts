export interface IKPIDetail {
  kpi_detail_id?: number;
  indicator: string;
  type: "AKTIVITAS" | "PROYEKSI" | "HASIL";
  target: string;
  realization: string;
  weight: string;
}

export interface IKPI {
  kpi_id?: number;
  user_id: number;
  kpiDetails: IKPIDetail[];
  performance?: number;

  last_page?: number;
}

export interface IApiKPIResponse {
  total: number,
  current_page: number,
  last_page: number,
  data: IKPI[]
}
