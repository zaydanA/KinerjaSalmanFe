export interface IApiBaseAllowance {
  payroll_id?: number;
  allowance_type_id: number;
  amount?: number;
}

export interface IApiBaseAllowanceType {
  allowance_type_id: number;
  name: string;
}