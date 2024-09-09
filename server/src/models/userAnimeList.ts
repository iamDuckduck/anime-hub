import { Document, Schema, model, Model, Types } from "mongoose";
import mongoose from "mongoose";
import Joi from "joi";

enum Status {
  Watching = "Watching",
  Rewatching = "Rewatching",
  Completed = "Completed",
  Paused = "Paused",
  Dropped = "Dropped",
  Planning = "Planning",
}

export interface Anime {
  animeId: String;
  status: String;
  format: String;
  title: String;
  imageUrl: String;
  genre: String;
  totalEpisodes: number;
  score: number;
  year: string;
}

//extend the document interface,
export interface userAnimeListDoc extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  watchListIds: Types.ObjectId[];
  anime: Anime;
  status: String;
  currentEpisode: number;
  expectedFinishDate: Date;
  favorite: Boolean;
  created_at: Date;
  updated_at: Date;
}

const userAnimeListSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  watchListIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  anime: {
    type: Object, //let validateUserAnimeList to validate
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(Status),
    required: true,
  },
  currentEpisode: {
    type: Number,
    required: true,
  },
  expectedFinishDate: {
    type: Date,
    default: null,
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

const userAnimeList = model<userAnimeListDoc, Model<userAnimeListDoc>>(
  "userAnimeList",
  userAnimeListSchema
);

const validateUserAnimeList = (userAnimeList: object) => {
  const schema = Joi.object({
    userId: Joi.string()
      .custom((value: string, helpers: Joi.CustomHelpers<any>) => {
        if (mongoose.Types.ObjectId.isValid(value)) return value;
        else
          return helpers.message({
            custom: `${value} is not a valid ObjectId!`,
          });
      })
      .required(),
    watchListIds: Joi.array()
      .items(
        Joi.string().custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
          }
          return value;
        })
      )
      .required(),
    anime: Joi.object().keys({
      animeId: Joi.string().required(),
      status: Joi.string().required(),
      format: Joi.string().required(),
      title: Joi.string().required(),
      imageUrl: Joi.string().required(),
      genre: Joi.string().required(),
      totalEpisodes: Joi.number().required(),
      score: Joi.number().required(),
      year: Joi.string().required(),
    }),
    status: Joi.string()
      .valid(...Object.values(Status))
      .required(),
    currentEpisode: Joi.number().required(),
    expectedFinishDate: Joi.date(),
    favorite: Joi.boolean().required(),
    created_at: Joi.date().required(),
    updated_at: Joi.date().required(),
  });

  return schema.validate(userAnimeList);
};

export { userAnimeList, validateUserAnimeList };

// if i declare anime as Anime interface in userAnimeListDoc, it still
// return a document type when requesting it if we validate anime
// by animeSchema in userAnimeListSchema)
// interface animeDoc extends Document {
//   animeId: String;
//   status: String;
//   format: String;
//   title: String;
//   imageUrl: String;
//   genre: String;
//   totalEpisodes: number;
//   score: number;
//   year: string;
// }

// use in userAnimeListSchema
// const animeSchema = new Schema<animeDoc>(
//   {
//     animeId: { type: String, required: true },
//     status: { type: String, required: true },
//     format: { type: String, required: true },
//     title: { type: String, required: true },
//     imageUrl: { type: String, required: true },
//     genre: { type: String, required: true },
//     totalEpisodes: { type: Number, required: true },
//     score: { type: Number, required: true },
//     year: { type: String, required: true },
//   },
//   { _id: false } // Disable _id for animeSchema
// );
