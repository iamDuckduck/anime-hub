import { Anime } from "../hooks/useAnime";
import { Card, CardBody, HStack, Heading, Image, Text } from "@chakra-ui/react";
import CriticScore from "./CriticScore";

interface Props {
  anime: Anime;
}

const AnimeCard = ({ anime }: Props) => {
  return (
    <Card>
      <Image src={anime.images.jpg.image_url} />
      <CardBody>
        <Heading fontSize="2xl">{anime.title}</Heading>
        <HStack marginTop={3} justifyContent="space-between">
          <Text>Released: {anime.year ? anime.year : "NA"}</Text>
          <Text>Rank: {anime.popularity}</Text>
          <CriticScore score={anime.score}></CriticScore>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default AnimeCard;
