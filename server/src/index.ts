import express from "express";
import config from "config";
import "express-async-errors";
import { logger, handleRejection } from "./startup/logger";
import routes from "./startup/routes";
import mongodb from "./startup/mongodb";
import { enableCors } from "./startup/cors";

const app = express();
const env = process.env.NODE_ENV;

handleRejection(); //it handles unhandled rejected promise
routes(app); //set up all the routes
mongodb(); // connect to mongodb

env == "development" ? enableCors(app) : ""; //enable cors so i can test it in localhost (need to be deleted in production)

env == ("development" || "production")
  ? app.listen(3000, () => logger.info(`Listening on port 3000...`))
  : logger.info(`not listening to any port (test env)`);

export { app };
