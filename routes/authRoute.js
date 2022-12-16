import express from "express"
import { getMe, login, register } from "../controllers/authController.js"
import protect from "../middleware/authMiddleware.js"


// Call the Router
const router = express.Router()


// Route
router.post("/register", register)
router.post("/login", login)
router.get("/getMe", protect, getMe)


// Export the Routes
export default router