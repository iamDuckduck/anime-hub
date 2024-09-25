import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient, { userData } from "../services/userService";
import { AnimeList } from "../entities/AnimeList";
import { NavigateFunction } from "react-router-dom";
import Anime from "../entities/Anime";

const animeListUploadClient = new APIClient<AnimeList, AnimeList>(
  "userAnimeList"
);

const useAnimeListPost = (queryClient: any, navigate: NavigateFunction) => {
  return useMutation<AnimeList, AxiosError, AnimeList>({
    mutationFn: (animeList: AnimeList) => {
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
