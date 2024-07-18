import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import AnimeDetails from "../pages/AnimeDetailPage";
import ErrorPage from "../pages/errorPage";
import AnimeSchedules from "../pages/AnimeSchedules";
import HomeLayOut from "../pages/HomeLayout";
import AnimeSeasons from "../pages/AnimeSeasons";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "",
        element: <HomeLayOut />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "/animes/schedules", element: <AnimeSchedules /> },
          { path: "/animes/seasons", element: <AnimeSeasons /> },
        ],
      },
      { path: "/animes/:id/:title", element: <AnimeDetails /> },
    ],
  },
]);

export default router;
