import Express from "express";
import { auth } from "../middleware/auth";
import {
  userAnimeList,
  validateUserAnimeList as validate,
} from "../models/userAnimeList";

import mongoose from "mongoose";
const router = Express.Router();

router.get("/myList", auth, async (req, res) => {
  const userAnimeListInDb = await userAnimeList.findOne({
    userId: req.session.user?.id,
  });
  return res.send(userAnimeListInDb);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  if (req.session.user?.id !== req.body.userId)
    return res
      .status(401)
      .send("unauthorized you can't post animeList for others");

  if (await userAnimeList.findOne({ "anime.animeId": req.body.anime.animeId }))
    return res.status(400).send("duplicated animeList");

  const savedAnimeList = await new userAnimeList(req.body).save();
  res.send(savedAnimeList);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("animeListId isn't a valid objectId");

  const AnimeListInDb = await userAnimeList.findById(req.params.id);

  if (!AnimeListInDb) return res.status(400).send("invalid animeListId");

  if (req.session.user?.id !== AnimeListInDb.userId.toString())
    return res
      .status(401)
      .send("unauthorized you can't edit other people's animeList");

  const updatedAnimeList = await userAnimeList.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  res.send(updatedAnimeList);
});

router.delete("/:id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("animeListId isn't a valid objectId");

  const AnimeListInDb = await userAnimeList.findById(req.params.id);
  if (!AnimeListInDb) return res.status(400).send("invalid animeListId");

  if (req.session.user?.id !== AnimeListInDb.userId.toString())
    return res
      .status(401)
      .send("unauthorized you can't delete other people's animeList");

  const deletedAnimeList = await userAnimeList.findByIdAndDelete(req.params.id);

  res.send(deletedAnimeList);
});

export { router };
