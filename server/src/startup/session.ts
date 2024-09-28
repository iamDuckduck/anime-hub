import { Express } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "config";

export const enableSession = (app: Express) => {
  const db: string = config.get("db");

  app.use(
    session({
      secret: "your-secret-key", // Change this to a secure random string
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: db }),
      cookie: {
        maxAge: 60 * 60 * 1000,
        // httpOnly: ?,
        // sameSite: ?,
        // secure: ?,
      },
    })
  );
};
