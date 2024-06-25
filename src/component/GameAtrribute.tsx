import { Box, Text } from "@chakra-ui/react";
import { Anime } from "../entities/Anime";
import CriticScore from "./CriticScore";

interface Props {
  attributeName: string;
  anime: Anime;
}
const GameAtrribute = ({ attributeName, anime }: Props) => {
  const data =
    attributeName in anime ? anime[attributeName as keyof Anime] : undefined;

  return (
    <Box>
      <Text color="Gray" fontWeight="bold" fontSize="20px">
        {attributeName}
      </Text>

      {Array.isArray(data)
        ? data.map((genre) => <Text key={genre.mal_id}>{genre.name}</Text>)
        : null}

      {typeof data === "number" && attributeName === "score" ? (
        <CriticScore score={data}></CriticScore>
      ) : null}

      {typeof data === "string" ? <Text key={data}>{data}</Text> : null}
    </Box>
  );
};

export default GameAtrribute;
