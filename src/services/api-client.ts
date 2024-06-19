import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  data: T[];
  pagination:{
    has_next_page: Boolean
  }
}
const axiosInstance = axios.create({
    baseURL: "https://api.jikan.moe/v4/"
});

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    // use arrow function so no this.endpoint reference problem
    getAll = (config: AxiosRequestConfig) =>{
        return axiosInstance
        .get<FetchResponse<T>>(this.endpoint, config)
        .then(res=>res.data);
    }

    
}

export default APIClient


