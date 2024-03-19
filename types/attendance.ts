
export interface IApiAttendanceData {
  user_id: number
  date: string
  attendance_type: string
  clock_in: string | null
  clock_out: string | null
  notes: string
}

export interface IApiAttendancePayload {
  attendance: IApiAttendanceData
  can_clock_in: boolean
  can_clock_out: boolean
  working_hours: IAttendanceWorkingHours
}

export interface IAttendanceWorkingHours {
  start: string
  end: string
  message: string
}

export interface IApiAttendancePagination {
  total: number
  current_page: number
  last_page: number
  data: IApiAttendanceList[]
}

export interface IApiAttendancePaginationSelf {
  total: number
  current_page: number
  last_page: number
  data: IApiAttendanceData[]
}

export interface IApiAttendanceList {
  // User data
  user: {
    full_name: string
    email: string
    employee_id: string
    dept_id: number
    position_id: number
  }

  user_id: number
  date: string
  attendance_type: string
  clock_in: string | null
  clock_out: string | null
  notes: string
}

export interface IApiUpdateAttendancePayload {
  date: string
  attendance_type: string
  clock_in: string | null
  clock_out: string | null
  notes?: string
}

export interface IApiClocksAttendancePayload {
  event_type: "clock_in" | "clock_out"
  lat: number
  long: number
  notes?: string
}