import { AnimeList } from "../entities/AnimeList";
import {
  Flex,
  Heading,
  Box,
  Grid,
  GridItem,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";
import UserProfileList from "./ProfileAnimeList";
import { useState } from "react";

//refactor is needed, should create a component that pass one animeList
interface Props {
  animeLists: AnimeList[] | undefined;
}
const UserProfileLists = ({ animeLists }: Props) => {
  const statuses = [
    "Watching",
    "Rewatching",
    "Completed",
    "Paused",
    "Dropped",
    "Planning",
  ];

  const [selectedStauts, setSelectedStauts] = useState("");
  const uniqueStatusValues =
    selectedStauts != ""
      ? [selectedStauts]
      : [...new Set(animeLists?.map((item) => item.status))];

  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="aside">
        {statuses.map((status, index) => (
          <List padding={2} key={index}>
            <Button
              whiteSpace="normal"
              textAlign="left"
              fontWeight={status === selectedStauts ? "bold" : "normal"}
              onClick={() =>
                selectedStauts == status
                  ? setSelectedStauts("")
                  : setSelectedStauts(status)
              }
              fontSize="lg"
              variant="link"
            >
              {status}
            </Button>
          </List>
        ))}
      </GridItem>
      <GridItem area="main">
        {uniqueStatusValues.map((status) => (
          <Flex key={status} flexDirection="column">
            <Heading paddingY={5} fontSize={26}>
              {status}
            </Heading>
            <Box>
              <Grid fontSize={18} templateColumns="40%  repeat(2, 1fr)" gap={6}>
                <GridItem textAlign="center">Title</GridItem>
                <GridItem textAlign="center">Progress</GridItem>
                <GridItem textAlign="center">Type</GridItem>
              </Grid>
              {animeLists
                ?.filter((animelist) => animelist.status == status)
                .map((animeList) => (
                  <Box key={animeList._id}>
                    <UserProfileList animeList={animeList}></UserProfileList>
                  </Box>
                ))}
            </Box>
          </Flex>
        ))}
      </GridItem>
    </Grid>
  );
};

export default UserProfileLists;
