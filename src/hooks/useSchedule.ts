import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import Anime from "../entities/Anime";
import APIClient, { FetchResponse } from "../services/api-client";


const apiClient = new APIClient<Anime>("/schedules");


const useSchedule = (day:string) => {

  return useInfiniteQuery<FetchResponse<Anime>, Error>({
    queryKey: ["animes", day ],
    queryFn: ({ pageParam = 1}) =>
      apiClient.getAll({
          params:{
            filter: day,
            page: pageParam
        } 
      }),   
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.pagination?.has_next_page ? allPages.length + 1 : undefined;
      },
    staleTime: ms("24h"), 
  });
};

export default useSchedule;

