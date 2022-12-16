import asyncHandler from "express-async-handler";
import TierModel from "../model/TierModel.js";

export const getTier = asyncHandler(async (req, res) => {
    const tier = await TierModel.findOne()

    if (!tier) {
        res.status(404)
        throw new Error("Tier Not Found")
    }

    res.status(200).json(tier)
})


export const updateTier = asyncHandler(async (req, res) => {
    const tier = req.body

    const updatedTier = await TierModel.findOneAndUpdate({}, tier, { new: true })

    res.status(201).json(updatedTier)
})