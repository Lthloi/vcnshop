import couponRoutes from './coupon_routes.js'
import productRoutes from './product_routes.js'
import shopRoutes from './shop_routes.js'
import searchRoutes from './search_routes.js'
import userRoutes from './user_routes.js'

const initRoutes = (app) => {
    app.use('/api', couponRoutes)
    app.use('/api', productRoutes)
    app.use('/api', shopRoutes)
    app.use('/api', searchRoutes)
    app.use('/api', userRoutes)
}

export default initRoutes