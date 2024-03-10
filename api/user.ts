// import { IApiBaseUserSelf } from "@/types/user";
import { IUserPersonalData } from "@/types/user";
import { api, support } from "./support";
import { IApiBaseResponse } from "@/types/http";

const auth = () => {
  const { apiUrl } = support();

  const url = {
    self: apiUrl.user.self
  }

  const self = async (userid:number) => {
    const response = await api.get<IApiBaseResponse<IUserPersonalData>>(
     `${apiUrl.user.self}`, { }
    )

    return response.data;
  }

  const personalData = async (userid:number) => {
    const response = await api.get<IApiBaseResponse<IUserPersonalData>>(
      `${apiUrl.user.personalData}/${userid}`,{}
    )

    return response.data;
  }

  const updatePersonalData = async (userid:number,data:IUserPersonalData) => {
    const response = await api.put<IApiBaseResponse<any>>(
      `${apiUrl.user.personalData}/${userid}`,data,        
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(data);
    console.log(response);
    // return response.data;
  }

  return {
    self,
    personalData,
    updatePersonalData
  }
}

export default auth;