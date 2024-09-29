import { Express } from "express";
import cors from "cors";

export const enableCors = function (app: Express) {
  if (process.env.NODE_ENV == "development") {
    // Set up CORS with custom options
    const corsOptions = {
      origin:
        process.env.NODE_ENV == "development"
          ? "http://localhost:5173"
          : "https://anime-hub-one-chi.vercel.app",
      // Allow requests from this origin
      methods: "GET,PUT,POST,DELETE", // Allow these HTTP methods
      credentials: true,
    };
    app.use(cors(corsOptions));
  }
};
