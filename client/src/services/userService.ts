import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

class APIClient<T, D> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data: T, headers?: Record<string, string>) => {
    return axiosInstance
      .post<D>(this.endpoint, data, { headers: headers })
      .then((res) => res.data);
  };
}

export default APIClient;
