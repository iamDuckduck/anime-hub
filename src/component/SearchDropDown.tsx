import { Box, HStack, Heading, Img, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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
        <Link to={`/animes/${anime.mal_id}/${anime.title}`} key={index}>
          <Box
            paddingBottom={3}
            _hover={{
              backgroundColor: "#4a4a4a",
              cursor: "pointer",
              borderRadius: "10px",
            }}
          >
            <HStack key={index}>
              <Img
                boxSize="70px"
                objectFit="cover"
                src={anime.images.jpg.image_url}
              ></Img>
              <Text>{anime.title}</Text>
            </HStack>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default SearchDropDown;
