import axios from "axios";

export interface FetchResponse<T> {
  data: T[];
}


export default axios.create({
    baseURL: "https://api.jikan.moe/v4/",
}); 