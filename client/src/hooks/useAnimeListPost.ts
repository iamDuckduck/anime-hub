import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/userService";
import { AnimeList } from "../entities/AnimeList";
import { NavigateFunction } from "react-router-dom";

const animeListUploadClient = new APIClient<AnimeList, AnimeList>(
  "userAnimeList"
);

const useAnimeListPost = (queryClient: any, navigate: NavigateFunction) => {
  return useMutation<AnimeList, AxiosError, AnimeList>({
    mutationFn: (newAnimeList: AnimeList) => {
      return animeListUploadClient.post(newAnimeList);
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
