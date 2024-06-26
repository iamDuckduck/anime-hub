import Anime from "../entities/Anime";
import { Card, CardBody, HStack, Heading, Image, Text } from "@chakra-ui/react";
import CriticScore from "./CriticScore";
import { Link, useNavigate } from "react-router-dom";

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
        <Heading fontSize="2xl">
          <Link to={`/animes/${anime.mal_id}/${anime.title}`}>
            {anime.title}
          </Link>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default AnimeCard;
