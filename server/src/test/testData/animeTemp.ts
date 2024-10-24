export const tempAnime = {
  mal_id: 54309,
  images: {
    jpg: {
      image_url: "https://cdn.myanimelist.net/images/anime/1739/140995.jpg",
      small_image_url:
        "https://cdn.myanimelist.net/images/anime/1739/140995t.jpg",
      large_image_url:
        "https://cdn.myanimelist.net/images/anime/1739/140995l.jpg",
    },
    webp: {
      image_url: "https://cdn.myanimelist.net/images/anime/1739/140995.webp",
      small_image_url:
        "https://cdn.myanimelist.net/images/anime/1739/140995t.webp",
      large_image_url:
        "https://cdn.myanimelist.net/images/anime/1739/140995l.webp",
    },
  },
  trailer: {
    youtube_id: "pGoc4_imTi0",
    url: "https://www.youtube.com/watch?v=pGoc4_imTi0",
    embed_url:
      "https://www.youtube.com/embed/pGoc4_imTi0?enablejsapi=1&wmode=opaque&autoplay=1",
    images: {
      image_url: "https://img.youtube.com/vi/pGoc4_imTi0/default.jpg",
      small_image_url: "https://img.youtube.com/vi/pGoc4_imTi0/sddefault.jpg",
      medium_image_url: "https://img.youtube.com/vi/pGoc4_imTi0/mqdefault.jpg",
      large_image_url: "https://img.youtube.com/vi/pGoc4_imTi0/hqdefault.jpg",
      maximum_image_url:
        "https://img.youtube.com/vi/pGoc4_imTi0/maxresdefault.jpg",
    },
  },
  title: "Blue Archive the Animation",
  type: "TV",
  episodes: 12,
  status: "Finished Airing",
  score: 7.06,
  airing: false,
  popularity: 2884,
  year: 2024,
  genres: [
    {
      mal_id: 1,
      type: "anime",
      name: "Action",
      url: "https://myanimelist.net/anime/genre/1/Action",
    },
    {
      mal_id: 10,
      type: "anime",
      name: "Fantasy",
      url: "https://myanimelist.net/anime/genre/10/Fantasy",
    },
  ],
  updated_at: "2024-10-20T12:58:33.139Z",
};

// const anime = await request("https://api.jikan.moe/v4/").get(
//   "anime/54309/full"
// );
// anime.body.data.updated_at = new Date();
// let extractedData = _.pick(anime.body.data, [
//   "mal_id",
//   "images",
//   "trailer",
//   "title",
//   "type",
//   "episodes",
//   "status",
//   "score",
//   "airing",
//   "popularity",
//   "year",
//   "genres",
//   "updated_at",
// ]);
// return extractedData;
