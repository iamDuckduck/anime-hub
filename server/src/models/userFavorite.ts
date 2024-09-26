import { Document, Schema, model, Model, Types } from "mongoose";
import mongoose from "mongoose";
import Joi from "joi";
import { Anime } from "./userAnimeList";
import { create } from "lodash";

interface userFavoriteDoc extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  anime: Anime;
  created_at: Date;
  updated_at: Date;
  favorite: boolean;
}

const userFavoriteSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  anime: {
    type: Object,
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
    userId: Joi.string().required(),
    anime: Joi.object().keys({
      animeId: Joi.string().required(),
      status: Joi.string().required(),
      format: Joi.string().required(),
      title: Joi.string().required(),
      imageUrl: Joi.string().required(),
      genre: Joi.string().required(),
      totalEpisodes: Joi.number().required(),
      score: Joi.number().required(),
      year: Joi.number().required(),
    }),
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
