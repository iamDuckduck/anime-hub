import { Express } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "config";

export const enableSession = (app: Express) => {
  const db: string = process.env.MONGO_URL || "";

  app.use(
    session({
      name: "connect.sid", // Default session cookie name
      secret: "yourSecretKey", // Change this to your own secret
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: db }),
      cookie: {
        // httpOnly: true,

        // sameSite: "none",

        maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
      },
    })
  );
};
