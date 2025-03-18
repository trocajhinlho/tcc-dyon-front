import axios from "../api/axios"
import { AuthInfo } from "../types/interface";
import { APIResponse, AccessTokenResponse } from "../types/types";
import useAuth from "./useAuth"

/**
 * Fetches an **access token** using the refresh token in the user's cookies
*/
const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get<AccessTokenResponse>("/auth/token", {
            withCredentials: true
        });
        if(response.data.erro || !response.data.dados)
            return undefined;

        const accessToken = response.data.dados.accessToken;

        setAuth((prev: AuthInfo) => {
            return { ...prev, accessToken };
        })
        return accessToken;
    }

    return refresh;
}

export default useRefreshToken;