import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import AnimeDetails from "../pages/AnimeDetailPage";
import ErrorPage from "../pages/errorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/animes/:id/:title", element: <AnimeDetails /> },
    ],
  },
]);

export default router;
