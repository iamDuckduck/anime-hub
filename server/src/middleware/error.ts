const { logger } = require("../startup/logger");
import { Request, Response, NextFunction } from "express";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err.message, err);
  //Log the exception
  res.status(500).send("Something failed.");
}
