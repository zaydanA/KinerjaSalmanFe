import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBaseEmployee } from "@/types/employee";

const employee = () => {
  const { apiUrl } = support();

  const url = {
    getEmployee: apiUrl.getEmployees,
  };

  const getEmployee = async (q?: string) => {
    const response = await api.get<IApiBaseResponse<IApiBaseEmployee[]>>(
      url.getEmployee,
      {
        params: {
          search: q
        },
      }
    );

    return response.data;
  };

  return {
    getEmployee,
  };
};

export default employee;
