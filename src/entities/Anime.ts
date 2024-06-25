import { Genre } from "./Genre";
import { Trailer } from "./Trailer";
import { images } from "./images";
import { Studio } from "./studio";

export interface Anime {
  mal_id: number;
  title: string;
  images: images;
  popularity: number;
  year: number;
  score: number;
  synopsis: string;
  genres: Genre[];
  type: string;
  studios: Studio[];
  status: string;
  trailer: Trailer;
}
