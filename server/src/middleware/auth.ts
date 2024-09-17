import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
  _id: string;
  _isAdmin: boolean;
}

export const auth = function (req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    return res.status(401).send("unauthorized");
  }

  next();
};
