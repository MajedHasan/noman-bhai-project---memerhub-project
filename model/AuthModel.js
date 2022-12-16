import mongoose from "mongoose";

const AuthSchema = mongoose.Schema({
    username: String,
    password: String,
    tier: Number,
    invited: Number,
    invitedFrom: String,
    role: {
        type: String,
        default: 'user'
    }
})

const AuthModel = mongoose.model("users", AuthSchema)

export default AuthModel