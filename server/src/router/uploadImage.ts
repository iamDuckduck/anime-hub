import Express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { Request, Response } from "express";
import { auth } from "../middleware/auth";
const router = Express.Router();

cloudinary.v2.config({
  //hard code for now
  cloud_name: "drbighiyo",
  api_key: "211846568947739",
  api_secret: "GV8vFUH_DL8mgqRpeiKrt6OD_w4",
});

//init Multer
const upload = multer({ storage: multer.memoryStorage() });

// Upload endpoint
router.post(
  "/",
  [auth, upload.single("image")],
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    // Upload the image to Cloudinary
    await cloudinary.v2.uploader
      .upload_stream(
        { public_id: req.user._id + "_profile_pic", resource_type: "image" },
        (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Failed to upload image." });
          }
          res.json({ imageUrl: result?.secure_url });
        }
      )
      .end(req.file.buffer); // Send file buffer to Cloudinary
  }
);

export { router };
