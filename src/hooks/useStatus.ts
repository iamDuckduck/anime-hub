import useData from "./useData";

const useGenres = () => useData<string>("/anime/status");

export default useGenres;
