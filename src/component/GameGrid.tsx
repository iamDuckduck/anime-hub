import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Text } from "@chakra-ui/react";

interface Anime {
  mal_id: number;
  title: string;
}
interface FetchGamesResponse {
  data: Anime[];
}

const GameGrid = () => {
  const [Animes, setAnimes] = useState<Anime[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("anime")
      .then(({ data: res }) => setAnimes(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {Animes.map((anime) => (
          <li key={anime.mal_id}>{anime.title}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
