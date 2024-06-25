import {
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useAnime from "../hooks/useAnime";
import ExpandableText from "../component/ExpandableText";
import GameAtrributes from "../component/GameAttributes";
import AnimeTrailer from "../component/AnimeTrailer";
import AnimeScreenShots from "../component/AnimeScreenShots";

const AnimeDetails = () => {
  const { id } = useParams();
  const { data: anime, error, isLoading } = useAnime(id!);

  // const gameAttributeList = ["genres", "score", "type", "studios"];

  if (isLoading) return <Spinner></Spinner>;
  if (error || !anime) throw error;

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Box>
          <Heading>{anime.data.title}</Heading>
          <ExpandableText children={anime.data.synopsis}></ExpandableText>
          <GameAtrributes anime={anime.data}></GameAtrributes>
        </Box>
        <Box>
          <AnimeTrailer anime={anime.data}></AnimeTrailer>
          <AnimeScreenShots animeId={anime.data.mal_id}></AnimeScreenShots>
        </Box>
      </SimpleGrid>

      {/* <SimpleGrid padding="10px" columns={2} spacing={6}>
        {gameAttributeList.map((attribute) => (
          <GameAtrribute
            key={attribute}
            attributeName={attribute}
            anime={anime.data}
          ></GameAtrribute>
        ))}
      </SimpleGrid> */}
    </>
  );
};

export default AnimeDetails;
