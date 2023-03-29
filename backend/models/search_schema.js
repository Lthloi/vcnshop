import mongoose from 'mongoose'

const { Schema } = mongoose

const searchSchema = new Schema({
    suggestions: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const searchModel = mongoose.model('search', searchSchema)

export default searchModel