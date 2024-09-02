import { useRef } from "react";
import AnimeChara from "../entities/AnimeChara";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Box, Image, Heading } from "@chakra-ui/react";

interface ScrollableListProps {
  characters: AnimeChara[] | undefined;
}

const ScrollableList: React.FC<ScrollableListProps> = ({ characters }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount =
        direction === "left"
          ? -containerRef.current.offsetWidth
          : containerRef.current.offsetWidth;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Flex flexDirection="column">
      {/* <Heading alignSelf="center" paddingBottom={10}>
        Characters
      </Heading> */}

      <Flex align="center">
        <IconButton
          aria-label="Scroll left"
          icon={<ArrowLeftIcon />}
          onClick={() => scroll("left")}
        />
        <Box
          ref={containerRef}
          overflowX="auto"
          whiteSpace="nowrap"
          width="100%"
          px={2}
          mx={2}
        >
          {characters?.map((char) => (
            <Box
              key={char.character.mal_id}
              display="inline-block"
              mx={2}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              width="150px"
            >
              <Image
                src={char.character.images.jpg.image_url}
                //   alt={char.character.mal_id}
                width="100%"
                height="150px"
                objectFit="cover"
              />
              <Box p={2}>
                <Box fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
                  {char.character.name}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <IconButton
          aria-label="Scroll right"
          icon={<ArrowRightIcon />}
          onClick={() => scroll("right")}
        />
      </Flex>
    </Flex>
  );
};

export default ScrollableList;
