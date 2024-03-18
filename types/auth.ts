import { IUserSelfData } from "./user"

export type IApiBaseAuthLogin = {
  user: IUserSelfData
  token: string
}

export type IApiBaseAuthRefreshToken = {
  token: string
}

export type IApiBaseAuthContext = {
  user: IUserSelfData | null

  logout: () => Promise<void>

  isHRDManagerOrDirector: () => boolean

  isManager: () => boolean
}