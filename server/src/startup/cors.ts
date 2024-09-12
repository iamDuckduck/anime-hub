import { Express } from "express";
const cors = require("cors");

export const enableCors = function (app: Express) {
  // Set up CORS with custom options
  const corsOptions = {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: "GET,PUT,POST,DELETE", // Allow these HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
  };

  app.use(cors(corsOptions));
};
