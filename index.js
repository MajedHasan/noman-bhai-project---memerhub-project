import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import errorHandler from "./middleware/errorMiddleware.js"
import notificationRoutes from "./routes/notificationRoute.js"
import mediaRoutes from "./routes/mediaRoute.js"
import buttons from "./routes/buttonsRoute.js"
import tier from "./routes/tierRoutes.js"
import siteText from "./routes/siteTextRoute.js"
import multer from "multer"
// import bodyParser from "body-parser"


// Call Dot Env file
dotenv.config()

// Setup the PORT
const PORT = process.env.PORT || 5000

// Call the app
const app = express()

// Call the Database Function to Connect with Database
connectDB()


// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static("public"))


// Routes
app.use("/api/auth", authRoutes)
app.use("/api/notification", notificationRoutes)
app.use("/api/media", mediaRoutes)
app.use("/api/siteInfo/buttons", buttons)
app.use("/api/siteInfo/tier", tier)
app.use("/api/siteInfo/sitetext", siteText)

app.get("/", (req, res) => {
    res.send("Server is Running")
})

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/media/image`)
    }, filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const imageUpload = multer({ storage: imageStorage })

const videoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `../public/media/video`)
    }, filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const videoUpload = multer({ storage: videoStorage })

app.post("/api/upload/image", imageUpload.single("file"), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})
app.post("/api/upload/video", videoUpload.single("file"), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})


// Error Middleware to handle error
app.use(errorHandler)



// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))