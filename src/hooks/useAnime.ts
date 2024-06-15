import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Anime {
  mal_id: number;
  title: string;
}
interface FetchGamesResponse {
  data: Anime[];
}

const useAnimes = () =>{
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController;

    apiClient
      .get<FetchGamesResponse>("anime", {signal: controller.signal})
      .then(({ data: res }) => setAnimes(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
    });
        
      
    return () => controller.abort();
  }, []);

  return {animes, error};
}
export default useAnimes;