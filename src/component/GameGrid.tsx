import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAnimes from "../hooks/useAnime";
import AnimeCard from "./AnimeCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

const GameGrid = () => {
  const {
    data: animes,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAnimes();
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
