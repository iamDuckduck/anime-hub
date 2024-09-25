export interface AnimeListPutRequest {
  userId?: string;
  watchListIds?: string[];
  status?: string;
  currentEpisode?: number;
  favorite?: boolean;
  updated_at: Date;
  expectedFinishDate?: Date | null;
}
