import express from "express"
import { getTier, updateTier } from "../controllers/tierController.js"
const router = express.Router()

router.get("/", getTier)
router.put("/", updateTier)

export default router