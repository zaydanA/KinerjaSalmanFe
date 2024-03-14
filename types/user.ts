export interface IUserSelfData {
  user_id: number
  email: string
  full_name: string
  position: {
    position_id: number
    title: string
  },
  dept: {
    dept_id: number
    dept_name: string
  },
  status: number
}

export interface IUserPersonalData {
  email: string
  full_name: string
  phone_number: string
  emergency_number: string
  place_of_birth?: string
  date_of_birth: string
  gender: string
  marital_status: string
  blood_type?: string
  identity_number: string
  address: string
  last_education: string

}

export interface IUserEmploymentData {
  employee_id?: string
  dept_id: number
  position_id: number
  join_date: string
  resign_date?: string
  status?: number
}

export interface IUserPayrollData {
  npwp_number: string
}
