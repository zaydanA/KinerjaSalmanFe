export type IApiBaseDependent = {
  dependent_id: number;
  user_id: number;
  full_name: string;
  address: string;
  relation_type: string;
};

export interface IApiAddDependent {
  user_id: number;
  full_name: string;
  address: string;
  relation_type: string;
}

export interface IApiDependentResponse {
  data: IApiBaseDependent[];
}
