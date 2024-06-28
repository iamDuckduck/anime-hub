import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SearchAnimeResult from "./SearchAnimeResult";

const SearchDropDown = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the visibility state for the fade-in effect
    setIsVisible(true);
  }, []);

  return (
    <Box
      position="absolute"
      marginTop="10px"
      width="100%"
      backgroundColor="#121212"
      padding={5}
      borderRadius={20}
      zIndex={1}
      maxH="400px"
      overflowY="auto"
      outline="2px solid #4a4a4a"
      opacity={isVisible ? 1 : 0} // Control visibility for fade effect
      transition="opacity 0.3s ease-in-out" // Fade transition
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <SearchAnimeResult></SearchAnimeResult>
    </Box>
  );
};

export default SearchDropDown;
