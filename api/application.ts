import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBaseApplication, IApiApplicationResponse } from "@/types/application";

const application = () => {
  const { apiUrl } = support();

  const url = {
    leave: apiUrl.application.applyLeave,
    duty: apiUrl.application.applyDuty,
    applications: apiUrl.application.applications,
  };

  const createApplication = async ({
    applicationType,
    start_date,
    end_date,
    description,
    type,
    event_name,
    location,
    image_file,
  }: {
    applicationType: boolean;
    start_date: string;
    end_date: string;
    description: string;
    type?: string;
    event_name?: string;
    location?: string;
    image_file?: FileList | null;
  }) => {
    const formData = new FormData();

    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("description", description);

    // Time-off leave application
    if (applicationType) {
      formData.append("type", type ?? "");
    } else {
      // Duty leave application
      formData.append("event_name", event_name ?? "");
      formData.append("location", location ?? "");
    }

    if (image_file instanceof FileList) {
      formData.append("image_file", image_file[0]);
    }

    const response = await api.post<IApiBaseResponse<IApiBaseApplication>>(
      applicationType ? url.leave : url.duty,
      formData,
      {
        headers: {
          "Content-Type": "multiform/form-data",
        },
      },
    );

    return response.data;
  };

  const getApplications = async (isDuty: number, page: number, limit: number) => {
    const response = await api.get<IApiBaseResponse<IApiApplicationResponse>>(url.applications, {
      params: {
        page,
        limit,
        isDuty,
      },
    });
  
    return {
      data: response.data.data,
    };
  };

  const changeApplicationStatus = async(id: number, isDuty: number, status:string) => {
    console.log("status : ", status);

    const response = await api.put<IApiBaseResponse<IApiBaseApplication>>(
      url.applications,
      { status },
      {
        params: {
          id,
          isDuty,
        }
      }
    )

    

    return response.data;
  }
  

  return {
    createApplication,
    getApplications,
    changeApplicationStatus
  };
};

export default application;
