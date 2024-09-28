import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient, { userData } from "../services/userService";
import { AnimeList } from "../entities/AnimeList";
import { NavigateFunction } from "react-router-dom";
import { AnimeListPost } from "../entities/AnimeListPost";

const animeListUploadClient = new APIClient<AnimeListPost, AnimeList>(
  "userAnimeList"
);

const useAnimeListPost = (queryClient: any, navigate: NavigateFunction) => {
  return useMutation<AnimeList, AxiosError, AnimeListPost>({
    mutationFn: (animeList: AnimeListPost) => {
      return animeListUploadClient.post(
        // for new anime list
        animeList
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["animeList"]); //refetch the newest state
    },
    onError() {
      navigate("/login");
    },
  });
};

export default useAnimeListPost;
