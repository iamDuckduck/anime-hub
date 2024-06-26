import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import genres from "../data/genres.json";
import Genre from "../entities/Genre";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Genre>("/genres/anime");

const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
    initialData: { data: genres.data },
  });
};

export default useGenres;
