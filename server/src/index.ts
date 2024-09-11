import express from "express";
import config from "config";
import "express-async-errors";
import { logger, handleRejection } from "./startup/logger";
import routes from "./startup/routes";
import mongodb from "./startup/mongodb";
const cors = require("cors");

const app = express();

// Set up CORS with custom options
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin
  methods: "GET,PUT,POST,DELETE", // Allow these HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow these headers
};
app.use(cors(corsOptions));
handleRejection(); //it handles unhandled rejected promise
routes(app); //set up all the routes
mongodb(); // connect to mongodb

console.log("key" + config.get("jwtPrivateKey"));
const port: number = config.get("port");
//port will be null if in test env
port
  ? app.listen(port, () => logger.info(`Listening on port ${port}...`))
  : logger.info(`not listening to any port`);

export { app };
