// import { IApiBaseUserSelf } from "@/types/user";
import { IUserEmploymentData, IUserPersonalData, IUserSelfData, ResetPassword } from "@/types/user";
import { api, support } from "./support";
import { IApiBaseResponse } from "@/types/http";

const auth = () => {
  const { apiUrl } = support();

  const url = {
    self: apiUrl.user.self,
    personalData: apiUrl.user.personalData,
    delete: apiUrl.user.delete,
    employmentData:apiUrl.user.employmentData,
    resetPassword:apiUrl.user.resetPassword
  }


  const self = async () => {
    const response = await api.get<IApiBaseResponse<IUserSelfData>>(
      url.self,       {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }

  const personalData = async (user_id:number|undefined) => {
    const response = await api.get<IApiBaseResponse<IUserPersonalData>>(
      `${url.personalData}/${user_id}`,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }
  const employmentData = async (user_id:number|undefined) => {
    const response = await api.get<IApiBaseResponse<IUserEmploymentData>>(
      `${url.employmentData}/${user_id}`,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }

  const updatePersonalData = async (userid:number|undefined,data:IUserPersonalData) => {
    const response = await api.put<IApiBaseResponse<IUserPersonalData>>(
      `${url.personalData}/${userid}`,data,        
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    return response.data;
  }
  const updateEmploymentData = async (userid:number|undefined,data:IUserEmploymentData) => {
    const response = await api.put<IApiBaseResponse<IUserEmploymentData>>(
      `${url.employmentData}/${userid}`,data,        
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    return response.data;
  }
  const resetPassword = async (password:string) => {
    const response = await api.patch<IApiBaseResponse<any>>(
      `${url.resetPassword}`,{
        password: password
      },        
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    return response.data;
  }

  return {
    self,
    personalData,
    employmentData,
    updatePersonalData,
    updateEmploymentData,
    resetPassword,
  }
}

export default auth;