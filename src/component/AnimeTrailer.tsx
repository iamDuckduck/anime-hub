import { Anime } from "../entities/Anime";
import { AspectRatio } from "@chakra-ui/react";
interface Props {
  anime: Anime;
}
const AnimeTrailer = ({ anime }: Props) => {
  const link = anime.trailer.embed_url;

  return link ? (
    <AspectRatio margin={5} marginTop={10} ratio={1} maxHeight="750px">
      <iframe src={link} allowFullScreen />
    </AspectRatio>
  ) : null;
};

export default AnimeTrailer;
