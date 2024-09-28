import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/userService";
import { AnimeList } from "../entities/AnimeList";
import { NavigateFunction } from "react-router-dom";

const animeListDeleteClient = new APIClient<AnimeList>("userAnimeList");

const useAnimeListDelete = (queryClient: any, navigate: NavigateFunction) => {
  return useMutation<AnimeList, AxiosError, string>({
    mutationFn: (id: string) => {
      return animeListDeleteClient.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["animeList"]); //refetch the newest state
    },
    onError() {
      navigate("/login");
    },
  });
};

export default useAnimeListDelete;
