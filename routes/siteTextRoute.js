import express from "express"
import { getSiteText, updateSiteText } from "../controllers/siteTextController.js"
const router = express.Router()


router.get("/", getSiteText)
router.put("/", updateSiteText)


export default router