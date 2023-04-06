import ProductsModel from '../models/product_schema.js'
import BaseError from "../utils/base_error.js"
import mongoose from "mongoose"
import uploadImages from '../utils/upload_images.js'

//get a product by _id
const getProduct = async (req, res, next) => {
    try {
        if (!req.params) throw new BaseError('Params doesn\'t exist', 400)
        if (!req.params.productId) throw new BaseError('Wrong request property', 400)

        let product = await ProductsModel.findOne(
            { _id: req.params.productId },
            { 'review.reviews': 0 },
        ).lean()

        if (!product) throw new BaseError('Product not found', 400)

        res.status(200).json({
            product,
        })
    } catch (error) {
        next(error)
    }
}

//get some products by query
const getProducts = async (req, res, next) => {
    try {
        let queryObject = {}

        let { keyword, category, price, rating, limit, pagination, for: forWho, type } = req.query
        if (!limit) throw new BaseError('Wrong request property', 400)

        if (keyword)
            queryObject.name = { $regex: new RegExp(keyword) }
        if (category)
            queryObject.category = category
        if (price)
            queryObject['price.value'] = { $gte: price.gte * 1, $lte: price.lte * 1 }
        if (rating)
            queryObject['review.average_rating'] = { $gte: rating * 1 }
        if (forWho)
            queryObject.for = { $in: [forWho] }
        if (type)
            queryObject.type = { $in: [...type] }

        let sort = req.query.sort || { name: 'name', type: 1 }

        let count_product = await ProductsModel.countDocuments(queryObject)

        let products = await ProductsModel
            .find(queryObject, { 'review.reviews': 0 })
            .skip((pagination - 1) * (limit * 1))
            .sort({ [sort.name]: sort.type })
            .limit(limit)
            .lean()

        if (!products) throw new BaseError('Products Not Found', 404)

        res.status(200).json({
            products,
            countProduct: count_product,
        })
    } catch (error) {
        next(error)
    }
}

const getReviews = async (req, res, next) => {
    try {
        let { productId, pagination, limit } = req.query
        if (!productId || !pagination || !limit)
            throw new BaseError('Wrong request property', 400)

        //format for query
        pagination *= 1
        pagination -= 1
        limit *= 1

        let review = await ProductsModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(productId) } },
            {
                $project: {
                    '_id': 0,
                    reviews: {
                        $slice: ['$review.reviews', pagination * limit, limit],
                    }
                }
            }
        ])

        if (!review || !review[0].reviews) throw new BaseError('Reviews Not Found', 404)

        res.status(200).json({
            reviews: review[0].reviews,
        })
    } catch (error) {
        next(error)
    }
}

//insert new review to DB
const newReview = async (req, res, next) => {
    try {
        let { username: user_username, productId } = req.query
        if (!user_username || !productId) throw new BaseError('Wrong request property', 400)

        let { rating, comment, title } = req.body
        if (!rating || !comment || !title) throw new BaseError('Wrong request property', 400)

        let [image_urls, upload_error] = await uploadImages(req.files, productId, user_username)
        if (upload_error instanceof Error) throw upload_error

        //remove a review existed 
        let product_after_remove_review = await ProductsModel.findOneAndUpdate(
            { _id: productId },
            { $pull: { 'review.reviews': { username: user_username } } },
            {
                new: true,
                projection: {
                    '_id': 0,
                    'review.reviews.rating': 1,
                },
            }
        ).lean()
        if (!product_after_remove_review) throw new BaseError('Product not found', 404)

        let new_count_review = product_after_remove_review.review.reviews.length + 1

        let sum_of_previous_ratings = product_after_remove_review.review.reviews.reduce((acc, curr) => acc + curr, 0)
        let new_average_rating = sum_of_previous_ratings === 0 ? rating : (sum_of_previous_ratings + rating) / 2

        let new_review = {
            name: 'VCN MAX',
            username: 'vcnmax',
            avatar: 'https://img.freepik.com/premium-vector/cute-fox-sitting-cartoon-character-animal-nature-isolated_138676-3172.jpg?w=2000',
            createdAt: new Date(),
            rating,
            title,
            comment,
            imageURLs: image_urls || [],
        }

        //update review in database
        await ProductsModel.updateOne(
            { _id: productId },
            {
                $set: {
                    'review.average_rating': new_average_rating,
                    'review.count_review': new_count_review,
                },
                $push: {
                    'review.reviews': {
                        $each: [new_review],
                        $position: 0,
                    }
                }
            },
        )

        res.status(200).json({
            newReview: new_review,
            newAverageRating: new_average_rating,
            newCountReview: new_count_review,
        })
    } catch (error) {
        next(error)
    }
}

export {
    getProducts, getProduct, getReviews,
    newReview,
}