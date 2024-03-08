import { IApiBaseResponse } from "./http"
import { IUserSelfData } from "./user"

export type IApiBaseAuthLogin = {
  user: IUserSelfData
  token: string
}

export type IApiBaseAuthContext = {
  user: IUserSelfData | null

  refreshToken: () => Promise<void>

  self: () => Promise<void>

  logout: () => Promise<void>
}