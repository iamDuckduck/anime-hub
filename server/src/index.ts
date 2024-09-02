import express from "express";
import bodyParser from "body-parser";
import config from "config";
import mongoose from "mongoose";
import { logger, handleRejection } from "./startup/logger";
import { router as users } from "./route/users";
handleRejection();
const app = express();
app.use(bodyParser.json());

app.use("/api/users", users);

const db: string = config.get("db");
mongoose.connect(db).then(() => logger.info(`Connected to ${db}`));

const port: number = config.get("port");
port
  ? app.listen(port, () => logger.info(`Listening on port ${port}...`))
  : logger.info(`not listening to any port`);

export { app };
