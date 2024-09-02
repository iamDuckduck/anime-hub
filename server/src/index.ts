import express from "express";
import config from "config";
import "express-async-errors";
import { logger, handleRejection } from "./startup/logger";
import routes from "./startup/routes";
import mongodb from "./startup/mongodb";

const app = express();
handleRejection();
routes(app);
mongodb();

const port: number = config.get("port");
port
  ? app.listen(port, () => logger.info(`Listening on port ${port}...`))
  : logger.info(`not listening to any port`);

export { app };
