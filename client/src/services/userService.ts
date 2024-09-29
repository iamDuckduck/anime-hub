import axios from "axios";

export interface userData {
  userName: string;
  email: string;
  profileImage: string;
  bannerImage: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: Boolean;
  _id: string;
}

export interface CloudinaryRes {
  imageUrl: string;
}

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_ENV !== "production"
      ? "http://localhost:3000/api/"
      : import.meta.env.BACK_END,
});

class APIClient<T, D = unknown> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data?: T, headers?: Record<string, string>) => {
    return axiosInstance
      .post<D>(this.endpoint, data, { headers, withCredentials: true })
      .then((res) => res.data);
  };

  get = () => {
    return axiosInstance
      .get<userData>(this.endpoint, { withCredentials: true })
      .then((res) => res.data);
  };

  put = (data?: T, id?: string) => {
    const url = id ? this.endpoint + `/${id}` : this.endpoint;
    return axiosInstance
      .put<D>(url, data, { withCredentials: true })
      .then((res) => res.data);
  };

  getALL = () => {
    return axiosInstance
      .get<T>(this.endpoint, { withCredentials: true })
      .then((res) => res.data);
  };

  delete = (id: string) => {
    const url = this.endpoint + `/${id}`;
    return axiosInstance
      .delete<T>(url, { withCredentials: true })
      .then((res) => res.data);
  };
}

export default APIClient;
