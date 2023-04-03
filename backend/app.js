
import 'dotenv/config'
import express from "express"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import initRoutes from './routes/routes.js'
import ErrorHandler from './middlewares/error_handler.js'
import fileUpload from 'express-fileupload'
import cloudinary from 'cloudinary'

const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(fileUpload())

// Return "https" URLs by setting secure: true
cloudinary.v2.config({
    secure: true
})

//create app routes
initRoutes(app)

//create error handler middleware
app.use(ErrorHandler)

export default app