import axios from "../api/axios";
import { APIResponse } from "../types/types";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth(null);
        localStorage.clear();
        const res = await axios.post<APIResponse<undefined>>("/auth/logout", {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    }

    return logout;
}

export default useLogout;