import { useQuery } from "@tanstack/react-query";

import ms from "ms";
import APIClient from "../services/userService";
import { AnimeList } from "../entities/AnimeList";
import { AxiosError } from "axios";
import { useIsLoggedInStore } from "../store";

const apiClient = new APIClient<AnimeList[]>("userAnimeList/myList");

export const useAnimeLists = () => {
  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);

  return useQuery<AnimeList[], AxiosError>({
    queryKey: ["animeLists"],
    queryFn: apiClient.getALL,
    staleTime: ms("1s"),
    retry: false,
    enabled: isLoggedIn,
  });
};

export default useAnimeLists;
