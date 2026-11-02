
import { Router } from "express";
import {
  getVideos,
  getVideoById,
  createVideo,
  getComments,
  createComment
} from "../controller/video.controller.js";
import { commentSchema } from "../validators/schemas.js";

import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { videoSchema } from "../validators/schemas.js";

const router = Router();

router.get("/", getVideos);
router.get("/:id/comments", getComments);
router.post("/:id/comments", auth, validate(commentSchema), createComment);
router.get("/:id", getVideoById);
router.post("/", auth, validate(videoSchema), createVideo);

export default router;
