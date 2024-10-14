import { Express } from "express";
import cors from "cors";

export const enableCors = function (app: Express) {
  if (process.env.NODE_ENV == "development") {
    // Set up CORS with custom options
    const corsOptions = {
      origin: "http://localhost:5173",
      methods: "GET,PUT,POST,DELETE", // Allow these HTTP methods
      credentials: true,
    };
    app.use(cors(corsOptions));
  }
};
