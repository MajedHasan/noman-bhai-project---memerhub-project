import express from "express"
import { getNotification } from "../controllers/notificationController.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()


// @desc Get Specific user Notification
// @route - GET /api/notification/
// @access Private
router.get("/", protect, getNotification)


export default router