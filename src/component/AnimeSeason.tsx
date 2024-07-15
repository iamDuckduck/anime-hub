import { SimpleGrid } from "@chakra-ui/react";
import useSeasonAnimes from "../hooks/useSeasonAnimes";
import AnimeCard from "./AnimeCard/AnimeCard";
import AnimeCardContainer from "./AnimeCard/AnimeCardContainer";
import AnimeCardSkeleton from "./AnimeCard/AnimeCardSkeleton";

interface Props {
  year: string;
  season: string;
}
const AnimeSeason = ({ year, season }: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6];

  const { data, isLoading, error } = useSeasonAnimes(year, season);
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

      {data?.data.map((anime) => (
        <AnimeCardContainer key={anime.mal_id}>
          <AnimeCard anime={anime}></AnimeCard>
        </AnimeCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default AnimeSeason;
