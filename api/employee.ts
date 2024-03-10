import { IApiBaseAuthLogin } from '@/types/auth';
import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';
import { IApiBaseEmployee } from '@/types/employee';
import { IApiEmployeeResponse } from '@/types/employee'


const employee = () => {
  const { apiUrl } = support();

  const url = {
    login: apiUrl.login,
    refreshToken: apiUrl.refreshToken,
    logout: apiUrl.logout,
    employee: apiUrl.employee,
    addEmployee: apiUrl.addEmployee,
  }

  const getEmployee = async (q?: string) => {
    const response = await api.get<IApiBaseResponse<IApiEmployeeResponse>>(
      url.employee,
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

