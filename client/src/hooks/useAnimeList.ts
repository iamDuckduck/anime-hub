import { useQuery } from "@tanstack/react-query";

import ms from "ms";
import APIClient from "../services/userService";
import { AnimeList } from "../entities/AnimeList";
import { AxiosError } from "axios";

const apiClient = new APIClient<AnimeList[]>("userAnimeList/myList");

export const useAnimeList = (isLoggedIn?: boolean) => {
  return useQuery<AnimeList[], AxiosError>({
    queryKey: ["animeList"],
    queryFn: apiClient.getALL,
    staleTime: ms("1s"),
    retry: false,
    enabled: isLoggedIn,
  });
};

export default useAnimeList;
