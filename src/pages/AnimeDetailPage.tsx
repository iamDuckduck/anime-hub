import { Button, Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useAnime from "../hooks/useAnime";
import { useState } from "react";
import ExpandableText from "../component/ExpandableText";

const AnimeDetails = () => {
  const { id } = useParams();
  const { data: anime, error, isLoading } = useAnime(id!);

  if (isLoading) return <Spinner></Spinner>;
  if (error || !anime) throw error;

  return (
    <>
      <Heading>{anime.data.title}</Heading>
      <ExpandableText children={anime.data.synopsis}></ExpandableText>
    </>
  );
};

export default AnimeDetails;
