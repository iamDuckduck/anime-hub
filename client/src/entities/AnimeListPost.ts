import { AnimeInList } from "./AnimeInDb";

export interface AnimeListPost {
  watchListIds: string[];
  status: string;
  anime: AnimeInList;
  currentEpisode: number;
}
