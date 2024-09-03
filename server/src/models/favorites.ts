import { Document, Schema, model, Model, Types } from "mongoose";
import mongoose from "mongoose";
import Joi from "joi";

interface Anime {
  animeID: Number;
  imageUrl: String;
  animeTitle: String;
}

//extend the document interface,
export interface favoriteDoc extends Document {
  _id: string;
  userID: string;
  anime: Anime;
  created_at: Date;
}

const favoriteSchema = new Schema<favoriteDoc>({
  userID: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return mongoose.Types.ObjectId.isValid(value);
      },
      message: (props) => `${props.value} is not a valid ObjectId!`,
    },
  },
  anime: {
    type: new mongoose.Schema({
      animeID: Number,
      imageUrl: String,
      animeTitle: String,
    }),
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Favorite = model<favoriteDoc, Model<favoriteDoc>>(
  "Favorite",
  favoriteSchema
);

const validateFavorite = (user: object) => {
  const schema = Joi.object({
    userID: Joi.string().custom(
      (value: string, helpers: Joi.CustomHelpers<any>) => {
        if (mongoose.Types.ObjectId.isValid(value)) return value;
        else
          return helpers.message({
            custom: `${value} is not a valid ObjectId!`,
          });
      }
    ),
    anime: Joi.object({
      animeID: Joi.number().required(),
      imageUrl: Joi.string().required(),
      animeTitle: Joi.string().required(),
    }).required(),
  });

  return schema.validate(user);
};

export { Favorite, validateFavorite };
