import { Card, CardBody, HStack, Heading, Image, Text } from "@chakra-ui/react";
import CriticScore from "../CriticScore";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { AnimeList } from "../../entities/AnimeList";
import { useQueryClient } from "@tanstack/react-query";
import useAnimeListPut from "../../hooks/useAnimeListPut";

interface Props {
  animeList: AnimeList;
}

const animeCardInProfile = ({ animeList }: Props) => {
  const queryClient = useQueryClient(); // Get the query client to invalid query
  const navigate = useNavigate(); // Initialize navigate

  const { mutate: animeListPut } = useAnimeListPut(
    queryClient,
    animeList?._id || "",
    navigate
  );

  return (
    <>
      <Card position="relative">
        <Icon
          _hover={{
            transform: "scale(1.03)",
            transition: "transform .15s ease-in",
            cursor: "pointer",
          }}
          position="absolute"
          right="2"
          top="2"
          as={animeList?.favorite ? FaHeart : FaRegHeart}
          color={animeList?.favorite ? "red.500" : "white"}
          boxSize={5}
          onClick={() =>
            animeListPut({
              favorite: !animeList?.favorite,
              updated_at: new Date(),
            })
          }
        />

        <Image
          src={animeList.anime.imageUrl}
          width="100%"
          objectFit="cover"
          borderRadius="10px 10px 0 0"
        />

        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            <Text>
              Released: {animeList.anime.year ? animeList.anime.year : "NA"}
            </Text>

            <CriticScore score={animeList.anime.score}></CriticScore>
          </HStack>
          <Heading fontSize="2xl">
            <Link
              to={`/animes/${animeList.anime.animeId}/${animeList.anime.title}`}
            >
              {animeList.anime.title}
            </Link>
          </Heading>
        </CardBody>
      </Card>
    </>
  );
};

export default animeCardInProfile;
