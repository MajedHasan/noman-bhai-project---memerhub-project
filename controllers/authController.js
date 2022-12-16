import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import AuthModel from "../model/AuthModel.js"
import TierModel from "../model/TierModel.js"
import NotificationModel from "../model/NotificationModel.js"


// @desc Register new User
// @route POST - /api/auth/register
// @access Public
export const register = asyncHandler(async (req, res) => {
    const { username, password, invitedFrom } = req.body
    const isInvitedFrom = invitedFrom ? invitedFrom : null

    if (!username || !password) {
        res.status(400)
        throw new Error("All field are required")
    }

    // Check if user Exists
    const userExists = await AuthModel.findOne({ username })

    if (userExists) {
        res.status(409)
        throw new Error("User already exists")
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await AuthModel.create({ username, password: hashedPassword, tier: 0, invited: 0, invitedFrom: isInvitedFrom })

    if (user) {

        if (isInvitedFrom) {
            try {
                const tier = await TierModel.findOne()
                const findInvitedUser = await AuthModel.findById(isInvitedFrom)
                let updateInvitedUser = { ...findInvitedUser._doc, invited: findInvitedUser.invited + 1 }

                if (updateInvitedUser.invited === tier?.tier1 || updateInvitedUser.invited === tier?.tier2 || updateInvitedUser.invited === tier?.tier3 || updateInvitedUser.invited === tier?.tier4 || updateInvitedUser.invited === tier?.tier5) {
                    updateInvitedUser = { ...updateInvitedUser, tier: findInvitedUser.tier + 1 }
                }

                const updated = await AuthModel.findByIdAndUpdate(updateInvitedUser._id, updateInvitedUser, { new: true })

                if (updated) {
                    let msg
                    let bgColor

                    if (updated.invited === tier?.tier1 || updated.invited === tier?.tier2 || updated.invited === tier?.tier3 || updated.invited === tier?.tier4 || updated.invited === tier?.tier5) {
                        msg = `Congrats! ${updated.username}. You has invited ${updated.invited} person. You are now Trier ${updated.trier}`;
                        bgColor = "yellow";
                    }
                    else {
                        msg = `You has invited to ${username}`;
                        bgColor = "#F1F1F1";
                    }

                    const sendNotification = await NotificationModel.create({ invitedFrom: isInvitedFrom, username: username, bgColor: bgColor, msg: msg })
                }
            } catch (error) {
                throw new Error("Invited from wrong user")
            }
        }

        const { password, ...others } = await user._doc
        res.status(201).json({ ...others, token: generateToken(others._id) })
    }
    else {
        res.status(400)
        throw new Error("Invalid user Data")
    }
})


// @desc Login the user
// @route POST - /api/auth/login
// @access Public

export const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400)
        throw new Error("All field are required!")
    }

    // Check if the user have
    const user = await AuthModel.findOne({ username: username })

    if (!user) {
        res.status(404)
        throw new Error("User not found!")
    }

    // Check the user password are correct
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            username: user.username,
            invited: user.invited,
            tier: user.tier,
            invitedFrom: user.invitedFrom,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error("Invalid Credentials")
    }
})



// @desc TO check the user and get the result
// @route GET /api/auth/getMe
// @access Private
export const getMe = asyncHandler(async (req, res) => {

    if (req.user) {
        res.status(200).json({
            ...req.user._doc,
            token: generateToken(req.user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Not Found")
    }
})


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}