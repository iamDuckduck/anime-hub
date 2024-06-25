import { Heading, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useAnime from "../hooks/useAnime";
import ExpandableText from "../component/ExpandableText";
import GameAtrributes from "../component/GameAttributes";

const AnimeDetails = () => {
  const { id } = useParams();
  const { data: anime, error, isLoading } = useAnime(id!);

  // const gameAttributeList = ["genres", "score", "type", "studios"];

  if (isLoading) return <Spinner></Spinner>;
  if (error || !anime) throw error;

  return (
    <>
      <Heading>{anime.data.title}</Heading>
      <ExpandableText children={anime.data.synopsis}></ExpandableText>
      <GameAtrributes anime={anime.data}></GameAtrributes>

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
