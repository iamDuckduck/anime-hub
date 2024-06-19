import { Heading } from "@chakra-ui/react";
import { AnimeQuery } from "../App";
import useGenres from "../hooks/useGenres";

interface Props {
  animeQuery: AnimeQuery;
}

const GameHeading = ({ animeQuery }: Props) => {
  const { data: genres } = useGenres();

  const genreName = genres.data.find(
    (genre) => genre.mal_id === animeQuery.genreId
  )?.name;

  function capFirst(heading: string | null) {
    if (typeof heading == "string")
      return heading.charAt(0).toUpperCase() + heading.slice(1);
  }

  const heading = `${capFirst(animeQuery?.status) || ""} ${
    genreName || ""
  } Animes`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
