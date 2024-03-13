import { IApiBaseResponse } from "./http"
import { IUserPersonalData, IUserSelfData } from "./user"

export type IApiBaseAuthLogin = {
  user: IUserSelfData
  token: string
}

export type IApiBaseAuthRefreshToken = {
  token: string
}

export type IApiBaseAuthContext = {
  user: IUserSelfData | null

  // refreshToken: () => Promise<void>

  self: () => Promise<void>

  logout: () => Promise<void>
}