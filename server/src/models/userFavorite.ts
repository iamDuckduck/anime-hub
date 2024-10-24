import { Document, Schema, model, Model, Types } from "mongoose";
import mongoose from "mongoose";
import Joi from "joi";

interface userFavoriteDoc extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  animeID: Number;
  created_at: Date;
  updated_at: Date;
  favorite: boolean;
}

const userFavoriteSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  animeID: {
    type: Number,
    required: true,
  },
  favorite: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const userFavorite = model<userFavoriteDoc, Model<userFavoriteDoc>>(
  "userFavorite",
  userFavoriteSchema
);

const validateFavorite = (userFavorite: object) => {
  const schema = Joi.object({
    animeID: Joi.number().required(),
    favorite: Joi.boolean().required(),
  });
  return schema.validate(userFavorite);
};

const validateFavoritePut = (userFavorite: object) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
    updated_at: Joi.date().required(),
  });
  return schema.validate(userFavorite);
};

export { userFavorite, validateFavorite, userFavoriteDoc, validateFavoritePut };
