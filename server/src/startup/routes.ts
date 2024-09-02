import { Express } from "express";
import bodyParser from "body-parser";
import { router as users } from "../route/users";

export default function (app: Express) {
  app.use(bodyParser.json());
  app.use("/api/users", users);
}
