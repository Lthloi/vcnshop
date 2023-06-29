import express from 'express'
import {
    getProducts, getProduct, getReviews,
    newReview, getProductsName, getProductsByAdmin,
    createProduct, updateProduct,
} from '../controllers/product_controllers.js'
import { roleAuthorization, verifyJWTtoken, verifyShop } from '../middlewares/auth.js'

const router = express.Router()

router.get('/getProducts', getProducts)

router.get('/getProduct/:productId', getProduct)

router.get('/getReviews', getReviews)

router.post('/newReview', verifyJWTtoken, newReview)

router.get('/getProductsName', getProductsName)

router.get('/getProductsByAdmin', verifyJWTtoken, roleAuthorization('Admin'), getProductsByAdmin)

router.post('/createProduct', verifyJWTtoken, verifyShop, createProduct)

router.post('/updateProduct', verifyJWTtoken, verifyShop, updateProduct)

export default router