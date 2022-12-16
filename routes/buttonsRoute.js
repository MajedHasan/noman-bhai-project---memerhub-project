import express from "express"
import { getButtons, updateButtons } from "../controllers/buttonsController.js"
const router = express.Router()

router.get("/", getButtons)
router.put("/", updateButtons)

export default router