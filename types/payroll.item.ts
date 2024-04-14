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

export interface IApiBaseEmployeesPayrollItemList {
  period: string
  total_employees: number
  total_expenses: number
}

export interface IApiBaseEmployeesReviewPayrollItemPagination {
  total: number
  current_page: number
  last_page: number
  data: IApiBaseEmployeesReviewPayrollItemList[]
}

export interface IApiBaseEmployeesReviewPayrollItemList {
  payroll_id?: number

  payroll: {
    user: {
      full_name: string
      email: string
      employee_id: string
      dept_id: number
      position_id: number
    }
  }

  status: number
  net_salary: number
}