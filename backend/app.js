import 'dotenv/config'
import express from "express"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import initRoutes from './routes/routes.js'
import ErrorHandler from './middlewares/error_handler.js'
import fileUpload from 'express-fileupload'

const app = express()

//block requests from a origin is different with own origin
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

//body
app.use(bodyParser.urlencoded({ extended: true })) //handle data with form-data
app.use(bodyParser.json())
app.use(express.json())

//cookie
app.use(cookieParser())

//config for req.files
app.use(fileUpload())

//create app routes
initRoutes(app)

//create error handler middleware
app.use(ErrorHandler)

export default app