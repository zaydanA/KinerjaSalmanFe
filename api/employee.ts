import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';
import { IApiAddEmployee } from '@/types/employee';
import { IApiEmployeeResponse } from '@/types/employee'

const employee = () => {
  const { apiUrl } = support();

  const url = {
    employees: apiUrl.employees,
    addEmployee: apiUrl.employees,
    validateAddEmployee: `${apiUrl.employees}/validate-add`,

  }

  const getEmployee = async (page?: number, limit?: number, q?: string, status?: string[], department?: number[], position?: number[]) => {
    const response = await api.get<IApiBaseResponse<IApiEmployeeResponse>>(
      url.employees,
      {
        params: {
          page: page,
          limit: limit,
          search: q,
          status: status,
          department: department,
          position: position,
        },
      }
    );

        return response.data
    }

  const addEmployee = async (data: any) => {
    const response = await api.post<IApiBaseResponse<IApiAddEmployee>>(
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

  const validateAddEmployee = async (data: any, step: number) => {
    const response = await api.post<IApiBaseResponse<any>>(
        url.validateAddEmployee,
        data,
        {
          params: {
            step: step,
          },
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
  }

  return {
    getEmployee,
    addEmployee,
    validateAddEmployee,
  };
};

export default employee;

