import { useLocation } from "react-router-dom";
import UserAPIClient, { userData } from "../services/userService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsLoggedInStore } from "../store";
const apiClient = new UserAPIClient("users/me");

const useGetUser = () => {
  const queryClient = useQueryClient();
  const setUserData = useIsLoggedInStore((s) => s.setUserData);
  const setIsLoggedIn = useIsLoggedInStore((s) => s.setIsLoggedIn);

  return useQuery<userData>({
    queryKey: ["userInfo"],
    queryFn: apiClient.get,
    retry: false,
    onSuccess: (data: userData) => {
      setIsLoggedIn(localStorage.getItem("myToken")); //set local back to true if token still exist and vaild
      setUserData(data);
    },
    onError: () => {
      setIsLoggedIn(null);
      queryClient.setQueryData(["userInfo"], null);
      queryClient.setQueryData(["animeLists"], null);
      queryClient.setQueryData(["userFavorite"], null);
    },
  });
};

export default useGetUser;
