import Express from "express";
import auth from "../middleware/auth";
import { WatchList, validateWatchList as validate } from "../models/watchList";
import mongoose from "mongoose";
import validateReq from "../middleware/validateReq";

const router = Express.Router();

router.get("/myStatus", auth, async (req, res) => {
  const watchList = await WatchList.findOne({ userId: req.user?.id });
  res.send(watchList);
});

router.post("/", auth, validateReq(validate), async (req, res) => {
  if (req.body.userId !== req.user?.id)
    return res.status(401).send("you can't add watchList for another user");

  if (await WatchList.findOne({ name: req.body.name }))
    return res.status(400).send("duplicated watchList");

  const newWatchList = await new WatchList(req.body).save();
  res.send(newWatchList);
});

router.put("/:id", auth, validateReq(validate), async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid watchListId");

  const watchListId = await WatchList.findById(req.params.id);
  if (!watchListId)
    return res.status(400).send("provided watchListId not found");

  if (req.body.userId !== req.user?.id)
    return res.status(401).send("you can't modify other user's watchList");

  const updatedUser = await WatchList.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  res.send(updatedUser);
});

router.delete("/:id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid watchListId");

  const watchListInDb = await WatchList.findById(req.params.id);

  if (!watchListInDb) return res.status(400).send("watchList not found");

  if (watchListInDb.userId.toString() !== req.user?.id)
    return res.status(401).send("unauthorized");

  const deletedWatchList = await WatchList.findByIdAndDelete(req.params.id);

  res.send(deletedWatchList);
});
export { router };
