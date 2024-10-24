import Express from "express";
import auth from "../middleware/auth";
import {
  userAnimeStatus,
  validateUserAnimeStatus as validate,
  validatePut,
} from "../models/userAnimeStatus";
import validateReq from "../middleware/validateReq";

import mongoose from "mongoose";
const router = Express.Router();

router.get("/myStatus", auth, async (req, res) => {
  const userAnimeStatusInDb = await userAnimeStatus.find({
    userId: req.user?.id,
  });
  return res.send(userAnimeStatusInDb);
});

router.post("/", auth, validateReq(validate), async (req, res) => {
  if (
    await userAnimeStatus.findOne({
      animeID: req.body.animeID,
      userId: req.user?.id,
    })
  )
    return res.status(400).send("duplicated animeStatus");

  req.body.userId = req.user?.id;
  const savedAnimeList = await new userAnimeStatus(req.body).save();
  res.send(savedAnimeList);
});

router.put("/:id", auth, validateReq(validatePut), async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("animeStatusID isn't a valid objectId");

  const AnimeListInDb = await userAnimeStatus.findById(req.params.id);

  if (!AnimeListInDb) return res.status(400).send("invalid animeStatusID");

  // if (req.body.currentEpisode == AnimeListInDb.anime.totalEpisodes)
  //   // auto complete
  //   req.body.status = "Completed";

  const updatedAnimeList = await userAnimeStatus.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  res.send(updatedAnimeList);
});

router.delete("/:id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("animeStatusID isn't a valid objectId");

  const AnimeListInDb = await userAnimeStatus.findById(req.params.id);
  if (!AnimeListInDb) return res.status(400).send("invalid animeStatusID");

  const deletedAnimeList = await userAnimeStatus.findByIdAndDelete(
    req.params.id
  );

  res.send(deletedAnimeList);
});

export { router };
