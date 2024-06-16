import useData from "./useData";

export interface status {
  mal_id: number;
  name: string;
}

const useGenres = () => useData<status>("/anime/status");

export default useGenres;
