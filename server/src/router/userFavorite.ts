import Express from "express";
import auth from "../middleware/auth";
import mongoose from "mongoose";
import {
  userFavorite,
  validateFavorite,
  validateFavoritePut,
} from "../models/userFavorite";
import validateReq from "../middleware/validateReq";

const router = Express.Router();

router.get("/", auth, async (req, res) => {
  const userFavoriteInDb = await userFavorite.find({
    userId: req.user?.id,
  });
  res.send(userFavoriteInDb);
});

router.post("/", auth, validateReq(validateFavorite), async (req, res) => {
  //   if (req.session.user?.id !== req.body.userId)
  //     return res
  //       .status(401)
  //       .send("unauthorized you can't post animeList for others");

  if (
    await userFavorite.findOne({
      animeID: req.body.animeID,
      userId: req.user?.id,
    })
  )
    return res.status(400).send("duplicated favorite");

  req.body.userId = req.user?.id;
  const savedUserFavorite = await new userFavorite(req.body).save();
  res.send(savedUserFavorite);
});

router.put("/:id", auth, validateReq(validateFavoritePut), async (req, res) => {
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
