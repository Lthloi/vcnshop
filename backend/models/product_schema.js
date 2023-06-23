import mongoose from 'mongoose'

const { Schema } = mongoose

const ProductSchema = new Schema({
    image_link: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        maxLength: [50, 'The length of the name of the product don\'t have to exceed 50 letters']
    },
    category: {
        type: String,
        required: true,
        enum: ['Shirt', 'Pant'],
    },
    for: [{
        type: String,
        default: 'Unisex',
        enum: ['Male', 'Female', 'Unisex'],
    }],
    price: {
        value: {
            type: Number,
            required: true,
            min: [0, 'Number of value must not smaller than or equal 0'],
        },
        currency: {
            type: String,
            default: 'USD',
        }
    },
    shop: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'shops',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    sold: {
        count: {
            type: Number,
            default: 0,
            min: [0, 'Number of count must not smaller than or equal 0'],
        },
        is_sold_last_time: {
            type: Date,
        }
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Number of stock must not smaller than or equal 0'],
    },
    options: {
        sizes: [{ type: String, }],
        colors: [{ type: String, }],
    },
    images: [{ type: String }],
    description: {
        type: String,
        required: true,
        maxLength: [500, 'The length of the description of the product don\'t have to exceed 150 letters']
    },
    review: {
        average_rating: {
            type: Number,
            default: 0,
            min: [0, 'Number of average rating must not smaller than or equal 0'],
        },
        count_review: {
            type: Number,
            default: 0,
            min: [0, 'Number of count review must not smaller than or equal 0'],
        },
        reviews: [{
            name: { type: String, required: true, },
            user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
            avatar: { type: String, required: true, },
            createdAt: { type: Date, default: Date.now },
            rating: { type: Number, required: true, },
            title: { type: String, required: true, },
            comment: { type: String, required: true, },
            imageURLs: [{ type: String }],
        }]
    },
    type: {
        type: String,
        maxLength: [30, 'The length of the type of the product don\'t have to exceed 30 letters']
    },
    brand: {
        type: String,
        default: 'No Brand',
        maxLength: [50, 'The length of the brand of the product don\'t have to exceed 50 letters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const ProductModel = mongoose.model('products', ProductSchema)

export default ProductModel