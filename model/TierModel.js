import mongoose from "mongoose"

const TierSchema = mongoose.Schema({
    tier1: Number,
    tier2: Number,
    tier3: Number,
    tier4: Number,
    tier5: Number
})

const TierModel = mongoose.model("tier", TierSchema)

export default TierModel