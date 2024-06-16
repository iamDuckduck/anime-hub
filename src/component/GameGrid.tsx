import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useAnimes from "../hooks/useAnime";
import AnimeCard from "./AnimeCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { Genre } from "../hooks/useGenres";

interface Props {
  selectedGenre: Genre | null;
  selectedStatus: string | null;
}

const GameGrid = ({ selectedGenre, selectedStatus }: Props) => {
  const { data, error, isLoading } = useAnimes(selectedGenre, selectedStatus);
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={3}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton></GameCardSkeleton>
            </GameCardContainer>
          ))}
        {data.map((anime) => (
          <GameCardContainer key={anime.mal_id}>
            <AnimeCard anime={anime}></AnimeCard>
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
