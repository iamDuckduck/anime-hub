import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import UserAPIClient from "../services/userService";
import { NavigateFunction } from "react-router-dom";
import { UserFavorite } from "../entities/UserFavorite";

const userFavoritePutClient = new UserAPIClient<UserFavorite, UserFavorite>(
  "favorite"
);

const useAnimeListPut = (
  queryClient: any,
  id: string,
  navigate: NavigateFunction
) => {
  return useMutation<UserFavorite, AxiosError, UserFavorite>({
    mutationFn: (userFavorite: UserFavorite) => {
      return userFavoritePutClient.put(userFavorite, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userFavorite"]);
    },
    onError(error) {
      if (error.status == 401) navigate("/login");
      console.error("An error occurred during favorite put:", error);
    },
  });
};

export default useAnimeListPut;
