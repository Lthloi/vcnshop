import ShopsModel from '../models/shop_schema.js'
import BaseError from '../utils/base_error.js'
import catchAsyncError from '../middlewares/catch_async_error.js'

const getShop = catchAsyncError(async (req, res, next) => {
    if (!req.params.shopUsername)
        throw new BaseError('Wrong request property', 400)

    let shop = await ShopsModel.findOne(
        { username: req.params.shopUsername },
        {
            'products': 0,
            'followers': 0,
        }
    ).lean()

    if (!shop) throw new BaseError('Shop not found', 400)

    res.status(200).json({
        shop,
    })
})

export {
    getShop,
}