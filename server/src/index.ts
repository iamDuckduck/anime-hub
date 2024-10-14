import express from "express";
import "express-async-errors";
import { logger, handleRejection } from "./startup/logger";
import routes from "./startup/routes";
import mongodb from "./startup/mongodb";
import { enableCors } from "./startup/cors";

const app = express();
const env = process.env.NODE_ENV;

handleRejection(); //it handles unhandled rejected promise outside the route scope
enableCors(app); //enable cors when it's in development, disable in production
mongodb(); // connect to mongodb
routes(app); //set up all the routes

const port = 3000;

env == "test"
  ? logger.info(`not listening to any port (test env)`) //we need to dynamically assign ports when testing api
  : app.listen(port, () => logger.info(`Listening on port 3000...`));

export default app;
