import Express from "express";
import auth from "../middleware/auth";
import {
  userAnimeList,
  validateUserAnimeList as validate,
  validatePut,
} from "../models/userAnimeList";
import validateReq from "../middleware/validateReq";

import mongoose from "mongoose";
const router = Express.Router();

router.get("/myList", auth, async (req, res) => {
  const userAnimeListInDb = await userAnimeList.find({
    userId: req.user?.id,
  });
  return res.send(userAnimeListInDb);
});

router.post("/", auth, validateReq(validate), async (req, res) => {
  if (
    await userAnimeList.findOne({
      "anime.animeId": req.body.anime.animeId,
      userId: req.user?.id,
    })
  )
    return res.status(400).send("duplicated animeList");

  req.body.userId = req.user?.id;
  const savedAnimeList = await new userAnimeList(req.body).save();
  res.send(savedAnimeList);
});

router.put("/:id", auth, validateReq(validatePut), async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("animeListId isn't a valid objectId");

  const AnimeListInDb = await userAnimeList.findById(req.params.id);

  if (!AnimeListInDb) return res.status(400).send("invalid animeListId");

  if (req.body.currentEpisode == AnimeListInDb.anime.totalEpisodes)
    // auto complete
    req.body.status = "Completed";

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

  const deletedAnimeList = await userAnimeList.findByIdAndDelete(req.params.id);

  res.send(deletedAnimeList);
});

export { router };
