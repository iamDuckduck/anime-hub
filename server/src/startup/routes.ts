import { Express } from "express";
import bodyParser from "body-parser";
import { router as users } from "../route/users";
import { router as favorites } from "../route/favorites";
import { router as test } from "../route/tests";
import error from "../middleware/error";

export default function (app: Express) {
  app.use(bodyParser.json());
  app.use("/api/users", users);
  app.use("/api/favorites", favorites);
  app.use("/api/tests", test);
  app.use(error);
}
