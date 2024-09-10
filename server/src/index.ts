import express from "express";
import config from "config";
import "express-async-errors";
import { logger, handleRejection } from "./startup/logger";
import routes from "./startup/routes";
import mongodb from "./startup/mongodb";

const app = express();
handleRejection(); //it handles unhandled rejected promise
routes(app); //set up all the routes
mongodb(); // connect to mongodb

const port: number = config.get("port");
//port will be null if in test env
port
  ? app.listen(port, () => logger.info(`Listening on port ${port}...`))
  : logger.info(`not listening to any port`);

export { app };
