import { logger } from "../startup/logger";
import { Request, Response, NextFunction } from "express";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err.message, err); // doesn't log in test env
  //Log the exception
  res.status(500).send("Something failed.");
}
