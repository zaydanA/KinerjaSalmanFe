// import { IApiBaseUserSelf } from "@/types/user";
import { api, support } from "./support";
import { IApiBaseResponse } from "@/types/http";

const auth = () => {
  const { apiUrl } = support();

  const url = {
    self: apiUrl.user.self
  }

  const self = async () => {
    const response = await api.get<IApiBaseResponse<any>>(
      url.self, { }
    )

    return response.data;
  }

  const personalData = async (user_id:number) => {
    const response = await api.get<IApiBaseResponse<any>>(
      `${apiUrl.user.personalData}/${user_id}`,{}
    )

    return response.data;
  }

  return {
    self,
    personalData,
  }
}

export default auth;