import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';
import { IApiKPIResponse, IKPI } from "@/types/kpi";

const kpi = () => {
  const { apiUrl } = support();

  const url = {
    getKPI: apiUrl.kpi,
    createKPI: apiUrl.kpi,
    updateKPI: (kpiId: number) => `${apiUrl.kpi}/${kpiId}`
  }

  const getKPI = async (employeeId: number, page?: number, limit?: number): Promise<IApiBaseResponse<IApiKPIResponse>> => {
    try {
      const response = await api.get<IApiBaseResponse<IApiKPIResponse>>(
        url.getKPI, {
          params: {
            employeeId: employeeId,
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

  const updateKPI = async (kpiId: number, updatedKPI: IKPI): Promise<IApiBaseResponse<IKPI>> => {
    try {
      const response = await api.put<IApiBaseResponse<IKPI>>(
        url.updateKPI(kpiId),
        updatedKPI
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getKPI,
    createKPI,
    updateKPI,
  };
};

export default kpi;
