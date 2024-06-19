import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useAnimes from "../hooks/useAnime";
import AnimeCard from "./AnimeCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { AnimeQuery } from "../App";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";

interface Props {
  animeQuery: AnimeQuery;
}

const GameGrid = ({ animeQuery }: Props) => {
  const {
    data: animes,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAnimes(animeQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];

  const fetchedGamesCount =
    animes?.pages.reduce((total, page) => (total += page.data.length), 0) || 0;
  if (error) return <Text>{error.message}</Text>;
  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount} //This is important field to render the next data
      next={fetchNextPage}
      // !!undefined --> false
      hasMore={!!hasNextPage}
      loader={<Spinner></Spinner>}
    >
      <SimpleGrid
        padding="10px"
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton></GameCardSkeleton>
            </GameCardContainer>
          ))}

        {animes?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((anime) => (
              <GameCardContainer key={anime.mal_id}>
                <AnimeCard anime={anime}></AnimeCard>
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default GameGrid;
