import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  data: T[];
  pagination?: {
    has_next_page: Boolean;
    current_page: number;
  };
}

// may refactor to a function if only detail anime page need to use it
interface FetchAnimeResponse<T> {
  data: T;
}

const axiosInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4/",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // use arrow function so no this.endpoint reference problem
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: string | number) => {
    return axiosInstance
      .get<FetchAnimeResponse<T>>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
}

export default APIClient;
