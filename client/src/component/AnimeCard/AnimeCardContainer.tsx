import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const AnimeCardContainer = ({ children }: Props) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
        cursor: "pointer",
      }}
      width="100%"
      // borderRadius={10}
      // overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default AnimeCardContainer;
