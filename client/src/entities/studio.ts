import Genre from "./Genre";

export default interface Studio extends Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
