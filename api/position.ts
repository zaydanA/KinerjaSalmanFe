import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBasePosition } from "@/types/position";

const position = () => {
    const { apiUrl } = support();

    const url = {
        getPosition: apiUrl.getPosition,
    };

    const getPosition = async () => {
        const response = await api.get<IApiBaseResponse<IApiBasePosition[]>>(
            url.getPosition,{
                headers: {
                  'Content-Type': 'application/json'
                }
              }
        )

        return response.data;
    }

    return {
        getPosition,
    }
}

export default position;