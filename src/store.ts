import { create } from "zustand";

export interface AnimeQuery {
  genreId?: number;
  status?: string;
  sortOrder?: string;
  searchText?: string;
  sortDirection?: "desc" | "asc";
}

interface AnimeQueryStore {
  animeQuery: AnimeQuery;
  setGenreId: (genreId: number) => void;
  setStatus: (status: string) => void;
  setSortorder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
  setSortDirection: (sort: "desc" | "asc") => void;
}

const useAnimeQueryStore = create<AnimeQueryStore>((set) => ({
  animeQuery: {},
  setSearchText: (searchText) => set(() => ({ animeQuery: { searchText } })),
  setGenreId: (genreId) =>
    set((store) => ({ animeQuery: { ...store.animeQuery, genreId } })),
  setStatus: (status) =>
    set((store) => ({ animeQuery: { ...store.animeQuery, status } })),
  setSortorder: (sortOrder) =>
    set((store) => ({ animeQuery: { ...store.animeQuery, sortOrder } })),
  setSortDirection: (sortDirection) =>
    set((store) => ({ animeQuery: { ...store.animeQuery, sortDirection } })),
}));

interface SearchBarAnimeStore {
  searchText: String;
  setSearchText: (text: string) => void;
}

export const useSearchBarAnimeStore = create<SearchBarAnimeStore>((set) => ({
  searchText: "",
  setSearchText: (text) => set(() => ({ searchText: text })),
}));

interface SearchScheduleStore {
  page: number;
  setPage: (text: number) => void;
}

export const useSearchScheduleStore = create<SearchScheduleStore>((set) => ({
  page: 1,
  setPage: (p) => set(() => ({ page: p })),
}));

// if(process.env.NODE_ENV === 'development')
//     mountStoreDevtool('anime query store', useAnimeQueryStore)
export default useAnimeQueryStore;
