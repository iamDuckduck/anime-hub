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

// Create Axios instance with default headers
const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_ENV !== "production"
      ? "http://localhost:3000/api/"
      : import.meta.env.VITE_BACK_END,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the Authorization token before every request (if available)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("myToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class UserAPIClient<T, D = unknown> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data?: T, headers?: Record<string, string>) => {
    return axiosInstance
      .post<D>(this.endpoint, data, { ...headers })
      .then((res) => res.data);
  };

  get = () => {
    return axiosInstance.get<userData>(this.endpoint).then((res) => res.data);
  };

  put = (data?: T, id?: string) => {
    const url = id ? this.endpoint + `/${id}` : this.endpoint;
    return axiosInstance.put<D>(url, data).then((res) => res.data);
  };

  getALL = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };

  delete = (id: string) => {
    const url = this.endpoint + `/${id}`;
    return axiosInstance.delete<T>(url).then((res) => res.data);
  };
}

export default UserAPIClient;
