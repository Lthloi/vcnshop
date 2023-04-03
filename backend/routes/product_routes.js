import express from 'express'
import {
    getProducts, getProduct, getReviews,
    newReview, getProductStock,
} from '../controllers/product_controllers.js'

const router = express.Router()

router.get('/getProducts', getProducts)

router.get('/getProduct/:productId', getProduct)

router.get('/getReviews', getReviews)

router.post('/newReview', newReview)

router.get('/getProductStock', getProductStock)

export default router