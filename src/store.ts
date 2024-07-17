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
  page: { [key: string]: number };
  kidContent: boolean;
  setPage: (updates: { [key: string]: number }) => void;
  setKidContent: (kid: boolean) => void;
}

export const useSearchScheduleStore = create<SearchScheduleStore>((set) => ({
  page: {
    Monday: 1,
    Tuesday: 1,
    Wednesday: 1,
    Thursday: 1,
    Friday: 1,
    Saturday: 1,
    Sunday: 1,
  },
  kidContent: false,
  setPage: (updates) =>
    set((state) => ({ ...state, page: { ...state.page, ...updates } })),
  setKidContent: (kid) => set(() => ({ kidContent: kid })),
}));

interface MenuBarToggleStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useMenuBarToggleStore = create<MenuBarToggleStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen: isOpen })),
}));

// if(process.env.NODE_ENV === 'development')
//     mountStoreDevtool('anime query store', useAnimeQueryStore)
export default useAnimeQueryStore;
