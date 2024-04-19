import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import {
  IApiBaseApplication,
  IApiBaseApplicationResponse,
} from "@/types/application";
import { ApplicationsStatus, ApplicationType } from "@/enums/enums";

const application = () => {
  const { apiUrl } = support();

  const url = {
    apply: apiUrl.application.apply,
    applications: apiUrl.application.applications,
    generateFileUrl:apiUrl.application.generateFileUrl
  };

  const createApplication = async ({
    applicationType,
    start_date,
    end_date,
    description,
    type,
    leave_type,
    event_name,
    location,
    file_url,
  }: {
    applicationType: boolean;
    start_date: string;
    end_date: string;
    description: string;
    type: string;
    leave_type?: string;
    event_name?: string;
    location?: string;
    file_url?: FileList | null;
  }) => {
    const formData = new FormData();
    
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("description", description);
    formData.append("type", type);

    // Time-off leave application
    if (applicationType) {
      formData.append("leave_type", leave_type ?? "");
    } else {
      // Duty leave application
      formData.append("event_name", event_name ?? "");
      formData.append("location", location ?? "");
    }

    if (file_url instanceof FileList) {
      formData.append("file_url", file_url[0]);
    }


    const response = await api.post<IApiBaseResponse<IApiBaseApplication>>(
      url.apply,
      formData,
      {
        headers: {
          "Content-Type": "multiform/form-data",
        },
      },
    );

    return response.data;
  };

  const getApplications = async (
    type: ApplicationType,
    page: number,
    limit: number,
  ) => {
    const response = await api.get<
      IApiBaseResponse<IApiBaseApplicationResponse>
    >(url.applications, {
      params: {
        page: page,
        limit: limit,
        type: type,
      },
    });

    return {
      data: response.data.data,
    };
  };

  const updateApplicationStatus = async (
    id: number,
    fileID: string | undefined,
    status: ApplicationsStatus,
  ) => {
    const response = await api.put<IApiBaseResponse<IApiBaseApplication>>(
      url.applications,
      { status,fileID },
      {
        params: {
          id,
        },
      },
    );

    return response.data;
  };

  const generateFileUrlApplication = async (
    fileID:string,
    )=>{
    const response = await api.post<IApiBaseResponse<string>>(
      url.generateFileUrl
    ,{
      fileID:fileID,
    },
    {

    })

    return response.data;
  }

  return {
    createApplication,
    getApplications,
    updateApplicationStatus,
    generateFileUrlApplication
  };
};

export default application;
