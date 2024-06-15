import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import useData from "./useData";

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


const useAnimes = () => useData<Anime>("anime");

export default useAnimes;