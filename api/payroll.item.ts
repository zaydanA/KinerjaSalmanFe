import { IApiBasePayrollItemPagination } from '@/types/payroll.item';
import { api, support } from './support';
import { IApiBaseResponse } from '@/types/http';

const payrollItem = () => {
  const { apiUrl } = support();

  const url = {
    user: apiUrl.payrollItems.user
  }

  const getUserPayrollItems = async (
    user_id: number, 
    page?: number,
    limit?: number,
    year?: number
  ) => {
    const response = await api.get<IApiBaseResponse<IApiBasePayrollItemPagination>>(
      `${url.user}/${user_id}`,
      {
        params: {
          page: page,
          limit: limit,
          year: year,
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

  return {
    getUserPayrollItems,
    getUserPayrollItemsYear,
  };
};

export default payrollItem;

