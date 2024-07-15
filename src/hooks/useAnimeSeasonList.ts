import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import Season from "../entities/Season";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Season>("/seasons");

const useAnimeSeasonList = () => {
  return useQuery({
    queryKey: ["animeSeasons"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default useAnimeSeasonList;
