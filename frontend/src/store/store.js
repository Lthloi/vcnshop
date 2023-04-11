import { configureStore } from '@reduxjs/toolkit'
import products_reducer from './reducers/products_reducer.js'
import cart_reducer from './reducers/cart_reducer.js'
import coupons_reducer from './reducers/coupons_reducer.js'
import product_detail_reducer from './reducers/product_detail_reducer.js'
import shop_reducer from './reducers/shop_reducer.js'
import search_reducer from './reducers/search_reducer.js'
import user_reducer from './reducers/user_reducer.js'

export default configureStore({
    reducer: {
        products: products_reducer,
        cart: cart_reducer,
        coupons: coupons_reducer,
        productDetail: product_detail_reducer,
        shop: shop_reducer,
        search: search_reducer,
        user: user_reducer,
    },
})
