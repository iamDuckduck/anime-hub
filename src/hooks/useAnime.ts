import { AnimeQuery } from "../App";
import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";


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


const useAnimes = (animeQuery: AnimeQuery) => {
  // add sort_order to fix unalign sorting
  const params = {
    genres: animeQuery.genre?.mal_id,
    status: animeQuery.status,
    order_by: animeQuery.sortOrder,
    q: animeQuery.searchText,
  };

  return useQuery<FetchResponse<Anime>, Error>({
    queryKey: ["animes", animeQuery ],
    queryFn: () =>
      apiClient.getAll({
          params:{
          genres: animeQuery.genre?.mal_id,
          status: animeQuery.status,
          order_by: animeQuery.sortOrder,
          q: animeQuery.searchText,
        } 
      }),   
    staleTime: 60 * 1000,
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