import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBaseDepartment } from "@/types/department";

const department = () => {
    const { apiUrl } = support();

    const url = {
        departments: apiUrl.departments,
    };

    const getDepartment = async () => {
        const response = await api.get<IApiBaseResponse<IApiBaseDepartment[]>>(
            url.departments, {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
        )

        return response.data;
    }

    return {
        getDepartment,
    }
}

export default department;