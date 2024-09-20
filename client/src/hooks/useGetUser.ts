import APIClient, { userData } from "../services/userService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
const apiClient = new APIClient("users/me");

const useGetUser = () => {
  return useQuery<userData>({
    queryKey: ["userInfo"],
    queryFn: apiClient.get,
    // staleTime: ms("1s"),
    retry: false,
  });
};

export default useGetUser;
