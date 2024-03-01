import { IApiBaseResponse } from "./http"
import { IApiBaseUserSelf } from "./user"

export type IApiBaseAuthLogin = {
  user: IApiBaseUserSelf
  token: string
}

export type IApiBaseAuthContext = {
  user: IApiBaseUserSelf | null

  login: (
    username: string, 
    password: string
  ) => Promise<IApiBaseResponse<IApiBaseAuthLogin>>

  refreshToken: () => Promise<void>

  self: () => Promise<void>

  logout: () => Promise<void>
}