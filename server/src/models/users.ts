import { Document, Schema, model, Model, Types } from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import Joi from "joi";

//extend the document interface,
interface UserDoc extends Document {
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken: () => string;
}

//Schema
const userSchema = new Schema<UserDoc>({
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    index: true,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  isAdmin: Boolean,
});

// Add generateAuthToken method to the schema
userSchema.methods.generateAuthToken = function (this: UserDoc) {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

// Create a Mongoose model
const User = model<UserDoc, Model<UserDoc>>("User", userSchema);

const validateUser = (user: object) => {
  const schema = Joi.object({
    userName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

export { User };
export { validateUser };
