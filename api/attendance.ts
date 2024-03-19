import { IApiAttendanceData, IApiAttendancePagination, IApiAttendancePaginationSelf, IApiAttendancePayload, IApiClocksAttendancePayload, IApiUpdateAttendancePayload } from '@/types/attendance';
import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';


const attendance = () => {
  const { apiUrl } = support();

  const url = {
    todaySelf: apiUrl.attendance.todaySelf,
    todayClocks: apiUrl.attendance.todayClocks,
    todayAll: apiUrl.attendance.todayAll,
    user: apiUrl.attendance.user
  }

  const getTodaySelf = async () => {
    const response = await api.get<IApiBaseResponse<IApiAttendancePayload>>(
      url.todaySelf,
      {}
    )

    return response.data;
  }

  const clocksAttendanceToday = async (data: IApiClocksAttendancePayload) => {
    const response = await api.post<IApiBaseResponse<IApiAttendancePayload>>(
      url.todayClocks,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }

  const getTodayAll = async (
    page?: number, 
    limit?: number, 
    q?: string, 
    attendance_type?: string[], 
    department?: number[], 
    position?: number[]
  ) => {
    const response = await api.get<IApiBaseResponse<IApiAttendancePagination>>(
      url.todayAll,
      {
        params: {
          page: page,
          limit: limit,
          search: q,
          attendance_type: attendance_type,
          department: department,
          position: position,
        },
      }
    );

    return response.data;
  }

  const getUserAttendance = async (
    user_id: number, 
    last_week?: boolean,
    page?: number,
    limit?: number,
    attendance_type?: string[],
    year?: number,
    month?: number
  ) => {
    const response = await api.get<IApiBaseResponse<IApiAttendancePaginationSelf>>(
      `${url.user}/${user_id}`,
      {
        params: {
          page: page,
          limit: limit,
          last_week: last_week,
          attendance_type: attendance_type,
          year: year,
          month: month
        },
      }
    )

    return response.data;
  }

  const getUserAttendanceYear = async (
    user_id: number, 
  ) => {
    const response = await api.get<IApiBaseResponse<number[]>>(
      `${url.user}/${user_id}/year`,
      { }
    )

    return response.data;
  }

  const updateUserAttendance = async (user_id:number, data: IApiUpdateAttendancePayload) => {
    const response = await api.put<IApiBaseResponse<IApiAttendanceData>>(
      `${url.user}/${user_id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }

  return {
    getTodaySelf,
    clocksAttendanceToday,
    getTodayAll,
    getUserAttendance,
    getUserAttendanceYear,
    updateUserAttendance,
  };
};

export default attendance;

