import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { FetchResponse } from "../services/api-client";
import genres from "../data/genres.json";

export interface Genre {
  mal_id: number;
  name: string;
}

const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Genre>>("/genres/anime")
        .then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000,
    initialData: genres,
  });
};

export default useGenres;
