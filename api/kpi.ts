import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';
import { IApiKPIResponse, IKPI } from "@/types/kpi";

const kpi = () => {
  const { apiUrl } = support();

  const url = {
    getKPI: apiUrl.kpi,
    createKPI: apiUrl.kpi,
  }

  const getKPI = async (page?: number, limit?: number): Promise<IApiBaseResponse<IApiKPIResponse>> => {
    try {
      const response = await api.get<IApiBaseResponse<IApiKPIResponse>>(
        url.getKPI, {
          params: {
            page: page,
            limit: limit,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createKPI = async (data: IKPI): Promise<IApiBaseResponse<IKPI>> => {
    try {
      const response = await api.post<IApiBaseResponse<IKPI>>(url.createKPI, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getKPI,
    createKPI,
  };
};

export default kpi;
