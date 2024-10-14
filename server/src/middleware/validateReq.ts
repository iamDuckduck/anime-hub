import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default function (
  validator: (object: object) => Joi.ValidationResult<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
}
