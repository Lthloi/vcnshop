import express from 'express'
import {
    getProducts, getProduct, getReviews,
    newReview, getAllNames, getProductsByAdmin,
    createProduct, updateProduct, deleteProduct,
    getProductsById,
} from '../controllers/product_controllers.js'
import { roleAuthorization, verifyJWTtoken, verifyShop } from '../middlewares/auth.js'

const router = express.Router()

router.get('/getProducts', getProducts)

router.get('/getProduct/:productId', getProduct)

router.get('/getReviews', getReviews)

router.post('/newReview', verifyJWTtoken, newReview)

router.get('/getProductsName', getAllNames)

router.get('/getProductsByAdmin', verifyJWTtoken, roleAuthorization('Admin'), getProductsByAdmin)

router.post('/createProduct', verifyJWTtoken, verifyShop, createProduct)

router.post('/updateProduct', verifyJWTtoken, verifyShop, updateProduct)

router.delete('/deleteProduct/:productId', verifyJWTtoken, verifyShop, deleteProduct)

router.get('/getProductsById', getProductsById)

export default router