import Express from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import { User } from "../models/users";
import { auth } from "../middleware/auth";
import jwt from "jsonwebtoken";

const router = Express.Router();
router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const secretOrPrivateKey = process.env.anime_jwtPrivateKey;
  if (!secretOrPrivateKey) {
    throw new Error("JWT secret is undefined! Make sure it's set.");
  }

  const token = jwt.sign({ id: user._id.toString() }, secretOrPrivateKey, {
    expiresIn: "1h",
  });

  res.json({
    message: "Login successful",
    token,
  });
});

router.post("/logout", auth, async (req, res) => {
  req.session.destroy(() => {});
  res.status(200).send("successfully logout");
});

const validate = (req: Request) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
};

export { router };
