import asyncHandler from "express-async-handler";
import ButtonsModel from "../model/ButtonsModel.js";

export const getButtons = asyncHandler(async (req, res) => {
    const buttons = await ButtonsModel.findOne()

    if (!buttons) {
        res.status(404)
        throw new Error("Buttons Not Found")
    }

    res.status(200).json(buttons)
})


export const updateButtons = asyncHandler(async (req, res) => {
    const buttons = req.body

    const updatedButtons = await ButtonsModel.findOneAndUpdate({}, buttons, { new: true })

    res.status(201).json(updateButtons)
})