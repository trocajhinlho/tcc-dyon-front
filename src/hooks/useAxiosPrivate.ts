import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const fetchAccessToken = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        // Add the current access token in the context to the request
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearear ${auth?.accessToken}`;
                }
                return config;
            },
            error => {
                Promise.reject(error);
            }
        );
        // Retry the request with a new token if the request fails due to expired/invalid previous access token

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                // access token expired
                const prevRequest = error?.config;
                if(error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await fetchAccessToken();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, fetchAccessToken]);

    return axiosPrivate;
}

export default useAxiosPrivate;