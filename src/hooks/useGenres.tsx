import genres from "../data/genres.json";

export interface Genre {
  mal_id: number;
  name: string;
}

const useGenres = () => ({ data: genres.data, isLoading: false, error: null });

export default useGenres;
