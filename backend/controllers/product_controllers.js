import ProductModel from '../models/product_schema.js'
import BaseError from "../utils/base_error.js"
import mongoose from "mongoose"
import { uploadReviewImages, uploadProductImages } from '../utils/image_uploading.js'
import catchAsyncError from "../middlewares/catch_async_error.js"

const createProduct = catchAsyncError(async (req, res, next) => {
    if (!req.files) throw new BaseError('Wrong property name', 400)
    let { images } = req.files
    let {
        productName,
        category,
        targetGender,
        price,
        sizes,
        colors,
        stock,
        description,
        brand,
        productType
    } = req.body
    if (
        !images || !productName || !category ||
        !targetGender || !price || !sizes || !colors || !stock ||
        !description || !productType
    ) throw new BaseError('Wrong property name', 400)

    let shop = req.shop

    let product_id = new mongoose.Types.ObjectId()

    let image_urls = await uploadProductImages(
        images,
        product_id,
        req.user._id
    )

    await ProductModel.create({
        '_id': product_id,
        'image_link': image_urls[0],
        'images': image_urls,
        'name': productName,
        'category': category,
        'for': targetGender,
        'price': {
            value: price * 1,
        },
        'options': {
            'sizes': JSON.parse(sizes),
            'colors': JSON.parse(colors),
        },
        'stock': stock * 1,
        'shop': {
            id: shop._id,
            name: shop.name,
        },
        'description': description,
        'brand': brand || 'No Brand',
        'type': productType,
    })

    res.status(200).json({ success: true })
})

//get a product by _id
const getProduct = catchAsyncError(async (req, res, next) => {
    if (!req.params) throw new BaseError('Params doesn\'t exist', 400)
    if (!req.params.productId) throw new BaseError('Wrong request property', 400)

    let product = await ProductModel.findOne(
        { _id: req.params.productId },
        { 'review.reviews': 0 },
    ).lean()

    if (!product) throw new BaseError('Product not found', 400)

    res.status(200).json({
        product,
    })
})

//get some products by query
const getProducts = catchAsyncError(async (req, res, next) => {
    let queryObject = {}

    let { keyword, category, price, rating, limit, pagination, targetGender, type } = req.query
    if (!limit) throw new BaseError('Wrong request property', 400)

    if (keyword)
        queryObject.name = { $regex: new RegExp(keyword) }
    if (category)
        queryObject.category = category
    if (price)
        queryObject['price.value'] = { $gte: price.gte * 1, $lte: price.lte * 1 }
    if (rating)
        queryObject['review.average_rating'] = { $gte: rating * 1 }
    if (targetGender)
        queryObject.for = { $in: [targetGender] }
    if (type)
        queryObject.type = { $in: [...type] }

    let sort = req.query.sort || { name: 'name', type: 1 }

    let count_product = await ProductModel.countDocuments(queryObject)

    let products = await ProductModel
        .find(queryObject, { 'review.reviews': 0 })
        .skip((pagination - 1) * (limit * 1))
        .sort({ [sort.name]: sort.type })
        .limit(limit * 1)
        .lean()

    if (!products) throw new BaseError('Products Not Found', 404)

    res.status(200).json({
        products,
        countProduct: count_product,
    })
})

const getReviews = catchAsyncError(async (req, res, next) => {
    let { productId, pagination, limit } = req.query
    if (!productId || !pagination || !limit)
        throw new BaseError('Wrong request property', 400)

    //format for query
    pagination *= 1
    pagination -= 1
    limit *= 1

    let review = await ProductModel.aggregate([
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
})

//insert new review to DB
const newReview = catchAsyncError(async (req, res, next) => {
    let { productId } = req.query
    if (!productId) throw new BaseError('Wrong request property', 400)

    let { _id: userId, avatar, name: user_name } = req.user

    let { rating, comment, title, currentReviews } = req.body
    if (!rating || !comment || !title || !currentReviews)
        throw new BaseError('Wrong request property', 400)

    let image_urls
    if (req.files)
        image_urls = await uploadReviewImages(
            req.files.images,
            productId,
            userId
        )

    let user_id_in_string = userId.toString()

    //remove a review existed
    let new_reviews = JSON.parse(currentReviews).filter(({ user_id }) => user_id !== user_id_in_string)

    let new_count_review = new_reviews.length + 1

    let sum_of_previous_ratings = new_reviews.reduce((acc, { rating }) => acc + rating, 0)
    let new_average_rating = sum_of_previous_ratings === 0 ? rating : (sum_of_previous_ratings + rating) / 2

    let new_review = {
        name: user_name,
        user_id: userId,
        avatar,
        createdAt: new Date(),
        rating,
        title,
        comment,
        imageURLs: image_urls || [],
    }

    new_reviews.push(new_review)

    //update review in database
    await ProductModel.updateOne(
        { _id: productId },
        {
            $set: {
                'review.average_rating': new_average_rating,
                'review.count_review': new_count_review,
                'review.reviews': new_reviews,
            },
        },
    )

    res.status(200).json({
        newReview: new_review,
        newAverageRating: new_average_rating,
        newCountReview: new_count_review,
    })
})

const getProductsName = catchAsyncError(async (req, res, next) => {
    let name_list = await ProductModel.distinct('name')
    if (!name_list) throw new BaseError('Something went wrong', 500)

    res.status(200).json({
        list: name_list,
    })
})

const getProductsByAdmin = catchAsyncError(async (req, res, next) => {
    let format = {}

    let field_set = req.query

    for (let key of Object.keys(field_set))
        format[key] = 1

    let list = await ProductModel.find({}, format)
    if (!list) throw new BaseError('Something went wrong', 500)

    res.status(200).json({ list })
})

export {
    getProducts, getProduct, getReviews,
    newReview, getProductsName, getProductsByAdmin,
    createProduct,
}