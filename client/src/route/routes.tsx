import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/NavbarLayout";
import HomePage from "../pages/HomePage";
import AnimeDetails from "../pages/AnimeDetailPage";
import ErrorPage from "../pages/errorPage";
import AnimeSchedules from "../pages/AnimeSchedules";
import HomeLayOut from "../pages/SideBarLayOut";
import AnimeSeasons from "../pages/AnimeSeasons";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import UserProfilePage from "../pages/UserProfilePage";

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
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/profile", element: <UserProfilePage /> },
    ],
  },
]);

export default router;
