import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';
import { IKPI } from "@/types/kpi";

const kpi = () => {
  const { apiUrl } = support();

  const url = {
    createKPI: apiUrl.kpi,
  }

  const createKPI = async (data: IKPI): Promise<IApiBaseResponse<IKPI>> => {
    try {
      console.log("data kpi:", data)
      const response = await api.post<IApiBaseResponse<IKPI>>(url.createKPI, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    createKPI,
  };
};

export default kpi;
