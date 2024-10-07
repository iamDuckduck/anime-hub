import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import UserAPIClient from "../services/userService";
import { UserFavorite } from "../entities/UserFavorite";
import ms from "ms";
import { useIsLoggedInStore } from "../store";

const apiClient = new UserAPIClient<UserFavorite[]>("favorite");

export const useFavorite = () => {
  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);
  return useQuery<UserFavorite[], AxiosError>({
    queryKey: ["userFavorite"],
    queryFn: apiClient.getALL,
    staleTime: ms("1s"),
    retry: false,
    enabled: isLoggedIn,
  });
};

export default useFavorite;
