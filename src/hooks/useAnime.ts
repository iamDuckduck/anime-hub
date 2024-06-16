import useData from "./useData";
import { AnimeQuery } from "../App";

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


const useAnimes = (
  // add sort_order to fix unalign sorting
   
  animeQuery: AnimeQuery
  ) => 
  useData<Anime>("anime", {
  params:{
    genres: animeQuery.genre?.mal_id, 
    status: animeQuery.status,
    order_by: animeQuery.sortOrder,
    q: animeQuery.searchText}
}, 
[animeQuery]
);

export default useAnimes;