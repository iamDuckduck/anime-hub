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
        <HStack justifyContent="space-between" marginBottom={3}>
          <Text>Released: {anime.year ? anime.year : "NA"}</Text>
          <Text>Rank: {anime.popularity}</Text>
          <CriticScore score={anime.score}></CriticScore>
        </HStack>
        <Heading fontSize="2xl">{anime.title}</Heading>
      </CardBody>
    </Card>
  );
};

export default AnimeCard;
