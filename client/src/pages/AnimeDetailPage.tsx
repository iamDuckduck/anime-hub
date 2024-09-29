import {
  AspectRatio,
  Box,
  Card,
  Heading,
  SimpleGrid,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useAnime from "../hooks/useAnime";
import ExpandableText from "../component/ExpandableText";
import GameAtrributes from "../component/AnimeAttributes";
import AnimeTrailer from "../component/AnimeTrailer";
import AnimeScreenShots from "../component/AnimeScreenShots";
import useAnimeChara from "../hooks/useAnimeChara";
import ScrollableList from "../component/scrollableList";

const AnimeDetails = () => {
  console.log(import.meta.env.VITE_ENV);
  const { id } = useParams();
  const { data: anime, error, isLoading } = useAnime(id!);
  const { data: charas } = useAnimeChara(id!);

  // const gameAttributeList = ["genres", "score", "type", "studios"];

  if (isLoading) return <Spinner></Spinner>;
  if (error || !anime) throw error;

  return (
    <>
      <SimpleGrid padding={5} columns={{ base: 1, md: 2 }}>
        <Box>
          <Heading>{anime.data.title}</Heading>
          <ExpandableText children={anime.data.synopsis}></ExpandableText>
          <GameAtrributes anime={anime.data}></GameAtrributes>

          <ScrollableList characters={charas?.data}></ScrollableList>
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
