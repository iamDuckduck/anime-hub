import { Button, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import AnimeCard from "../component/AnimeCard/AnimeCard";
import AnimeCardContainer from "../component/AnimeCard/AnimeCardContainer";
import AnimeCardSkeleton from "../component/AnimeCard/AnimeCardSkeleton";
import useAnimes from "../hooks/useAnimes";
import useSchedule from "../hooks/useSchedule";
import { useSearchScheduleStore } from "../store";

interface Props {
  day: string;
}

const AnimeSchedule = ({ day }: Props) => {
  const { data: anime, isLoading, error } = useSchedule(day);
  const setPage = useSearchScheduleStore((s) => s.setPage);

  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error.message}</Text>;

  return (
    <>
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

        {anime?.data.map((anime, index) => (
          <AnimeCardContainer key={index}>
            <AnimeCard anime={anime}></AnimeCard>
          </AnimeCardContainer>
        ))}
      </SimpleGrid>

      {anime?.pagination?.has_next_page && (
        <HStack padding={2}>
          <Button
            isDisabled={anime?.pagination?.current_page === 1 || isLoading}
            onClick={() =>
              setPage(
                anime?.pagination ? anime?.pagination?.current_page - 1 : 1
              )
            }
          >
            Back
          </Button>
          <Button
            onClick={() =>
              setPage(
                anime?.pagination ? anime?.pagination?.current_page + 1 : 1
              )
            }
            isDisabled={
              anime?.pagination?.current_page === undefined || isLoading
            }
          >
            Next
          </Button>
        </HStack>
      )}
    </>
  );
};

export default AnimeSchedule;
