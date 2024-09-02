import mongoose from "mongoose";
import { logger } from "../startup/logger";
import config from "config";

export default function () {
  const db: string = config.get("db");
  mongoose.connect(db).then(() => logger.info(`Connected to ${db}`));
}
