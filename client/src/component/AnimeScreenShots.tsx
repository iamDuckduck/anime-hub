import useAnimeScreenShot from "../hooks/useAnimeScreenShot";
import { SimpleGrid, Spinner, Image } from "@chakra-ui/react";
interface Props {
  animeId: number;
}
const AnimeScreenShots = ({ animeId }: Props) => {
  const { data, isLoading, error } = useAnimeScreenShot(String(animeId));
  const imageList = data?.data;

  if (isLoading) return <Spinner></Spinner>;

  if (error) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10px" padding="20px">
      {imageList?.map((image) => (
        <Image
          key={image.jpg.large_image_url}
          src={image.jpg.large_image_url}
          width="100%"
        ></Image>
      ))}
    </SimpleGrid>
  );
};

export default AnimeScreenShots;
