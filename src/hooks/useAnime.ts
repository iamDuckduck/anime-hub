import { useQuery } from '@tanstack/react-query';
import { Anime } from './useAnimes';
import ms from 'ms';
import APIClient from '../services/api-client';


const apiClient = new APIClient<Anime>('/anime');

const useAnime = (id: string) => {
    return useQuery({
        queryKey: ["anime", id],
        queryFn: ()=>apiClient.get(id),
        staleTime: ms("1h"),
      });
}

export default useAnime