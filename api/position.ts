import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBasePosition } from "@/types/position";

const position = () => {
    const { apiUrl } = support();

    const url = {
        positions: apiUrl.positions,
    };

    const getPosition = async () => {
        const response = await api.get<IApiBaseResponse<IApiBasePosition[]>>(
            url.positions,{
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