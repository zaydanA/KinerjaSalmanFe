import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiAddDependent, IApiBaseDependent } from "@/types/dependent";

const dependent = () => {
  const { apiUrl } = support();

  const url = {
    dependents: apiUrl.dependents,
    dependentById: (id: number) => `${apiUrl.dependents}/${id}`,
    dependentsByUserId: (userId: number) =>
      `${apiUrl.dependents}/user/${userId}`,
  };

  const getDependents = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseDependent[]>>(
      url.dependents,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  };

  const getDependentById = async (id: number) => {
    const response = await api.get<IApiBaseResponse<IApiBaseDependent>>(
      url.dependentById(id),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  };

  const getDependentsByUserId = async (userId: number) => {
    const response = await api.get<IApiBaseResponse<IApiBaseDependent[]>>(
      url.dependentsByUserId(userId),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  };

  const addDependent = async (dependentData: IApiAddDependent) => {
    const response = await api.post<IApiBaseResponse<IApiBaseDependent>>(
      url.dependents,
      dependentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  };

  const updateDependent = async (
    id: number,
    dependentData: Partial<IApiBaseDependent>,
  ) => {
    const response = await api.put<IApiBaseResponse<IApiBaseDependent>>(
      url.dependentById(id),
      dependentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  };

  const deleteDependent = async (id: number) => {
    const response = await api.delete<IApiBaseResponse<IApiBaseDependent>>(
      url.dependentById(id),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  };

  return {
    getDependents,
    getDependentById,
    getDependentsByUserId,
    addDependent,
    updateDependent,
    deleteDependent,
  };
};

export default dependent;
