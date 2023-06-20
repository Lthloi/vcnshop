import ShopModel from '../models/shop_schema.js'
import BaseError from '../utils/base_error.js'
import catchAsyncError from '../middlewares/catch_async_error.js'

const getShop = catchAsyncError(async (req, res, next) => {
    let query = {}
    if (req.params && req.params.shopId) query.shopId = req.params.shopId
    else if (req.user && req.user._id) query.user = { id: req.user._id }

    if (!query.shopId && !query.user)
        throw new BaseError('Wrong request property', 400)

    let shop = await ShopModel.findOne(
        query,
        {
            'products': 0,
            'followers': 0,
        }
    ).lean()

    if (!shop) throw new BaseError('Shop not found', 404)

    res.status(200).json({
        shop,
    })
})

const createShop = catchAsyncError(async (req, res, next) => {
    let { storeName, greeting, phone_number } = req.body
    if (!storeName || !greeting || !phone_number)
        throw new BaseError('Wrong property name', 400)

    let user_id = req.user._id

    let shop = new ShopModel({
        'name': storeName,
        'greeting': greeting,
        'user': {
            id: user_id,
        },
        'contact_info': {
            phone: phone_number,
        },
    })

    await shop.save({ validateBeforeSave: true })

    res.status(200).json({ shop })
})

const getShopsByAdmin = catchAsyncError(async (req, res, next) => {
    let format = {}

    let field_set = req.query

    for (let key of Object.keys(field_set))
        format[key] = 1

    let list = await ShopModel.find({}, format)
    if (!list) throw new BaseError('Something went wrong', 500)

    res.status(200).json({ list })
})

export {
    getShop, createShop, getShopsByAdmin,
}