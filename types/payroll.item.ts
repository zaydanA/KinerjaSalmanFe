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

export interface IApiBasePayrollItemDetails {
  payroll_id?: number
  date: string
  status: number
  net_salary: number
  details?: {
    pkp?: number,
    ptkp?: number,
    income?: {
      allowances?: { name: string, val: number, ket: string }[]
      basic_salary?: number
    },
    deductions?: { name: string, val: number, ket: string }[]
    net_income?: number,
    ptkp_status?: string,
    gross_income?: number,

    pph21_yearly?: number,
    pph21_yearly_details?: { name: string, ket: string }[]
    pph21_monthly?: number,

    take_home_pay?: number,
    net_income_yearly?: number
  }

  payroll: {
    use_bpjs: boolean
    user: {
      full_name: string
      employee_id: string
      join_date: string
      dept: {
        dept_name: string
      }
      position: {
        title: string
      }
      status: number
    }
  }
}

export interface IApiBaseEmployeesPayrollItemList {
  period: string
  total_employees: number
  total_disbursed: number
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
    },
    npwp_number: string,
    bank_id: number,
    bank_account_number: string,
    bank_account_holder: string
  }

  status: number
  net_salary: number
}