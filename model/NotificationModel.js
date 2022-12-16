import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema({
    invitedFrom: String,
    username: String,
    bgColor: String,
    msg: String
})

const NotificationModel = mongoose.model("notification", NotificationSchema)

export default NotificationModel