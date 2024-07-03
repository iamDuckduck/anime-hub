import { Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import AnimeCard from "../component/AnimeCard/AnimeCard";
import AnimeCardContainer from "../component/AnimeCard/AnimeCardContainer";
import useSchedule from "../hooks/useSchedule";
import InfiniteScroll from "react-infinite-scroll-component";
import AnimeCardSkeleton from "../component/AnimeCard/AnimeCardSkeleton";
import React from "react";

interface Props {
  day: string;
}

const AnimeSchedule = ({ day }: Props) => {
  const {
    data: animes,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useSchedule(day);

  const skeletons = [1, 2, 3, 4, 5, 6];

  const fetchedGamesCount =
    animes?.pages.reduce((total, page) => (total += page.data.length), 0) || 0;

  if (error) return <Text>{error.message}</Text>;

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={!!hasNextPage} // !!undefined --> false
      loader={<Spinner></Spinner>}
    >
      <Heading>{day}</Heading>

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

export default AnimeSchedule;
