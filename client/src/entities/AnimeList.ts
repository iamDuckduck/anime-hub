export interface AnimeList {
  _id?: string;
  userId: string;
  watchListIds: string[];
  status: string;
  anime: {
    animeId: string;
    format: string;
    title: string;
    imageUrl: string;
    genre: string;
    totalEpisodes: number;
    score: number;
    year: number;
    status: string;
  };
  currentEpisode: number;
  favorite: boolean;
}
