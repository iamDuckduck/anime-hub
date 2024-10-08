import { AnimeInList } from "./AnimeInDb";

export interface AnimeList {
  _id: string;
  userId: string;
  watchListIds: string[];
  status: string;
  anime: AnimeInList;
  currentEpisode: number;
}
