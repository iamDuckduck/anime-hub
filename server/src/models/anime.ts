import { Document, Schema, model, Model, Types } from "mongoose";
import Joi from "joi";

interface Image {
  jpg: {
    image_url: string | null;
  };
  wedp: {
    image_url: string | null;
  };
}
interface Genre {
  mal_id: number;
  name: string;
}

export default interface Trailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
}

enum status {
  FinishedAiring = "Finished Airing",
  CurrentlyAiring = "Currently Airing",
  NotYetAired = "Not yet aired",
}

//extend the document interface,
export interface animeDoc extends Document {
  _id: Types.ObjectId;
  mal_id: number;
  images: Image;
  trailer: Trailer;
  title: string;
  type: string | null;
  episodes: number | null;
  status: status | null;
  score: number | null;
  airing: boolean;
  popularity: number | null;
  year: number | null;
  genres: Genre[];
  updated_at: Date;
}

const animeSchema = new Schema({
  mal_id: {
    type: Number,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  trailer: {
    type: Object, //let validateUserAnimeList to validate
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: null,
    required: true,
  },
  episodes: {
    type: Number,
    default: null,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(status),
    default: null,
    required: true,
  },
  score: {
    type: Number,
    default: null,
    required: true,
  },
  airing: {
    type: Boolean,
    required: true,
  },
  popularity: {
    type: Number,
    default: null,
    required: true,
  },
  year: {
    type: Number,
    default: null,
    required: true,
  },
  genres: {
    type: [Object],
    required: true,
  },
});

const Anime = model<animeDoc, Model<animeDoc>>("anime", animeSchema);

const validate = (userAnimeList: object) => {
  const schema = Joi.object({
    mal_id: Joi.number().required(),
    images: Joi.object().required(),
    trailer: Joi.object().required(),
    title: Joi.string().required(),
    type: Joi.string().allow(null).required(),
    episodes: Joi.number().allow(null).required(),
    status: Joi.string().allow(null).required(),
    score: Joi.number().allow(null).required(),
    airing: Joi.boolean().required(),
    popularity: Joi.number().allow(null).required(),
    year: Joi.number().allow(null).required(),
    genres: Joi.array().items().required(),
    updated_at: Joi.date().required(),
  });

  return schema.validate(userAnimeList);
};

export { Anime, validate };
