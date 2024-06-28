import { Box, HStack, Heading, Img, Spinner, Text } from "@chakra-ui/react";
import useSearchBarAnime from "../hooks/useSearchBarAnime";

const SearchDropDown = () => {
  const { data: animes, error, isLoading } = useSearchBarAnime();

  if (isLoading) return <Spinner></Spinner>;

  if (error) throw error;

  return (
    <Box
      position="absolute"
      marginTop="10px"
      width="100%"
      backgroundColor="#3b3b3b"
      padding={5}
      borderRadius={20}
      zIndex={1}
      maxH="300px"
      overflowY="auto"
    >
      <Heading>Animes</Heading>
      {animes?.data.map((anime, index) => (
        <HStack paddingBottom={3} key={index}>
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
