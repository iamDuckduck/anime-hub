import { Document, Schema, model, Model, Types } from "mongoose";
import mongoose from "mongoose";
import Joi from "joi";

// enum Status {
//   Watching = "Watching",
//   Rewatching = "Rewatching",
//   Completed = "Completed",
//   Paused = "Paused",
//   Dropped = "Dropped",
//   Planning = "Planning",
// }

// interface Anime {
//   animeId: Number;
//   title: String;
//   imageUrl: String;
//   genre: String;
//   totalEpisodes: number;
//   score: number;
// }

//extend the document interface,
export interface watchListDoc extends Document {
  _id: Types.ObjectId;
  userId: string;
  name: string;
  created_at: Date;
}

const watchListSchema = new Schema<watchListDoc>({
  userId: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return mongoose.Types.ObjectId.isValid(value);
      },
      message: (props) => `${props.value} is not a valid ObjectId!`,
    },
  },
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Add a compound index to enforce uniqueness on the combination of userId and name
watchListSchema.index({ userId: 1, name: 1 }, { unique: true });

const WatchList = model<watchListDoc, Model<watchListDoc>>(
  "WatchList",
  watchListSchema
);

const validateWatchList = (WatchList: object) => {
  const schema = Joi.object({
    userId: Joi.string().custom(
      (value: string, helpers: Joi.CustomHelpers<any>) => {
        if (mongoose.Types.ObjectId.isValid(value)) return value;
        else
          return helpers.message({
            custom: `${value} is not a valid ObjectId!`,
          });
      }
    ),
    name: Joi.string().min(1).max(80).required(),
  });

  return schema.validate(WatchList);
};

export { WatchList, validateWatchList };
