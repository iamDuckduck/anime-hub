import express from "express";
import "express-async-errors";
import { logger, handleRejection } from "./startup/logger";
import routes from "./startup/routes";
import mongodb from "./startup/mongodb";
import { enableCors } from "./startup/cors";
import config from "config";

// ugly way to check private key variable is setted or not
if (!config.get("jwtPrivateKey")) {
  console.log("setup failed");
}

const app = express();
const env = process.env.NODE_ENV;

handleRejection(); //it handles unhandled rejected promise
enableCors(app); //enable cors when it's in development
routes(app); //set up all the routes
mongodb(); // connect to mongodb

env !== "test"
  ? app.listen(3000, () => logger.info(`Listening on port 3000...`))
  : logger.info(`not listening to any port (test env)`); //we need to dynamically assign ports when testing api

export { app };
