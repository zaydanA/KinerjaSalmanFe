export type IApiBaseAPIContext = {
  token: string | null;
  setToken: (token: string | null) => void;
}