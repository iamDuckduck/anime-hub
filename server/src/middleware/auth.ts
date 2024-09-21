import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = function (req: Request, res: Response, next: NextFunction) {
  //req session will automatically check whether the session cookie is valid or no
  if (!req.session.user) {
    return res.status(401).send("unauthorized");
  }

  next();
};
