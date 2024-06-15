import { SimpleGrid, Text } from "@chakra-ui/react";
import useAnimes from "../hooks/useAnime";
import AnimeCard from "./AnimeCard";

const GameGrid = () => {
  const { animes, error } = useAnimes();
  console.log(animes);
  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={10}
      >
        {animes.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime}></AnimeCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
