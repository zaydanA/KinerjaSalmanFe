import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBaseDepartment } from "@/types/department";

const department = () => {
    const { apiUrl } = support();

    const url = {
        getDepartment: apiUrl.getDepartment,
    };

    const getDepartment = async () => {
        const response = await api.get<IApiBaseResponse<IApiBaseDepartment[]>>(
            url.getDepartment,
        )

        return response.data;
    }

    return {
        getDepartment,
    }
}

export default department;