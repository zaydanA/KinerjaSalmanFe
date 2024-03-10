import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';
import { IApiGenderData } from '@/types/employee';


const analytics = () => {
  const { apiUrl } = support();

  const url = {
    gender: apiUrl.analytics.gender
  }

  const getGenders = async () => {
    const response = await api.get<IApiBaseResponse<IApiGenderData[]>>(
      url.gender,
      {}
    )

    return response.data;
  }

  return {
    getGenders
  };
};

export default analytics;

