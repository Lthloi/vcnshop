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

const SearchModel = mongoose.model('search', searchSchema)

export default SearchModel