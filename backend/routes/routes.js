import couponRoutes from './coupon_routes.js'
import productRoutes from './product_routes.js'
import shopRoutes from './shop_routes.js'
import searchRoutes from './search_routes.js'

const initRoutes = (app) => {
    app.use('/api', couponRoutes)
    app.use('/api', productRoutes)
    app.use('/api', shopRoutes)
    app.use('/api', searchRoutes)
}

export default initRoutes