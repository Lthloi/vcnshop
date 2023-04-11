import 'dotenv/config'
import express from "express"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import initRoutes from './routes/routes.js'
import ErrorHandler from './middlewares/error_handler.js'
import fileUpload from 'express-fileupload'
import session from 'express-session'
import mongoStore from './configs/session_store.js'

const { SESSION_SECRET } = process.env

const app = express()

//body
app.use(bodyParser.urlencoded({ extended: true })) //handle data with form-data
app.use(bodyParser.json())
app.use(express.json())

//session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
}))

//cookie
app.use(cookieParser())

//cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

//config for req.files
app.use(fileUpload())

//create app routes
initRoutes(app)

//create error handler middleware
app.use(ErrorHandler)

export default app