import APIClient, { userData } from "../services/userService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
const apiClient = new APIClient("users/me");

const useGetUser = (
  setIsLoggedIn: (state: boolean) => void,
  setUserData: (state: userData) => void,
  queryClient: any
) => {
  return useQuery<userData>({
    queryKey: ["userInfo"],
    queryFn: apiClient.get,
    retry: false,
    onSuccess: (data: userData) => {
      setIsLoggedIn(true);
      setUserData(data);
    },
    onError: () => {
      queryClient.setQueryData(["userInfo"], null);
      queryClient.setQueryData(["animeList"], null);
      setIsLoggedIn(false);
    },
  });
};

export default useGetUser;
