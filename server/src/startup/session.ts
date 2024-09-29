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
      resave: false, // Don't resave session if not modified
      saveUninitialized: false, // Don't create session until something is stored
      cookie: {
        domain: ".vercel.app", // Set domain to share the cookie across subdomains
        httpOnly: true, // Prevent JavaScript from accessing the cookie
        secure: true, // Set to true for HTTPS only (false for local dev with HTTP)
        sameSite: "none", // Allow cross-origin requests
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
      },
    })
  );
};
