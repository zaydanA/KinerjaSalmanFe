// import { IApiBaseUserSelf } from "@/types/user";

import { IUserEmploymentData, IUserPayrollData, IUserPersonalData, IUserSelfData } from "@/types/user";

import { api, support } from "./support";
import { IApiBaseResponse } from "@/types/http";

const auth = () => {
  const { apiUrl } = support();

  const url = {

    self: apiUrl.users.self,
    personalData: apiUrl.users.personalData,
    employmentData: apiUrl.users.employmentData,
    payrollData: apiUrl.users.payrollData,
    delete: apiUrl.users.delete,
    resetPassword: apiUrl.users.resetPassword,
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

  
  const employmentData = async (user_id:number) => {
    const response = await api.get<IApiBaseResponse<IUserEmploymentData>>(
      `${url.employmentData}/${user_id}`,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }


  const payrollData = async (user_id:number) => {
    const response = await api.get<IApiBaseResponse<IUserPayrollData>>(
      `${url.payrollData}/${user_id}`,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }

  const updatePersonalData = async (userid:number,data:IUserPersonalData) => {

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

  
  const updateEmploymentData = async (userid:number,data:IUserEmploymentData) => {
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

  const updatePayrollData = async (userid:number,data:IUserPayrollData) => {
    const response = await api.put<IApiBaseResponse<IUserPayrollData>>(
      `${url.payrollData}/${userid}`,data,        
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
    payrollData,

    updatePersonalData,
    updateEmploymentData,
    resetPassword,

    updatePayrollData,

  }
}

export default auth;