import { IApiBaseAuthLogin } from '@/types/auth';
import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';
import { IApiBaseEmployee } from '@/types/employee';


const employee = () => {
  const { apiUrl } = support();

  const url = {
    login: apiUrl.login,
    refreshToken: apiUrl.refreshToken,
    logout: apiUrl.logout,
    employee: apiUrl.employee,
  }

  const getEmployeeById = async (
    employeeID :number
  ) => {

    const response = await api.get<any>(
      `${url.employee}/${employeeID}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    return response.data;
  }

  const getEmployee = async (q?: string) => {
    const response = await api.get<IApiBaseResponse<IApiBaseEmployee[]>>(
      url.employee,
      {
        params: {
          search: q
        },
      }
    );

    return response.data;
  };

  return {
    getEmployeeById,
    getEmployee
  }
}
export default employee;

