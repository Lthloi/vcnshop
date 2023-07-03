import ProductModel from '../models/product_schema.js'
import BaseError from "../utils/base_error.js"
import mongoose from "mongoose"
import { uploadReviewImages, uploadProductImages } from '../utils/image_uploading.js'
import catchAsyncError from "../middlewares/catch_async_error.js"
import ShopModel from '../models/shop_schema.js'

const createProduct = catchAsyncError(async (req, res, next) => {
    if (!req.files) throw new BaseError('Wrong OOOOOOO property name', 400)

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
    } = req.body
    if (
        !images || !productName || !category ||
        !targetGender || !price || !sizes || !colors || !stock ||
        !description
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
    })

    await ShopModel.updateOne(
        { '_id': shop._id },
        {
            $push: {
                'products.ids': {
                    $each: [product_id],
                    $position: 0,
                }
            }
        }
    )

    res.status(200).json({ success: true })
})

const updateProduct = catchAsyncError(async (req, res, next) => {
    if (!req.files) throw new BaseError('Wrong property name', 400)
    let { images } = req.files
    let {
        sizes,
        colors,
        stock,
        description,
        productId
    } = req.body
    if (
        !images && !sizes && !colors && !stock &&
        !description && !productId
    ) throw new BaseError('Wrong property name', 400)

    let update_format = {}

    if (images) {
        let image_urls = await uploadProductImages(
            images,
            productId,
            req.user._id
        )
        update_format = {
            'image_link': image_urls[0],
            'images': image_urls,
        }
    }
    if (sizes) {
        update_format = {
            ...update_format,
            'options.sizes': JSON.parse(sizes),
        }
    }
    if (colors) {
        update_format = {
            ...update_format,
            'options.colors': JSON.parse(colors),
        }
    }
    if (stock) {
        update_format = {
            ...update_format,
            'stock': stock,
        }
    }
    if (description) {
        update_format = {
            ...update_format,
            'description': description,
        }
    }

    await ProductModel.updateOne(
        { '_id': productId },
        { $set: update_format }
    )

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
    let { keyword, category, price, rating, limit, page, targetGender, shopId, stock } = req.query
    if (!limit || !page)
        throw new BaseError('Wrong request property', 400)

    let queryObject = {}

    if (keyword)
        queryObject.name = { $regex: new RegExp(keyword, 'i') }
    if (category)
        queryObject.category = category
    if (price)
        queryObject['price.value'] = { $gte: price.gte * 1, $lte: price.lte * 1 }
    if (rating)
        queryObject['review.average_rating'] = { $gte: rating * 1 }
    if (targetGender)
        queryObject.for = targetGender
    if (shopId)
        queryObject['shop.id'] = mongoose.Types.ObjectId(shopId)
    if (stock)
        queryObject.stock = { $gte: stock.gte, $lte: stock.lte }

    let sort = req.query.sort || { name: 'name', type: 1 }

    let count_product = await ProductModel.countDocuments(queryObject)

    let products = await ProductModel
        .find(queryObject, { 'review.reviews': 0 })
        .skip((page * 1 - 1) * (limit * 1)) // multiple with 1 for casting string to number
        .sort({ [sort.name]: sort.type })
        .limit(limit * 1)
        .lean()

    if (!products) throw new BaseError('Products Not Found', 404)

    res.status(200).json({
        products,
        countProducts: count_product,
    })
})

const getReviews = catchAsyncError(async (req, res, next) => {
    let { productId, page, limit } = req.query
    if (!productId || !page || !limit)
        throw new BaseError('Wrong request property', 400)

    //format for query
    page *= 1
    page -= 1
    limit *= 1

    let review = await ProductModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(productId) } },
        {
            $project: {
                '_id': 0,
                reviews: {
                    $slice: ['$review.reviews', page * limit, limit],
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
    createProduct, updateProduct,
}