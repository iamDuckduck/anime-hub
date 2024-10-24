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

//extend the document interface,
export interface userAnimeStatusDoc extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  userWatchListIDs: Types.ObjectId[];
  animeID: number;
  status: String;
  currentEpisode: number;
  expectedFinishDate: Date;
  created_at: Date;
  updated_at: Date;
}

const userAnimeStatusSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userWatchListIDs: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  animeID: {
    type: Number, //let validateUserAnimeList to validate
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

const userAnimeStatus = model<userAnimeStatusDoc, Model<userAnimeStatusDoc>>(
  "userAnimeStatus",
  userAnimeStatusSchema
);

const validateUserAnimeStatus = (userAnimeStatus: object) => {
  const schema = Joi.object({
    userWatchListIDs: Joi.array().items(
      Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
    ),
    animeID: Joi.number().required(),
    status: Joi.string()
      .valid(...Object.values(Status))
      .required(),
    currentEpisode: Joi.number().required(),
    expectedFinishDate: Joi.date().allow(null),
  });

  return schema.validate(userAnimeStatus);
};

export const validatePut = (userAnimeStatus: object) => {
  const schema = Joi.object({
    userWatchListIDs: Joi.array()
      .items(
        Joi.string().custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
          }
          return value;
        })
      )
      .optional(),
    animeID: Joi.number(),
    status: Joi.string()
      .valid(...Object.values(Status))
      .optional(),
    currentEpisode: Joi.number().optional(),
    expectedFinishDate: Joi.date().allow(null),
    updated_at: Joi.date().required(),
  });

  return schema.validate(userAnimeStatus);
};

export { userAnimeStatus, validateUserAnimeStatus };

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
