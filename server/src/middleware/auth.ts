import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).send("authorization should be a string");
  }

  const token = authHeader?.split(" ")[1]; //could be undefinded

  const secretOrPrivateKey = process.env.anime_jwtPrivateKey; // Assuming you're using environment variables

  if (!secretOrPrivateKey) {
    throw new Error("JWT secret is undefined! Make sure it's set.");
  }

  //user = { id, iat, exp }
  jwt.verify(token, secretOrPrivateKey, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}
