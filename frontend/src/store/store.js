import { configureStore } from '@reduxjs/toolkit'
import product_reducer from './reducers/product_reducer.js'
import cart_reducer from './reducers/cart_reducer.js'
import shop_reducer from './reducers/shop_reducer.js'
import search_reducer from './reducers/search_reducer.js'
import user_reducer from './reducers/user_reducer.js'
import order_reducer from './reducers/order_reducer.js'

export default configureStore({
    reducer: {
        product: product_reducer,
        cart: cart_reducer,
        shop: shop_reducer,
        search: search_reducer,
        user: user_reducer,
        order: order_reducer,
    },
})
