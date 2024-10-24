import Genre from "./Genre";
import images from "./Image";
import Trailer from "./Trailer";
import Studio from "./studio";

export default interface Anime {
  mal_id: number;
  images: images;
  title: string;
  popularity: number;
  year: number;
  score: number;
  synopsis: string;
  genres: Genre[];
  type: string;
  studios: Studio[];
  status: string;
  trailer: Trailer;
  episodes: number;
}
