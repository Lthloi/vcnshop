import mongoose from "mongoose"

const { VCNSHOP_URI } = process.env

const connectDB = async () => {
    try {
        await mongoose.connect(VCNSHOP_URI)
        console.log('>>> Connect DB successfully')
    } catch (err) {
        console.log('>>> Fail to connect DB >>>', err)
    }
}

export default connectDB