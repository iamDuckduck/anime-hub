import { User, validatePut, validatePost } from "../models/users";
import Express from "express";
import { auth } from "../middleware/auth";
import bcrypt from "bcrypt";
import _ from "lodash";
import { Types } from "mongoose";

interface savedUser {
  _id: Types.ObjectId;
  userName: string;
  email: string;
}
const router = Express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.session.user?.id).select("-password");
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { error } = validatePost(req.body);
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
  };

  req.session.user = { id: user._id.toString() };

  res.status(200).send(savedUser);
});

interface UpdateUserBody {
  userName?: string;
  email?: string;
  profileImage?: string;
  bannerImage?: string;
  password?: string; // Include password if needed
}

router.patch("/", auth, async (req, res) => {
  const { error } = validatePut(req.body);
  if (error) return res.status(400).send(error);

  // we get the userfromdbv
  const userInDb = await User.findById(req.session.user?.id).select({
    userName: 1,
    email: 1,
    password: 1,
    profileImage: 1,
    bannerImage: 1,
    _id: 0, // Exclude the _id field from the query result
  });

  // Filter the request body to get only the relevant fields
  const filteredReqBody: UpdateUserBody = _.pick(req.body, [
    "userName",
    "email",
    "profileImage",
    "bannerImage",
    "password",
  ]);

  // Check if any field in the request body is the same as in the database
  for (const key of Object.keys(filteredReqBody)) {
    if (
      filteredReqBody[key as keyof UpdateUserBody] ===
      userInDb![key as keyof UpdateUserBody]
    ) {
      // if user tries to change the same password, return 400
      if (key == "password") {
        const passwordCompare = await bcrypt.compare(
          req.body.password,
          userInDb!.password
        );
        if (passwordCompare) return res.status(400).send("updating same info");
      }
      return res.status(400).send(`Cannot update ${key} to the same value`);
    }
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.session.user?.id }, // Update user with matching userId
    req.body, // New user data to update
    { new: true } // Return the updated user data
  );

  res.status(200).send(updatedUser);
});

router.delete("/", auth, async (req, res) => {
  const deletedUser = await User.findOneAndDelete({
    _id: req.session.user?.id,
  });
  res.status(200).send(deletedUser);
});
export { router };
