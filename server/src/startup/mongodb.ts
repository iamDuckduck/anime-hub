import mongoose from "mongoose";
import { logger } from "../startup/logger";
import config from "config";

export default function () {
  const db: string = process.env.MONGO_URL || "";
  mongoose.connect(db).then(() => logger.info(`Connected to ${db}`));
}
