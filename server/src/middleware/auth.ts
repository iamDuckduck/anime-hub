import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
  _id: string;
  _isAdmin: boolean;
}

export const auth = function (req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("no token provided");

  try {
    const decoded = jwt.verify(
      token,
      config.get("jwtPrivateKey")
    ) as DecodedToken;
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("invalid token");
  }
};
