import mongoose, { Document, Schema, model, Model, Types } from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";

//extend the document interface,
export interface UserDoc extends Document {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  profileImage: string;
  bannerImage: string;
  createdAt: Date;
  updatedAt: Date;
  follow: Types.ObjectId[];
  followedBy: Types.ObjectId[];
  isAdmin: boolean;
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
  //index ?
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
  profileImage: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    default:
      "https://res.cloudinary.com/drbighiyo/image/upload/v1726897677/user/ehbo9vd8kbxpfpmtfykl.jpg",
  },
  bannerImage: {
    type: String,
    required: false,
    maxlength: 255,
    default:
      "https://res.cloudinary.com/drbighiyo/image/upload/v1726910174/user/ayctbuje418140gbij5z.jpg",
  },
  follow: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    required: true,
  },
  followedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    required: true,
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
  // add profileImg
});

// Add generateAuthToken method to the schema
userSchema.methods.generateAuthToken = function (this: UserDoc) {
  const secretOrPrivateKey = process.env.anime_jwtPrivateKey;
  if (!secretOrPrivateKey) {
    throw new Error("JWT secret is undefined! Make sure it's set.");
  }

  return jwt.sign({ id: this.id, isAdmin: this.isAdmin }, secretOrPrivateKey, {
    expiresIn: "1h",
  });
};

// Create a Mongoose model
const User = model<UserDoc, Model<UserDoc>>("User", userSchema);

const validatePost = (user: object) => {
  const schema = Joi.object({
    userName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

const validatePut = (user: object) => {
  const schema = Joi.object({
    userName: Joi.string().min(5).max(50).optional(),
    email: Joi.string().min(5).max(255).optional().email(),
    password: Joi.string().min(5).max(255).optional(),
    profileImage: Joi.string().min(5).max(255).optional(),
    bannerImage: Joi.string().min(5).max(255).optional(),
  }).custom((value, helpers) => {
    if (Object.keys(value).length === 0) {
      return helpers.error("object.empty");
    }
    return value;
  });

  return schema.validate(user);
};

export { User };
export { validatePut, validatePost };
