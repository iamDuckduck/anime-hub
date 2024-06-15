import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useAnimes from "../hooks/useAnime";
import AnimeCard from "./AnimeCard";
import GameCardSkeleton from "./GameCardSkeleton";

const GameGrid = () => {
  const { animes, error, isLoading } = useAnimes();
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={10}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardSkeleton key={skeleton}></GameCardSkeleton>
          ))}
        {animes.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime}></AnimeCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
