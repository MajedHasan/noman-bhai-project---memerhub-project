import asyncHandler from "express-async-handler"
import MediaModel from "../model/MediaModel.js"



export const getMedia = asyncHandler(async (req, res) => {

    const limit = req.query.limit
    const skip = req.query.skip

    const media = await MediaModel.find({ tier: { $lte: req.user.tier } }).limit(limit).skip(skip)
    res.status(200).json(media)
})

export const getMediaForTier = asyncHandler(async (req, res) => {

    const limit = req.query.limit
    const skip = req.query.skip

    const tier = req.params.tier
    const media = await MediaModel.find({ tier: tier }).limit(limit).skip(skip)
    res.status(200).json(media)
})

export const addMedia = asyncHandler(async (req, res) => {

    const { name, tier, file, type } = req.body
    const path = type === "image" ? "media/image/" : "media/video/"

    const addMedia = await MediaModel.create({ name, tier, type, path, url: file })
    if (!addMedia) {
        res.status(400)
        throw new Error("Something went wrong")
    }
    res.status(200).json(addMedia)

})

export const updateMedia = asyncHandler(async (req, res) => {
    const id = req.params.id
    const meme = req.body

    const updatedMeme = await MediaModel.findByIdAndUpdate(id, meme, { new: true })

    if (!updatedMeme) {
        res.status(400)
        throw new Error("Something went wrong")
    }
    res.status(201).json(updatedMeme)
})

export const deleteMedia = asyncHandler(async (req, res) => {
    const id = req.params.id

    const deleteMeme = await MediaModel.findByIdAndDelete(id)
    res.status(201).json(deleteMeme)
})

export const getAllMemes = asyncHandler(async (req, res) => {
    const limit = req.query.limit
    const skip = req.query.skip
    const memes = await MediaModel.find().limit(limit).skip(skip)
    res.status(200).json(memes)
})

export const getSingleMeme = asyncHandler(async (req, res) => {
    const memeId = req.params.id
    const meme = await MediaModel.findById(memeId)

    if (!meme) {
        res.status(404)
        throw new Error("Meme Not found")
    }
    res.status(200).json(meme)
})