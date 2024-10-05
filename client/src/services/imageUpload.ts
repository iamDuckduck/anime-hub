import axios from "axios";

export interface CloudinaryRes {
  imageUrl: string;
}

// Create Axios instance with default headers
const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_ENV !== "production"
      ? "http://localhost:3000/api/"
      : import.meta.env.VITE_BACK_END,
  headers: {
    "Content-Type": "multipart/form-data",
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

class ImageAPIClient<T, D = unknown> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data?: T) => {
    return axiosInstance.post<D>(this.endpoint, data).then((res) => res.data);
  };
}

export default ImageAPIClient;
