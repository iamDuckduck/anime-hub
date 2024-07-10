import { useQuery } from "@tanstack/react-query";
import Anime from "../entities/Anime";
import APIClient, { FetchResponse } from "../services/api-client";
import { useSearchScheduleStore } from "../store";
import ms from "ms";

const apiClient = new APIClient<Anime>("/schedules");

const useSchedule = (day: string) => {
  const pageParam = useSearchScheduleStore((s) => s.page);

  return useQuery<FetchResponse<Anime>, Error>({
    queryKey: ["animes", { day: day, page: pageParam[day] }],
    queryFn: () =>
      apiClient.getAll({
        params: {
          filter: day,
          page: pageParam[day],
        },
      }),
    staleTime: ms("24h"),
  });
};
export default useSchedule;
