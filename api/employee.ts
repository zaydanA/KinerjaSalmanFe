import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';
import { IApiAddEmployee, IApiGenderData } from '@/types/employee';
import { IApiEmployeeResponse } from '@/types/employee'
import department from './department';
import position from './position';


const employee = () => {
  const { apiUrl } = support();

  const url = {
    employee: apiUrl.employee,
    addEmployee: apiUrl.employee,
    validateAddEmployee: `${apiUrl.employee}/validate-add`,

    gender: apiUrl.employee
  }

  const getEmployee = async (page: number, limit: number, q?: string | null, status?: string[] | undefined, department?: number[] | undefined, position?: number[] | undefined) => {

    const response = await api.get<IApiBaseResponse<IApiEmployeeResponse>>(
          url.employee,
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
    try {
      const response = await api.post<any>(
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
  } catch (error) {
      console.error('Error validating employee:', error);
      throw error; 
  } 
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
    validateAddEmployee,

    getGenders
  };
};

export default employee;

