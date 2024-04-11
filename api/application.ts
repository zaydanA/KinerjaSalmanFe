import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBaseApplication } from "@/types/application";
import { ApplicationType } from "@/enums/enums";

const application = () => {
  const { apiUrl } = support();

  const url = {
    leave: apiUrl.applications.applyLeave,
    duty: apiUrl.applications.applyDuty
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
    type: ApplicationType;
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

  return {
    createApplication,
  };
};

export default application;
