import { useQuery } from "@tanstack/react-query";
import Anime from "../entities/Anime";
import APIClient from "../services/api-client";
import ms from "ms";

const apiClient = new APIClient<Anime>("/seasons");

const useAnimeSeaons = (year: string, season: string) => {
  return useQuery({
    queryKey: ["SeasonAnimes", { year: year, season: season }],
    queryFn: () => apiClient.getSeasonAnime(year, season),
    staleTime: ms("24h"),
  });
};

export default useAnimeSeaons;
