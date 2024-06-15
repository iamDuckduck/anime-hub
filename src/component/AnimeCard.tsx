import { Anime } from "../hooks/useAnime";
import { Card, CardBody, HStack, Heading, Image, Text } from "@chakra-ui/react";

interface Props {
  anime: Anime;
}

const AnimeCard = ({ anime }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={anime.images.jpg.image_url} />
      <CardBody>
        <Heading fontSize="2xl">{anime.title}</Heading>
        <HStack marginTop={3} justify="space-between">
          <Text>Released: {anime.year ? anime.year : "NA"}</Text>
          <Text>Rank: {anime.popularity}</Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default AnimeCard;
