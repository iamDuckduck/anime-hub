import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useAnimes from "../hooks/useAnime";
import AnimeCard from "./AnimeCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { AnimeQuery } from "../App";

interface Props {
  animeQuery: AnimeQuery;
}

const GameGrid = ({ animeQuery }: Props) => {
  const { data, error, isLoading } = useAnimes(animeQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error}</Text>;
  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={6}
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
