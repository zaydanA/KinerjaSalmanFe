// import { IApiBaseUserSelf } from "@/types/user";
import { IUserPersonalData } from "@/types/user";
import { api, support } from "./support";
import { IApiBaseResponse } from "@/types/http";

const auth = () => {
  const { apiUrl } = support();

  const url = {
    self: apiUrl.user.self,
    personalData: apiUrl.user.personalData,
    delete: apiUrl.user.delete
  }

  const self = async () => {
    const response = await api.get<IApiBaseResponse<any>>(
      url.self, { }
    )

    return response.data;
  }

  const personalData = async (user_id:number) => {
    const response = await api.get<IApiBaseResponse<any>>(
      `${url.personalData}/${user_id}`,{}
    )

    return response.data;
  }

  const deleteUser = async (userid: number) => {
    const response = await api.delete<IApiBaseResponse<IUserPersonalData>>(
      `${url.delete}/${userid}`
    )

    return response.data
  }

  return {
    self,
    personalData,
    deleteUser
  }
}

export default auth;