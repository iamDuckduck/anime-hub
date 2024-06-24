import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useAnime from "../hooks/useAnime";

const AnimeDetails = () => {
  const { id } = useParams();
  const { data: anime, error, isLoading } = useAnime(id!);

  if (isLoading) return <Spinner></Spinner>;

  if (error || !anime) throw error;

  return (
    <>
      <Heading>{anime.data.title}</Heading>
      <Text>{anime.data.synopsis}</Text>
    </>
  );
};

export default AnimeDetails;
