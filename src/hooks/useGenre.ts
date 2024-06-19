import useGenres from "./useGenres";

const useGenre = (id?: number) =>{
    const { data: genres } = useGenres();

    return genres?.data.find(
        (genre) => genre.mal_id === id
    )?.name;
}

export default useGenre;