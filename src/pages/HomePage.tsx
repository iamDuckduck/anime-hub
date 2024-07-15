import { Box, HStack } from "@chakra-ui/react";
import AnimeGrid from "../component/AnimeGrid";
import AnimeHeading from "../component/AnimeHeading";
import SortDirection from "../component/Sorting/SortDirection";
import SortSelector from "../component/Sorting/SortSelector";
import StatusSelector from "../component/Sorting/StatusSelector";

const HomePage = () => {
  return (
    <>
      <Box>
        <AnimeHeading></AnimeHeading>
        <HStack marginBottom={5} wrap="wrap">
          <StatusSelector></StatusSelector>
          <SortSelector></SortSelector>
          <SortDirection></SortDirection>
        </HStack>
      </Box>
      <AnimeGrid></AnimeGrid>
    </>
  );
};

export default HomePage;
