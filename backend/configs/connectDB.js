import mongoose from "mongoose"

const { VCNSHOP_URI } = process.env

const connectDB = async () => {
    try {
        await mongoose.connect(VCNSHOP_URI, { autoIndex: false })
        console.log('>>> connect DB successfully')
    } catch (err) {
        console.log('>>> fail to connect DB >>>', err)
    }
}

export default connectDB