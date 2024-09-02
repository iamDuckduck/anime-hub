import images from "./Image";

export default interface AnimeChara {
  character: {
    mal_id: number;
    images: images;
    name: string;
  };
}
