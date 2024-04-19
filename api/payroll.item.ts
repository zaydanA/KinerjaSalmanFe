import { IApiBaseEmployeesPayrollItemList, IApiBaseEmployeesReviewPayrollItemPagination, IApiBasePayrollItemDetails, IApiBasePayrollItemList, IApiBasePayrollItemPagination } from '@/types/payroll.item';
import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';

const payrollItem = () => {
  const { apiUrl } = support();

  const url = {
    user: apiUrl.payrollItems.user,
    employees: apiUrl.payrollItems.employees,
    run: apiUrl.payrollItems.employeesRun,
    review: apiUrl.payrollItems.employeesReview,
  }

  const getUserPayrollItems = async (
    user_id: number, 
    page?: number,
    limit?: number,
    year?: number,
    month?: number
  ) => {
    const response = await api.get<IApiBaseResponse<IApiBasePayrollItemPagination>>(
      `${url.user}/${user_id}`,
      {
        params: {
          page: page,
          limit: limit,
          year: year,
          month: month
        },
      }
    )

    return response.data;
  }

  const getUserPayrollItemsYear = async (
    user_id: number, 
  ) => {
    const response = await api.get<IApiBaseResponse<number[]>>(
      `${url.user}/${user_id}/year`,
      { }
    )

    return response.data;
  }

  const getEmployeesPayrollItems = async (
    year: number,
  ) => {
    const response = await api.get<IApiBaseResponse<IApiBaseEmployeesPayrollItemList[]>>(
      `${url.employees}/${year}`,
      {}
    )

    return response.data;
  }

  const runEmployeesPayrollItems = async (
    period: string
  ) => {
    const response = await api.post<IApiBaseResponse<null>>(
      `${url.run}`,
      {
        "period": period
      }
    )

    return response.data;
  }

  const getEmployeesReviewPayrollItems = async (
    period: string,
    page?: number, 
    limit?: number, 
    q?: string, 
    status?: number[], 
    department?: number[], 
    position?: number[]
  ) => {
    const response = await api.get<IApiBaseResponse<IApiBaseEmployeesReviewPayrollItemPagination>>(
      url.review,
      {
        params: {
          period: period,
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

  const updateEmployeesReviewPayrollItems = async (
    payroll_id: number,
    period: string,
    status: number
  ) => {
    const response = await api.patch<IApiBaseResponse<IApiBasePayrollItemList>>(
      `${url.review}/${payroll_id}`,
      {
        period: period,
        status: status
      }
    );

    return response.data
  }

  const getUserPayrollItemsDetails = async (
    user_id: number,
    period: string
  ) => {
    const response = await api.get<IApiBaseResponse<IApiBasePayrollItemDetails>>(
      `${url.user}/${user_id}/items/${period}`,
      {}
    )

    return response.data;
  }

  return {
    getUserPayrollItems,
    getUserPayrollItemsYear,
    getEmployeesPayrollItems,
    runEmployeesPayrollItems,

    getEmployeesReviewPayrollItems,
    updateEmployeesReviewPayrollItems,

    getUserPayrollItemsDetails
  };
};

export default payrollItem;

