export interface UserFavoritePost {
  _id?: string;
  userId?: string;
  anime?: {
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
  favorite: boolean;
  updated_at?: Date;
}
