import mongoose from 'mongoose'

const { Schema } = mongoose

const ProductsSchema = new Schema({
    image_link: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    for: {
        type: String,
    },
    price: {
        value: {
            type: Number,
            required: true,
            min: 0,
            min: [0, 'Number of `value` must not smaller than or equal 0'],
        },
        currency: {
            type: Number,
            required: true,
            default: 'USD',
        }
    },
    shop: {
        type: Object,
        required: true,
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        }
    },
    sold: {
        count: {
            type: Number,
            required: true,
            default: 0,
            min: [0, 'Number of `count` must not smaller than or equal 0'],
        },
        in_a_week: {
            type: Number,
            required: true,
            default: 0,
            min: [0, 'Number of `in_a_week` must not smaller than or equal 0'],
        }
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Number of `stock` must not smaller than or equal 0'],
    },
    sku: {
        type: String,
        required: true,
    },
    options: {
        size: [{ type: String, }],
        color: [{ type: String, }],
    },
    images: [{ type: String }],
    description: {
        type: String,
        required: true,
    },
    sale: {
        off: {
            type: String,
            default: '0',
        },
    },
    review: {
        average_rating: {
            type: Number,
            default: 0,
            min: [0, 'Number of `average rating` must not smaller than or equal 0'],
        },
        count_review: {
            type: Number,
            default: 0,
            min: [0, 'Number of `count review` must not smaller than or equal 0'],
        },
        reviews: [{
            name: { type: String, required: true, },
            username: { type: String, required: true, },
            avatar: { type: String, required: true, },
            createdAt: { type: Date, default: Date.now },
            rating: { type: Number, required: true, },
            title: { type: String, required: true, },
            comment: { type: String, required: true, },
            imageURLs: [{ type: String }],
        }]
    },
    'type': {
        type: String,
    },
    brand: {
        type: String,
        default: 'No Brand',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const ProductsModel = mongoose.model('products', ProductsSchema)

export default ProductsModel