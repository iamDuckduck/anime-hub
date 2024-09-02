import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import AnimeChara from "../entities/AnimeChara";
import APIClient from "../services/api-client";

const useAnimeChara = (id: string) => {
  const apiClient = new APIClient<AnimeChara>(`anime/${id}/characters`);

  return useQuery({
    queryKey: ["animeChara", id],
    queryFn: apiClient.getAll,
    staleTime: ms("1h"),
  });
};

export default useAnimeChara;
