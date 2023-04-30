
import 'dotenv/config'
import app from "./app.js"
import connectMongoDB from '../backend/configs/connectDB.js'
import './configs/cloudinary.js'

//process error
process.on("uncaughtException", (error) => {
    console.log(">>> UNCAUGHT EXCEPTION !!!")
    console.log('>>> Error message >>>', error.message)
    console.log('>>> Error name >>>', error.name)
    console.log(">>> Error >>>", error)
    process.exit(1)
})

//connect to database
connectMongoDB()

const { PORT } = process.env || 8080

const server = app.listen(PORT, () => {
    console.log(`>>> Server is working on http://localhost:${PORT}`)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('>>> UNHANDLED REJECTION !!!')
    console.log('>>> Reason >>>', reason)
    console.log('>>> Promise >>>', promise)
    process.exit(1)
})