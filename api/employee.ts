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
    getEmployee: apiUrl.getEmployees,
    addEmployee: apiUrl.addEmployee,
  };

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
    getEmployeeById,
    getEmployee
  }
}
    getEmployee,
    addEmployee
  };
};

export default employee;

