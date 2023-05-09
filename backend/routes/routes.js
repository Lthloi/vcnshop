import productRoutes from './product_routes.js'
import shopRoutes from './shop_routes.js'
import searchRoutes from './search_routes.js'
import userRoutes from './user_routes.js'
import orderRoutes from './order_routes.js'

const initRoutes = (app) => {
    app.use('/api', productRoutes)
    app.use('/api', shopRoutes)
    app.use('/api', searchRoutes)
    app.use('/api', userRoutes)
    app.use('/api', orderRoutes)
}

export default initRoutes