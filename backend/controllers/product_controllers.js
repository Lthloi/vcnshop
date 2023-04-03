import ProductsModel from '../models/product_schema.js'
import BaseError from "../utils/base_error.js"
import UsersModel from "../models/user_schema.js"
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
        let { rating, comment, title } = req.body

        if (!user_username || !productId || !rating || !comment || !title)
            throw new BaseError('Wrong request property', 400)

        let user_info = await UsersModel.findOne(
            { username: user_username },
            { 'name': 1, 'avatar': 1 }
        ).lean()
        if (!user_info) throw new BaseError('User not found', 400)

        let new_review = {
            name: user_info.name,
            username: user_username,
            avatar: user_info.avatar,
            createdAt: new Date(),
            rating,
            title,
            comment,
            imageURLs: req.body.imageURLs || [],
        }

        if (req.files && req.files.images && req.files.images.length > 0)
            await uploadImages(req.files.images)

        //remove a review existed 
        let { review: { reviews: previous_ratings } } = await ProductsModel.findOneAndUpdate(
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

        let sum_of_previous_ratings = previous_ratings.reduce((acc, curr) => acc + curr, 0)
        let filter_rating = previous_ratings.filter((previous_rating) => previous_rating === rating)

        //update review in database
        let { review: updated_review } = await ProductsModel.findOneAndUpdate(
            { _id: productId },
            {
                $set: {
                    'review.average_rating':
                        sum_of_previous_ratings === 0 ? rating : (sum_of_previous_ratings + rating) / 2,
                    'review.count_review': previous_ratings.length + 1,
                    ['review.count_star.star_' + rating]: filter_rating.length + 1,
                },
                $push: {
                    'review.reviews': {
                        $each: [new_review],
                        $position: 0,
                    }
                }
            },
            {
                new: true,
                projection: {
                    '_id': 0,
                    'review.count_review': 1,
                    'review.average_rating': 1,
                    'review.count_star': 1,
                },
            }
        ).lean()

        res.status(200).json({
            newReview: new_review,
            newAverageRating: updated_review.average_rating,
            newCountReview: updated_review.count_review,
            newCountStar: updated_review.count_star,
        })
    } catch (error) {
        next(error)
    }
}

const getProductStock = async (req, res, next) => {
    try {
        let { productId } = req.query
        if (!productId) throw new BaseError('Wrong request property', 400)

        let product = await ProductsModel.findOne(
            { _id: productId },
            { 'stock': 1 },
        )

        if (!product) throw new BaseError('Stock Not Found', 404)

        res.status(200).json({
            stock: product.stock,
        })
    } catch (error) {
        next(error)
    }
}

export {
    getProducts, getProduct, getReviews,
    newReview, getProductStock,
}