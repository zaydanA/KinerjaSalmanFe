import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBaseAllowanceType } from "@/types/allowance";

const allowance = () => {
  const { apiUrl } = support();

  const url = {
    allowanceTypes: apiUrl.allowances.types,
  };

  const getAllowanceTypes = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseAllowanceType[]>>(
      url.allowanceTypes,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }

  return {
    getAllowanceTypes,
  }
}

export default allowance;