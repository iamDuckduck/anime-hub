import Express from "express";
import { auth } from "../middleware/auth";
import mongoose from "mongoose";
import {
  userFavorite,
  validateFavorite,
  validateFavoritePut,
} from "../models/userFavorite";

const router = Express.Router();

router.get("/", auth, async (req, res) => {
  const userFavoriteInDb = await userFavorite.find({
    userId: req.user?.id,
  });
  res.send(userFavoriteInDb);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateFavorite(req.body);
  if (error) return res.status(400).send(error.message);

  //   if (req.session.user?.id !== req.body.userId)
  //     return res
  //       .status(401)
  //       .send("unauthorized you can't post animeList for others");

  if (await userFavorite.findOne({ "anime.animeId": req.body.anime.animeId }))
    return res.status(400).send("duplicated favorite");

  req.body.userId = req.user?.id;
  const savedUserFavorite = await new userFavorite(req.body).save();
  res.send(savedUserFavorite);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateFavoritePut(req.body);
  if (error) return res.status(400).send(error.message);

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("userFavoriteId isn't a valid objectId");

  const userFavoriteInDb = await userFavorite.findById(req.params.id);
  if (!userFavoriteInDb) return res.status(400).send("invalid userFavoriteId");

  if (req.user?.id !== userFavoriteInDb.userId.toString())
    return res
      .status(401)
      .send("unauthorized you can't edit other people's favorite");

  const updateUserFavorite = await userFavorite.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.send(updateUserFavorite);
});

router.delete("/:id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("favoriteId isn't a valid objectId");

  const userFavoriteInDb = await userFavorite.findById(req.params.id);
  if (!userFavoriteInDb) return res.status(400).send("invalid favoriteId");

  if (req.user?.id !== userFavoriteInDb.userId.toString())
    return res
      .status(401)
      .send("unauthorized you can't delete other people's favoriteId");

  const deletedUserFavorite = await userFavorite.findByIdAndDelete(
    req.params.id
  );

  res.send(deletedUserFavorite);
});

export { router };
