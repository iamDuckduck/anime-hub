import APIClient from "../services/api-client";
import genres from "../data/genres.json";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new APIClient<Genre>("/genres/anime");

export interface Genre {
  mal_id: number;
  name: string;
}

const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
    initialData: { data: genres.data },
  });
};

export default useGenres;
