import APIClient from "../services/api-client";
import genres from "../data/genres.json";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Genre>("/genres/anime");

export interface Genre {
  mal_id: number;
  name: string;
}

const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000,
    initialData: { data: genres.data },
  });
};

export default useGenres;
