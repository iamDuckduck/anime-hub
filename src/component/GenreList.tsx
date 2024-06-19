import useGenres, { Genre } from "../hooks/useGenres";
import genrePicJson from "../assets/genresLogo.json";
import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";

interface GenrePic {
  [key: string]: string;
}
interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenreId?: number;
}

const genrePicData: GenrePic = genrePicJson;

const GenreList = ({ onSelectGenre, selectedGenreId }: Props) => {
  const { data: genres, error, isLoading } = useGenres();

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
                onClick={() => onSelectGenre(genre)}
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
