import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import genrePicJson from "../assets/genresLogo.json";
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

  if (error) return null;
  if (isLoading) return <Spinner></Spinner>;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
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
    </>
  );
};

export default GenreList;
