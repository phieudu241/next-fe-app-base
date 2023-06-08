import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { serverConfig } from "config";

class Requester {
  requester: AxiosInstance;

  constructor() {
    const axiosInstance = axios.create({
      baseURL: serverConfig.api_server_url,
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    });

    axiosInstance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.requester = axiosInstance;
  }

  handleSuccess(response: AxiosResponse) {
    return response.data;
  }

  handleError = (error: AxiosError) => {
    return Promise.reject(error);
  };

  redirectTo = (document: any, path: string) => {
    document.location = path;
  };

  get(url: string, params?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.requester.get(url, Object.assign({}, { params }, config));
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.requester.post(url, data, config);
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.requester.put(url, data, config);
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.requester.patch(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.requester.delete(url, config);
  }
}

const API = new Requester();

export default API;
