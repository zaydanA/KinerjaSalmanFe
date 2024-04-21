export interface IKPIDetail {
  indicator: string;
  type: "AKTIVITAS" | "PROYEKSI" | "HASIL";
  target: string;
  realization: string;
  weight: string;
}

export interface IKPI {
  user_id: number;
  kpiDetails: IKPIDetail[];
}
