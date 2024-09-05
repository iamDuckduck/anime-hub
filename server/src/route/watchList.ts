import Express from "express";
import { auth } from "../middleware/auth";
import { WatchList, validateWatchList as validate } from "../models/watchList";
import mongoose from "mongoose";
const router = Express.Router();

router.get("/myList", auth, async (req, res) => {
  const watchList = await WatchList.findOne({ userId: req.user._id });
  res.send(watchList);
});

router.post("/", auth, async (req, res) => {
  if (req.body.userId !== req.user._id)
    return res.status(401).send("you can't add watchList for another user");

  const { error } = validate(req.body);
  if (error) return res.status(400).send("invalid info");

  if (await WatchList.findOne({ name: req.body.name }))
    return res.status(400).send("duplicated watchList");

  const newWatchList = await new WatchList(req.body).save();
  res.send(newWatchList);
});

router.put("/", auth, async (req, res) => {
  if (!(await WatchList.findById(req.header("watchListId"))))
    return res.status(400).send("invalid watchListId");

  if (req.body.userId !== req.user._id)
    return res.status(401).send("you can't modify other user's watchList");

  const { error } = validate(req.body);
  if (error) return res.status(400).send("invalid info");

  const updatedUser = await WatchList.findOneAndUpdate(
    { _id: req.header("watchListId") }, // Update user with matching userId
    req.body, // New user data Userto update
    { new: true } // Return the updated user data
  );

  return res.status(200).send(updatedUser);
});

router.delete("/", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.watchListId))
    return res.status(400).send("invalid watchListId");

  const watchListInDb = await WatchList.findById(req.body.watchListId);
  if (!watchListInDb) return res.status(400).send("invalid watchListId");
  if (watchListInDb.userId !== req.user._id)
    return res.status(401).send("unauthorized");

  const deletedWatchList = await WatchList.findByIdAndDelete(watchListInDb._id);
  res.status(200).send(deletedWatchList);
});
export { router };
