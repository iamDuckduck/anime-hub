import { Heading } from "@chakra-ui/react";
import { AnimeQuery } from "../App";

interface Props {
  animeQuery: AnimeQuery;
}
const GameHeading = ({ animeQuery }: Props) => {
  function capFirst(heading: string | null) {
    if (typeof heading == "string")
      return heading.charAt(0).toUpperCase() + heading.slice(1);
  }

  const heading = `${capFirst(animeQuery?.status) || ""} ${
    animeQuery.genre?.name || ""
  } Animes`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
