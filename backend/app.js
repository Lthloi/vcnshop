
import 'dotenv/config'
import express from "express"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import initRoutes from './routes/routes.js'
import ErrorHandler from './middlewares/error_handler.js'
import fileUpload from 'express-fileupload'
import './configs/cloudinary.js'

const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true })) //handle data with form-data
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

//config for req.files
app.use(fileUpload())

//create app routes
initRoutes(app)

//create error handler middleware
app.use(ErrorHandler)

export default app