export type IApiBaseResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T;
};

export type IApiBaseResponseError<T> = {
  status: "error"
  message: string
  errors?: T
}

export type IApiBaseError = Record<string, string[]>;

export type IApiBaseContext = {
  apiUrl: string | null
  setApiUrl: (url: string) => void

  token: string | null
  setToken: (token: string | null) => void
}