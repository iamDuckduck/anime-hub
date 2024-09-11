import { User, validateUser as validate } from "../models/users";
import Express from "express";
import { auth } from "../middleware/auth";
import bcrypt from "bcrypt";
import _ from "lodash";
import { Types } from "mongoose";

interface savedUser {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  token: string;
}
const router = Express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  if (await User.findOne({ userName: req.body.userName }))
    return res.status(400).send("duplicated userName");

  if (await User.findOne({ email: req.body.email }))
    return res.status(400).send("duplicated email");

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const user = new User(req.body);
  await user.save();

  const savedUser: savedUser = {
    ..._.pick(user, ["_id", "userName", "email"]),
    token: user.generateAuthToken(), // Add token property
  };
  res.status(200).send(savedUser);
});

router.put("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("invalid info");

  const user = await User.findById(req.user._id).select({
    userName: 1,
    email: 1,
    password: 1,
    _id: 0, // Exclude the _id field from the query result
  });

  if (JSON.stringify(req.body) === JSON.stringify(user))
    return res.status(400).send("updating same info");

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id }, // Update user with matching userId
    req.body, // New user data to update
    { new: true } // Return the updated user data
  );

  res.status(200).send(updatedUser);
});

router.delete("/", auth, async (req, res) => {
  const deletedUser = await User.findOneAndDelete({ _id: req.user._id });
  res.status(200).send(deletedUser);
});
export { router };
