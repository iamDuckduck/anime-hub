import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAnimes from "../hooks/useAnimes";
import AnimeCard from "./AnimeCard/AnimeCard";
import AnimeCardContainer from "./AnimeCard/AnimeCardContainer";
import AnimeCardSkeleton from "./AnimeCard/AnimeCardSkeleton";
import useAnimeList from "../hooks/useAnimeList";
import { useIsLoggedInStore } from "../store";
import useFavorite from "../hooks/useUserFavorite";

const AnimeGrid = () => {
  const skeletons = [1, 2, 3, 4, 5, 6];

  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);
  const { data: userAnimeList } = useAnimeList(isLoggedIn); // only fetch when logged in
  const { data: userFavorite } = useFavorite(isLoggedIn); // only fetch when logged in
  const {
    data: animes,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useAnimes();

  // it filters the duplicate anime from useAnimes
  const filteredPage = {
    ...animes,
    pages: animes?.pages.map((page) => ({
      ...page,
      data: page.data.filter((value, index, self) => {
        return self.findIndex((obj) => obj.mal_id === value.mal_id) === index;
      }),
    })),
  };

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
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={6}>
        {isLoading &&
          skeletons.map((skeleton) => (
            <AnimeCardContainer key={skeleton}>
              <AnimeCardSkeleton></AnimeCardSkeleton>
            </AnimeCardContainer>
          ))}

        {filteredPage.pages &&
          filteredPage?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((anime) => (
                <AnimeCardContainer key={anime.mal_id}>
                  <AnimeCard
                    anime={anime}
                    userAnimeList={userAnimeList}
                    userFavorite={userFavorite}
                  ></AnimeCard>
                </AnimeCardContainer>
              ))}
            </React.Fragment>
          ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default AnimeGrid;
