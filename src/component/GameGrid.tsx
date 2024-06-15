import { Text } from "@chakra-ui/react";
import useAnimes from "../hooks/useAnime";

const GameGrid = () => {
  const { animes, error } = useAnimes();

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {animes.map((anime) => (
          <li key={anime.mal_id}>{anime.title}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
