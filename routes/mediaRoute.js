import express from "express"
import protect from "../middleware/authMiddleware.js"
import { addMedia, deleteMedia, getAllMemes, getMedia, getMediaForTier, getSingleMeme, updateMedia } from "../controllers/mediaController.js"

const router = express.Router()

router.get("/", protect, getMedia)
router.get("/forTier/:tier", protect, getMediaForTier)
router.post("/", addMedia)
router.put("/:id", updateMedia)
router.delete("/:id", deleteMedia)
router.get("/all", getAllMemes)
router.get("/single/:id", getSingleMeme)

export default router