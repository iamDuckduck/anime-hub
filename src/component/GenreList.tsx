import {
  Box,
  Button,
  Collapse,
  HStack,
  IconButton,
  Image,
  List,
  ListItem,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import genrePicJson from "../assets/genresLogo.json";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import useGenres from "../hooks/useGenres";
import useAnimeQueryStore from "../store";

interface GenrePic {
  [key: string]: string;
}

const genrePicData: GenrePic = genrePicJson;

const GenreList = () => {
  const { data: genres, error, isLoading } = useGenres();
  const selectedGenreId = useAnimeQueryStore((s) => s.animeQuery.genreId);
  const setSelectedGenreId = useAnimeQueryStore((s) => s.setGenreId);

  const { isOpen, onToggle } = useDisclosure();

  if (error) return null;
  if (isLoading) return <Spinner></Spinner>;

  return (
    <>
      <HStack>
        <Box fontSize="2xl">Genres</Box>
        <IconButton
          onClick={onToggle}
          variant="link"
          colorScheme="white"
          aria-label="Call Sage"
          fontSize="25px"
          icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        />
      </HStack>

      <Collapse in={isOpen}>
        <List>
          {genres?.data.map((genre) => (
            <ListItem key={genre.mal_id} paddingY="5px">
              <HStack>
                <Image
                  boxSize="32px"
                  borderRadius={8}
                  objectFit="cover"
                  src={genrePicData[genre.name]}
                ></Image>
                <Button
                  whiteSpace="normal"
                  textAlign="left"
                  fontWeight={
                    genre.mal_id === selectedGenreId ? "bold" : "normal"
                  }
                  onClick={() => setSelectedGenreId(genre.mal_id)}
                  fontSize="lg"
                  variant="link"
                >
                  {genre.name}
                </Button>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default GenreList;
