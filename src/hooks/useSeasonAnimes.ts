import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Anime from "../entities/Anime";
import APIClient, { FetchResponse } from "../services/api-client";
import ms from "ms";
import { useAnimeSeasonTypeFilterStore } from "../store";

const apiClient = new APIClient<Anime>("/seasons");

const useAnimeSeaons = (year: string, season: string) => {
  const typefilter = useAnimeSeasonTypeFilterStore((s) => s.typeFilter);

  const queryResult = useInfiniteQuery<FetchResponse<Anime>, Error>({
    queryKey: [
      "animes",
      ,
      { year: year, season: season, typefilter: typefilter },
    ],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getSeasonAnime(year, season, {
        params: {
          page: pageParam,
          sfw: true,
          filter: typefilter,
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
