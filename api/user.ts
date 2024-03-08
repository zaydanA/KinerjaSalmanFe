// import { IApiBaseUserSelf } from "@/types/user";
import { api, support } from "./support";
import { IApiBaseResponse } from "@/types/http";

const auth = () => {
  const { apiUrl } = support();

  const url = {
    self: apiUrl.user.self
  }

  const self = async (userid:number) => {
    const response = await api.get<IApiBaseResponse<any>>(
     `${apiUrl.user.self}`, { }
    )

    return response.data;
  }

  const personalData = async (userid:number) => {
    const response = await api.get<IApiBaseResponse<any>>(
      `${apiUrl.user.personalData}/${userid}`,{}
    )

    return response.data;
  }

  return {
    self,
    personalData,
  }
}

export default auth;