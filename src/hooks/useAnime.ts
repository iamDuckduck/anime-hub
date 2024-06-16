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
  animeQuery: AnimeQuery
  ) => 
  useData<Anime>("anime", {
  params:{genres: animeQuery.genre?.mal_id, status: animeQuery.status}
}, 
[animeQuery]
);

export default useAnimes;