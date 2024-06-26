import Anime from "../entities/Anime";
import { SimpleGrid, Text } from "@chakra-ui/react";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";

interface Props {
  anime: Anime;
}

const GameAttributes = ({ anime }: Props) => {
  return (
    <SimpleGrid columns={2} as="dl">
      <DefinitionItem term="Status">
        <Text>{anime.status}</Text>
      </DefinitionItem>
      <DefinitionItem term="Score">
        <CriticScore score={anime.score}></CriticScore>
      </DefinitionItem>
      <DefinitionItem term="Genres">
        {anime.genres?.map((g) => (
          <Text key={g.mal_id}>{g.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Type">
        <Text>{anime.type}</Text>
      </DefinitionItem>
    </SimpleGrid>
  );
};

export default GameAttributes;
