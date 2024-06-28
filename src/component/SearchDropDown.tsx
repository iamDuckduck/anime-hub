import { Box, HStack, Img, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import useSearchBarAnime from "../hooks/useSearchBarAnime";

const SearchDropDown = () => {
  const { data: animes, error, isLoading } = useSearchBarAnime();

  if (isLoading) return <Spinner></Spinner>;

  if (error) throw error;

  return (
    <Box
      position="absolute"
      width="100%"
      backgroundColor="#3b3b3b"
      padding={3}
      borderRadius="0 0 20px 20px"
      zIndex={1}
      maxH="300px"
      overflowY="auto"
    >
      {animes?.data.map((anime) => (
        <HStack padding={3} key={anime.mal_id}>
          <Img
            boxSize="70px"
            objectFit="cover"
            src={anime.images.jpg.image_url}
          ></Img>
          <Text>{anime.title}</Text>
        </HStack>
      ))}
    </Box>
  );
};

export default SearchDropDown;
