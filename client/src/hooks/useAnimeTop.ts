import { useQuery } from "@tanstack/react-query";
import Anime from "../entities/Anime";
import ms from "ms";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Anime>("/top/anime");

const useAnimeTop = (page: string) => {
  return useQuery({
    queryKey: ["animeTop", page],
    queryFn: () =>
      apiClient.getAll({
        params: {
          page: page,
        },
      }),
    staleTime: ms("5s"),
  });
};

export default useAnimeTop;
