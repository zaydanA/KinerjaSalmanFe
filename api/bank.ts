import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBaseBank } from "@/types/bank";

const bank = () => {
  const { apiUrl } = support();

  const url = {
    banks: apiUrl.banks,
  };

  const getBank = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseBank[]>>(
      url.banks,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }

  return {
    getBank,
  }
}

export default bank;