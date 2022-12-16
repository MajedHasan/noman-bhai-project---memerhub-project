import mongoose from "mongoose"

const MediaSchema = mongoose.Schema({
    name: String,
    url: String,
    path: String,
    tier: Number,
    type: String
})

const MediaModel = mongoose.model("media", MediaSchema)

export default MediaModel