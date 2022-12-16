import mongoose from "mongoose"

const ButtonsSchema = mongoose.Schema({
    inviteButtonText: String,
    instantAccessButtonText: String,
    instantAccessButtonLink: String
})

const ButtonsModel = mongoose.model("buttons", ButtonsSchema)

export default ButtonsModel