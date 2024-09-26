import { Express } from "express";
import bodyParser from "body-parser";
import { router as users } from "../router/users";
import { router as watchList } from "../router/watchList";
import { router as test } from "../router/tests";
import { router as animeList } from "../router/userAnimeList";
import { router as auth } from "../router/auth";
import { router as uploadImage } from "../router/uploadImage";
import { router as favorite } from "../router/userFavorite";
import error from "../middleware/error";

export default function (app: Express) {
  app.use(bodyParser.json());
  app.use("/api/users", users);
  app.use("/api/watchList", watchList);
  app.use("/api/tests", test);
  app.use("/api/userAnimeList", animeList);
  app.use("/api/auth", auth);
  app.use("/api/imageUpload", uploadImage);
  app.use("/api/favorite", favorite);
  app.use(error);
}
