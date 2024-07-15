import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useAnimeSeaons from "../hooks/useSeasonAnimes";
import AnimeCard from "./AnimeCard/AnimeCard";
import AnimeCardContainer from "./AnimeCard/AnimeCardContainer";
import AnimeCardSkeleton from "./AnimeCard/AnimeCardSkeleton";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  year: string;
  season: string;
}
const AnimeSeason = ({ year, season }: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6];

  const {
    data: animes,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAnimeSeaons(year, season);

  if (error) return <Text>error</Text>;

  const fetchedGamesCount =
    animes?.pages.reduce((total, page) => (total += page.data.length), 0) || 0;

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
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={6}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <AnimeCardContainer key={skeleton}>
              <AnimeCardSkeleton></AnimeCardSkeleton>
            </AnimeCardContainer>
          ))}

        {animes?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((anime) => (
              <AnimeCardContainer key={anime.mal_id}>
                <AnimeCard anime={anime}></AnimeCard>
              </AnimeCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default AnimeSeason;
