import express from 'express'
import {
    getProducts, getProduct, getReviews,
    newReview, getProductsName, getProductsByAdmin,
    createProduct,
} from '../controllers/product_controllers.js'
import { roleAuthorization, verifyJWTtoken } from '../middlewares/auth.js'

const router = express.Router()

router.get('/getProducts', getProducts)

router.get('/getProduct/:productId', getProduct)

router.get('/getReviews', getReviews)

router.post('/newReview', verifyJWTtoken, newReview)

router.get('/getProductsName', getProductsName)

router.get('/getProductsByAdmin', verifyJWTtoken, roleAuthorization('Admin'), getProductsByAdmin)

router.post('/createProduct', verifyJWTtoken, createProduct)

export default router