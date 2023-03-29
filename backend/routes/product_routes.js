import express from 'express'
import {
    getProducts, getProduct, getReviews,
    uploadImages, newReview, getProductStock,
} from '../controllers/product_controllers.js'
import filesHandler from '../middlewares/files_handler.js'

const router = express.Router()

router.get('/getProducts', getProducts)

router.get('/getProduct/:productId', getProduct)

router.get('/getReviews', getReviews)

router.post('/newReview', newReview)

router.post('/uploadImages', filesHandler, uploadImages)

router.get('/getProductStock', getProductStock)

export default router