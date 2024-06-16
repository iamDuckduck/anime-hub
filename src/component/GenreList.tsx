import useGenres from "../hooks/useGenres";
import genrePicJson from "../assets/genresLogo.json";
import { HStack, Image, List, ListItem, Text } from "@chakra-ui/react";

interface GenrePic {
  [key: string]: string;
}

const genrePicData: GenrePic = genrePicJson;

const GenreList = () => {
  const { data } = useGenres();

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
            <Text fontSize="lg">{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
