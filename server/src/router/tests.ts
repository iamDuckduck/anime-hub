import Express from "express";
const router = Express.Router();

router.get("/", async (req, res) => {
  throw new Error("Test error");
});

export { router };
