import { images } from "./images";



export interface Anime {
  mal_id: number;
  title: string;
  images: images;
  popularity: number;
  year: number;
  score: number;
  synopsis: string;
}
