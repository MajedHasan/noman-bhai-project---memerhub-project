import asyncHandler from "express-async-handler"
import NotificationModel from "../model/NotificationModel.js"


export const getNotification = asyncHandler(async (req, res) => {

    const userId = req.user.id

    const notification = await NotificationModel.find({ invitedFrom: userId })

    res.status(200).json(notification)
})