import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/userService";
import { UserFavorite } from "../entities/UserFavorite";
import ms from "ms";

const apiClient = new APIClient<UserFavorite[]>("favorite");

export const useFavorite = (isLoggedIn?: boolean) => {
  return useQuery<UserFavorite[], AxiosError>({
    queryKey: ["userFavorite"],
    queryFn: apiClient.getALL,
    staleTime: ms("1s"),
    retry: false,
    enabled: isLoggedIn,
  });
};

export default useFavorite;