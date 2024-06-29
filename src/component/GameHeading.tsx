import { Heading } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import useAnimeQueryStore from "../store";

const GameHeading = () => {
  const genreId = useAnimeQueryStore((s) => s.animeQuery.genreId);
  const genre = useGenre(genreId);

  const status = useAnimeQueryStore((s) => s.animeQuery.status);

  function capFirst(heading: string | undefined) {
    if (typeof heading == "string")
      return heading.charAt(0).toUpperCase() + heading.slice(1);
  }

  const heading = `${capFirst(status) || ""} ${genre || ""} Animes`;

  return (
    <Heading as="h1" marginBottom={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
