import { User, validateUser as validate } from "../models/users";
import Express from "express";
import { auth } from "../middleware/auth";
import bcrypt from "bcrypt";
import _ from "lodash";
const router = Express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("invalid info");

  if (await User.findOne({ userName: req.body.userName }))
    return res.status(400).send("duplicated userName");

  if (await User.findOne({ email: req.body.email }))
    return res.status(400).send("duplicated email");

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const user = new User(req.body);
  await user.save();

  const savedUser = _.pick(user, ["_id", "userName", "email", "password"]);
  res.status(200).send(savedUser);
});

router.put("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send("invalid info");
});
export { router };
