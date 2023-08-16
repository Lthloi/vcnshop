import { configureStore } from '@reduxjs/toolkit'
import product_reducer from './reducers/product_reducer.js'
import cart_reducer from './reducers/cart_reducer.js'
import store_reducer from './reducers/store_reducer.js'
import user_reducer from './reducers/user_reducer.js'
import order_reducer from './reducers/order_reducer.js'

const store = configureStore({
    reducer: {
        product: product_reducer,
        cart: cart_reducer,
        shop: store_reducer,
        user: user_reducer,
        order_for_user: order_reducer.user,
        order_for_store: order_reducer.store,
    },
})

export default store
