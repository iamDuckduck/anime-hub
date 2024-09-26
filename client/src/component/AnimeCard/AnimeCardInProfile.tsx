import { Card, CardBody, HStack, Heading, Image, Text } from "@chakra-ui/react";
import CriticScore from "../CriticScore";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { AnimeList } from "../../entities/AnimeList";
import { useQueryClient } from "@tanstack/react-query";
import useAnimeListPut from "../../hooks/useAnimeListPut";
import useFavorite from "../../hooks/useUserFavorite";
import { UserFavorite } from "../../entities/UserFavorite";
import useUserFavoritePut from "../../hooks/useUserFavoritePut";

interface Props {
  userFavorite: UserFavorite;
}

const animeCardInProfile = ({ userFavorite }: Props) => {
  const queryClient = useQueryClient(); // Get the query client to invalid query
  const navigate = useNavigate(); // Initialize navigate

  const { mutate: userFavoritePut } = useUserFavoritePut(
    queryClient,
    userFavorite?._id || "",
    navigate
  ); //patch the user animeList data

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
          as={userFavorite?.favorite ? FaHeart : FaRegHeart}
          color={userFavorite?.favorite ? "red.500" : "white"}
          boxSize={5}
          onClick={() =>
            userFavoritePut({
              favorite: !userFavorite?.favorite,
              updated_at: new Date(),
            })
          }
        />

        <Image
          src={userFavorite.anime?.imageUrl}
          width="100%"
          objectFit="cover"
          borderRadius="10px 10px 0 0"
        />

        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            <Text>
              Released:{" "}
              {userFavorite.anime?.year ? userFavorite.anime?.year : "NA"}
            </Text>

            <CriticScore score={userFavorite.anime?.score || 0}></CriticScore>
          </HStack>
          <Heading fontSize="2xl">
            <Link
              to={`/animes/${userFavorite.anime?.animeId}/${userFavorite.anime?.title}`}
            >
              {userFavorite.anime?.title}
            </Link>
          </Heading>
        </CardBody>
      </Card>
    </>
  );
};

export default animeCardInProfile;
