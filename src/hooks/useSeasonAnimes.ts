import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Anime from "../entities/Anime";
import APIClient, { FetchResponse } from "../services/api-client";
import ms from "ms";

const apiClient = new APIClient<Anime>("/seasons");

const useAnimeSeaons = (year: string, season: string) => {
  const queryResult = useInfiniteQuery<FetchResponse<Anime>, Error>({
    queryKey: ["animes", , { year: year, season: season }],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getSeasonAnime(year, season, {
        params: {
          page: pageParam,
          sfw: true,
          filter: "TV",
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.pagination?.has_next_page
        ? allPages.length + 1
        : undefined;
    },
    staleTime: ms("24h"),
  });

  return queryResult;
};

export default useAnimeSeaons;
