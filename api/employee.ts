import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBaseEmployee } from "@/types/employee";

const employee = () => {
  const { apiUrl } = support();

  const url = {
    getEmployee: apiUrl.getEmployees,
    addEmployee: apiUrl.addEmployee,
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

  const addEmployee = async (data: any) => {
    try {
      const response = await api.post<IApiBaseResponse<IApiBaseEmployee>>(
        url.addEmployee,
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("success co")
      return response.data;
    } catch (error){
      throw error;
    }
  }

  return {
    getEmployee,
    addEmployee
  };
};

export default employee;
