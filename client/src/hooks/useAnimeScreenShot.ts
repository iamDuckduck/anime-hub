import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import ScreenShot from '../entities/ScreentShot';
import APIClient from '../services/api-client';




const useAnimeScreenShot = (id: string) => {
    const apiClient = new APIClient<ScreenShot>(`/anime/${id}/pictures`);
    return useQuery({
        queryKey: ["animePic", id],
        queryFn: apiClient.getAll,
        staleTime: ms("1h"),
      });
}

export default useAnimeScreenShot