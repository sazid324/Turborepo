import axiosInstance from "@repo/ui/src/services/api/axiosInterceptor";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const errorHandler = (error: {
  response: any;
  request?: any;
  message?: any;
}) => {
  throw error;
};

export const apiGet = <T = any>(
  apiPath: string,
  config: AxiosRequestConfig = {},
) => {
  return axiosInstance
    .get(apiPath, config)
    .then((response: AxiosResponse<T>) => response)
    .catch(errorHandler);
};

export const apiPost = <R = any, T = any>(
  apiPath: string,
  data?: R,
  config: AxiosRequestConfig = {},
) => {
  return axiosInstance
    .post(apiPath, data, config)
    .then((response: AxiosResponse<T>) => response)
    .catch(errorHandler);
};

export const apiDelete = <T = any>(
  apiPath: string,
  config: AxiosRequestConfig = {},
) => {
  return axiosInstance
    .delete(apiPath, config)
    .then((response: AxiosResponse<T>) => response)
    .catch(errorHandler);
};

export const apiPut = <R = any, T = any>(apiPath: string, data?: R) => {
  return axiosInstance
    .put(apiPath, data)
    .then((response: AxiosResponse<T>) => response)
    .catch(errorHandler);
};

export const apiPatch = <R = any, T = any>(apiPath: string, data?: R) => {
  return axiosInstance
    .patch(apiPath, data)
    .then((response: AxiosResponse<T>) => response)
    .catch(errorHandler);
};
