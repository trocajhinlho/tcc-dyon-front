import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { HTTPMethod } from "../types/types";

const baseUrl = import.meta.env.VITE_BASE_URL + "/api/";

export default axios.create({
    baseURL: baseUrl
});

export const axiosPrivate = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
});

export const genericRequest = <T>(params: {url: string, method?: HTTPMethod, options?: Record<string, unknown>}) => {
    return axios<T>({
        method: params.method ?? "GET",
        url: baseUrl + params.url,
        ...params.options
    });
};