import { SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useAnimeSeasons from "../hooks/useSeasonAnimes";
import AnimeCard from "./AnimeCard/AnimeCard";
import AnimeCardContainer from "./AnimeCard/AnimeCardContainer";
import AnimeCardSkeleton from "./AnimeCard/AnimeCardSkeleton";
import Anime from "../entities/Anime";
import { useAnimeSeasonSortOrderStore } from "../store";

interface Props {
  year: string;
  season: string;
}
const AnimeSeason = ({ year, season }: Props) => {
  const sortOrder = useAnimeSeasonSortOrderStore((s) => s.sortOrder);
  const [isLoading, setIsLoading] = useState(true);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const {
    data: animes,
    error,
    fetchNextPage,
    hasNextPage,
  } = useAnimeSeasons(year, season);

  // loads all data from all pages
  useEffect(() => {
    //hasNextPage could be undefined at the begining
    if (hasNextPage) {
      fetchNextPage();
    }
    if (hasNextPage == false) {
      setIsLoading(false);
    }
  }, [animes]);

  // combine all existing data
  const allAnimes = animes?.pages.reduce((a: Anime[], page) => {
    return [...a, ...page.data];
  }, []);

  if (sortOrder == "Score") {
    allAnimes?.sort((a, b) => b.score - a.score);
  }

  if (sortOrder == "Rank") {
    allAnimes?.sort((a, b) => a.popularity - b.popularity);
  }

  if (error) return <Text>error</Text>;

  return (
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

      {!isLoading &&
        allAnimes?.map((anime) => (
          <AnimeCardContainer key={anime.mal_id}>
            <AnimeCard anime={anime}></AnimeCard>
          </AnimeCardContainer>
        ))}
    </SimpleGrid>
  );
};

export default AnimeSeason;
