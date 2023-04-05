import express from 'express'
import {
    getProducts, getProduct, getReviews,
    newReview,
} from '../controllers/product_controllers.js'

const router = express.Router()

router.get('/getProducts', getProducts)

router.get('/getProduct/:productId', getProduct)

router.get('/getReviews', getReviews)

router.post('/newReview', newReview)

export default router