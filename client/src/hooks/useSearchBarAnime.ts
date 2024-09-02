import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../services/api-client";
import useAnimeQueryStore, { useSearchBarAnimeStore } from "../store";
import  Anime  from "../entities/Anime";


const apiClient = new APIClient<Anime>("/anime");


const useSearchBarAnime = () => {
  const searchText = useSearchBarAnimeStore((s) => s.searchText);

  return useQuery<FetchResponse<Anime>, Error>({
    queryKey: ["animesInSearch", searchText ],
    queryFn: () =>
      apiClient.getAll({
          params:{
          q: searchText,
        } 
      }),   
    staleTime: ms("30s"), 
  });
};

export default useSearchBarAnime;

