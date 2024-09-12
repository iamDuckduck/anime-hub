import express from "express";
import config from "config";
import "express-async-errors";
import { logger, handleRejection } from "./startup/logger";
import routes from "./startup/routes";
import mongodb from "./startup/mongodb";
import { enableCors } from "startup/cors";

const app = express();

handleRejection(); //it handles unhandled rejected promise
enableCors(app); //enable cors so i can test it (need to be deleted in production)
routes(app); //set up all the routes
mongodb(); // connect to mongodb

const port: number = config.get("port");
//port will be null if in test env
port
  ? app.listen(port, () => logger.info(`Listening on port ${port}...`))
  : logger.info(`not listening to any port`);

export { app };
