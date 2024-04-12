export interface IApiBasePayrollItemPagination {
  total: number
  current_page: number
  last_page: number
  data: IApiBasePayrollItemList[]
}

export interface IApiBasePayrollItemList {
  payroll_id?: number
  date: string
  status: number
  net_salary: number
}