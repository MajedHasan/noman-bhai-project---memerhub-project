import asyncHandler from "express-async-handler";
import SiteTextModel from "../model/SiteTextModel.js"

export const getSiteText = asyncHandler(async (req, res) => {
    const siteText = await SiteTextModel.findOne()

    if (!siteText) {
        res.status(404)
        throw new Error("Site Text Not Found")
    }

    res.status(200).json(siteText)
})

export const updateSiteText = asyncHandler(async (req, res) => {
    const siteText = req.body

    const updatedSiteText = await SiteTextModel.findOneAndUpdate({}, siteText, { new: true })

    res.status(201).json(updatedSiteText)
})