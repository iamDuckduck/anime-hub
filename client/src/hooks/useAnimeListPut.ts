import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/userService";
import { NavigateFunction } from "react-router-dom";
import { AnimeListPutRequest } from "../entities/AnimeListPutRequest";
import { AnimeList } from "../entities/AnimeList";

const animeListUploadClient = new APIClient<AnimeListPutRequest, AnimeList>(
  "userAnimeList"
);

const useAnimeListPut = (
  queryClient: any,
  id: string,
  navigate: NavigateFunction
) => {
  return useMutation<AnimeList, AxiosError, AnimeListPutRequest>({
    mutationFn: (animePutData: AnimeListPutRequest) => {
      return animeListUploadClient.put(animePutData, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["animeList"]);
    },
    onError(error) {
      if (error.status == 401) navigate("/login");
      console.error("An error occurred during anime list put:", error);
    },
  });
};

export default useAnimeListPut;
