import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/userService";
import { NavigateFunction } from "react-router-dom";
import { UserFavorite } from "../entities/UserFavorite";

const userFavoriteUploadClient = new APIClient<UserFavorite, UserFavorite>(
  "favorite"
);

const useUserFavoritePost = (queryClient: any, navigate: NavigateFunction) => {
  return useMutation<UserFavorite, AxiosError, UserFavorite>({
    mutationFn: (userFavorite: UserFavorite) => {
      return userFavoriteUploadClient.post(
        // for new anime list
        userFavorite
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userFavorite"]); //refetch the newest state
    },
    onError() {
      navigate("/login");
    },
  });
};

export default useUserFavoritePost;
