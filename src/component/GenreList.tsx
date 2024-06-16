import useGenres, { Genre } from "../hooks/useGenres";
import genrePicJson from "../assets/genresLogo.json";
import {
  Button,
  HStack,
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
}

const genrePicData: GenrePic = genrePicJson;

const GenreList = ({ onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner></Spinner>;

  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.mal_id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={genrePicData[genre.name]}
            ></Image>
            <Button
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
  );
};

export default GenreList;
