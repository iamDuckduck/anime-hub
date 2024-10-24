import Express from "express";
import { Anime, validate } from "../models/anime";
import auth from "../middleware/auth";
import validateReq from "../middleware/validateReq";

const router = Express.Router();

router.get("/", auth, async (req, res) => {
  const animes = await Anime.find().sort();
  res.send(animes);
});

router.post("/", auth, validateReq(validate), async (req, res) => {
  const duplicated = await Anime.find({ mal_id: req.body.mal_id });
  if (duplicated.length > 0) return res.status(400).send("duplicated anime");
  const savedAnime = await new Anime(req.body).save();
  res.send(savedAnime);
});

export { router };
