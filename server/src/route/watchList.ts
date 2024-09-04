import Express from "express";
import { auth } from "../middleware/auth";
const router = Express.Router();

router.get("/", auth, async (req, res) => {});

export { router };
