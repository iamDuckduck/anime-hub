import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../services/api-client";
import useAnimeQueryStore from "../store";


export interface Anime {
  mal_id: number;
  title: string;
  images: images;
  popularity: number;
  year: number;
  score:number;
}

interface images{
  jpg: {
    image_url: string;
  };
  wedp:{
     image_url: string;
  }
}

const apiClient = new APIClient<Anime>("/anime");


const useAnimes = () => {
  const animeQuery = useAnimeQueryStore((s) => s.animeQuery);

  return useInfiniteQuery<FetchResponse<Anime>, Error>({
    queryKey: ["animes", animeQuery ],
    queryFn: ({ pageParam = 1}) =>
      apiClient.getAll({
          params:{
          genres: animeQuery.genreId,
          status: animeQuery.status,
          order_by: animeQuery.sortOrder,
          q: animeQuery.searchText,
          page: pageParam
        } 
      }),   
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.pagination?.has_next_page ? allPages.length + 1 : undefined;
      },
    staleTime: ms("24h"), 
  });
};

export default useAnimes;

// const useAnimes = (
//   // add sort_order to fix unalign sorting
   
//   animeQuery: AnimeQuery
//   ) => 
//   useData<Anime>("anime", {
//   params:{
//     genres: animeQuery.genre?.mal_id, 
//     status: animeQuery.status,
//     order_by: animeQuery.sortOrder,
//     q: animeQuery.searchText}
// }, 
// [animeQuery]
// );

// export default useAnimes;