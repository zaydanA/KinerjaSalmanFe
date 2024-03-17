import { IApiAttendancePagination, IApiAttendancePayload, IApiClocksAttendancePayload } from '@/types/attendance';
import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';


const attendance = () => {
  const { apiUrl } = support();

  const url = {
    todaySelf: apiUrl.attendance.todaySelf,
    todayClocks: apiUrl.attendance.todayClocks,
    todayAll: apiUrl.attendance.todayAll
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

  return {
    getTodaySelf,
    clocksAttendanceToday,
    getTodayAll
  };
};

export default attendance;

