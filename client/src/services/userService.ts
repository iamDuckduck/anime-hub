import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

class APIClient<T, D> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data: T) => {
    return axiosInstance.post<D>(this.endpoint, data).then((res) => res.data);
  };

  // use arrow function so no this.endpoint reference problem
  //   getAll = (config: AxiosRequestConfig) => {
  //     return axiosInstance
  //       .get<FetchResponse<T>>(this.endpoint, config)
  //       .then((res) => res.data);
  //   };

  //   get = (id: string | number) => {
  //     return axiosInstance
  //       .get<FetchAnimeResponse<T>>(this.endpoint + "/" + id)
  //       .then((res) => res.data);
  //   };

  //   getSeasonAnime = (
  //     year: string,
  //     season: string,
  //     config: AxiosRequestConfig
  //   ) => {
  //     return axiosInstance
  //       .get<FetchResponse<T>>(this.endpoint + "/" + year + "/" + season, config)
  //       .then((res) => res.data);
  //   };
}

export default APIClient;
