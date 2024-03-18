import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';
import { IApiAnalyticsData } from '@/types/analytics';


const analytics = () => {
  const { apiUrl } = support();

  const url = {
    genders: apiUrl.analytics.genders,
    todaysAttendances: apiUrl.analytics.todaysAttendances,
    myAttendances: apiUrl.analytics.myAttendances
  }

  const getGenders = async () => {
    const response = await api.get<IApiBaseResponse<IApiAnalyticsData[]>>(
      url.genders,
      {}
    )

    return response.data;
  }

  const getTodaysAttendances = async () => {
    const response = await api.get<IApiBaseResponse<IApiAnalyticsData[]>>(
      url.todaysAttendances,
      {}
    )

    return response.data;
  }

  const getMyAttendances = async () => {
    const response = await api.get<IApiBaseResponse<IApiAnalyticsData[]>>(
      url.myAttendances,
      {}
    )

    return response.data;
  }

  return {
    getGenders,
    getTodaysAttendances,
    getMyAttendances
  };
};

export default analytics;

