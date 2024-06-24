import { create } from "zustand";


export interface AnimeQuery {
  genreId?: number;
  status?: string;
  sortOrder?: string;
  searchText?: string;
}

interface AnimeQueryStore {
  animeQuery: AnimeQuery;
  setGenreId: (genreId: number) => void;
  setStatus: (status: string) => void;
  setSortorder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
}


const useAnimeQueryStore = create<AnimeQueryStore>(set => ({
    animeQuery: {},
    setSearchText: (searchText) => set(()=>({ animeQuery:{searchText}})),
    setGenreId: (genreId) => set(store=>({animeQuery: {...store.animeQuery, genreId}})),
    setStatus: (status) => set(store=>({animeQuery: {...store.animeQuery, status}})),
    setSortorder: (sortOrder) => set(store=>({animeQuery:{...store.animeQuery, sortOrder}})),
}))


// if(process.env.NODE_ENV === 'development')
//     mountStoreDevtool('anime query store', useAnimeQueryStore) 
export default useAnimeQueryStore;