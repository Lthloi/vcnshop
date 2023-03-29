import ProductsModel from '../models/product_schema.js'
import BaseError from "../utils/base_error.js"
import UsersModel from "../models/user_schema.js"
import storage from '../configs/firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import mongoose from "mongoose"

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

const uploadImages = async (req, res, next) => {
    try {
        let { images } = req.files //array

        if (!(Symbol.iterator in Object(images))) //check if file is iterable ?
            images = [images]

        if (images.length === 0) throw new BaseError('Files is empty', 400)

        let { productId, username } = req.query
        if (!productId || !username) throw new BaseError('Wrong request property', 400)

        let image_urls = []

        let upload_result = await new Promise((resolve, reject) => {
            for (const { name: fileName, data: fileData } of images) {
                let storageRef = ref(storage, '/products/' + 'MongoDBId_' + productId +
                    '/reviews/' + username + '/' + fileName)

                let uploadTask = uploadBytesResumable(storageRef, fileData)

                uploadTask.on(
                    'state_changed',
                    (snapshot) => { },
                    (error) => {
                        switch (error.code) {
                            case 'storage/object-not-found':
                                reject(new BaseError(`File doesn't exist`, 400))
                            case 'storage/unauthorized':
                                reject(new BaseError(
                                    `User doesn't have permission to access the object`, 400
                                ))
                            case 'storage/canceled':
                                reject(new BaseError(`User canceled the upload`, 400))
                            case 'storage/unknown':
                                reject(new BaseError(
                                    `Unknown error occurred, inspect the server response`, 400
                                ))
                        }
                    },
                    async () => {
                        let downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        image_urls.push(downloadURL)

                        if (image_urls.length === images.length) {

                            image_urls = Array.from(new Set(image_urls))

                            resolve('Upload Done')
                        }
                    }
                )
            }
        })

        if (upload_result instanceof Error) throw upload_result

        res.status(200).json({
            uploadImagesMessage: 'Success to upload the images',
            imageURLs: image_urls,
        })
    } catch (error) {
        next(error)
    }
}

//insert new review to DB
const newReview = async (req, res, next) => {
    try {
        let { username: user_username, productId } = req.query
        let { rating, comment, title, currentAverageRating } = req.body

        if (!user_username || !productId || !rating || !comment || !title)
            throw new BaseError('Wrong request property', 400)
        if (currentAverageRating * 1 !== 0 && !currentAverageRating)
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

        //update counting star
        let starUpdate = { 'review.count_review': 1, }
        if (rating === 1) starUpdate['review.count_star.star_1'] = 1
        else if (rating === 2) starUpdate['review.count_star.star_2'] = 1
        else if (rating === 3) starUpdate['review.count_star.star_3'] = 1
        else if (rating === 4) starUpdate['review.count_star.star_4'] = 1
        else if (rating === 5) starUpdate['review.count_star.star_5'] = 1

        //update review in database
        let { review: updated_review } = await ProductsModel.findOneAndUpdate(
            { _id: productId },
            {
                $set: {
                    'review.average_rating': currentAverageRating !== 0 ?
                        ((currentAverageRating + rating * 1) / 2).toFixed(2) * 1 : rating * 1,
                },
                $inc: starUpdate,
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
    uploadImages, newReview, getProductStock,
}