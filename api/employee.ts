import { IApiBaseAuthLogin } from '@/types/auth';
import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';
import { IApiBaseEmployee, IApiGenderData } from '@/types/employee';
import { IApiEmployeeResponse } from '@/types/employee'


const employee = () => {
  const { apiUrl } = support();

  const url = {
    employee: apiUrl.employee.employee,
    addEmployee: apiUrl.employee.employee,

    gender: apiUrl.employee.gender
  }

  const getEmployee = async (q?: string) => {
    const response = await api.get<IApiBaseResponse<IApiEmployeeResponse>>(
      url.employee,
      {
        params: {
          page: 1,
          limit: 1,
          search: q,
          status: status,
          // department: department,
          // position: position,
        },
      }
    );

    return response.data;
  };

  const addEmployee = async (data: any) => {
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
  }

  const getGenders = async () => {
    const response = await api.get<IApiBaseResponse<IApiGenderData[]>>(
      url.gender,
      {}
    )

    return response.data;
  }

  return {
    getEmployee,
    addEmployee,

    getGenders
  };
};

export default employee;

