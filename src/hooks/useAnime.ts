import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Anime {
  mal_id: number;
  title: string;
  images: images;
  popularity: number;
  year: number;
  score:number;
}

interface images{
  jpg: {
    image_url: string;
  };
  wedp:{
     image_url: string;
  }
}

interface FetchGamesResponse {
  data: Anime[];
}

const useAnimes = () =>{
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController;

    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("anime", {signal: controller.signal})
      .then(({ data: res }) => {
        setAnimes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
    });
        
      
    return () => controller.abort();
  }, []);

  return {animes, error, isLoading};
}
export default useAnimes;