import { Box, HStack, Heading, Img, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useSearchBarAnime from "../hooks/useSearchBarAnime";

const SearchAnimeResult = () => {
  const { data: animes, error, isLoading } = useSearchBarAnime();

  if (error) throw error;

  return (
    <>
      <Heading>Animes</Heading>

      {isLoading && <Spinner></Spinner>}

      {animes?.data.map((anime, index) => (
        <Link to={`/animes/${anime.mal_id}/${anime.title}`} key={index}>
          <Box
            padding={5}
            _hover={{
              backgroundColor: "#4a4a4a",
              cursor: "pointer",
              borderRadius: "10px",
            }}
          >
            <HStack key={index}>
              <Img
                boxSize="100px"
                objectFit="cover"
                borderRadius={5}
                src={anime.images.jpg.image_url}
              ></Img>
              <Text fontSize="36px">{anime.title}</Text>
            </HStack>
          </Box>
        </Link>
      ))}
    </>
  );
};

export default SearchAnimeResult;
