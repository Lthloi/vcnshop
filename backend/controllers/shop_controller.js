import ShopModel from '../models/shop_schema.js'
import BaseError from '../utils/base_error.js'
import catchAsyncError from '../middlewares/catch_async_error.js'
import UserModel from '../models/user_schema.js'

const getShop = catchAsyncError(async (req, res, next) => {
    let shop = await ShopModel.findOne(
        { '_id': req.user.shop.id },
        {
            'products': 0,
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

    let shop = await ShopModel.create({
        'name': storeName,
        'greeting': greeting,
        'user': {
            id: user_id,
        },
        'contact_info': {
            phone: phone_number,
        },
    })

    await UserModel.updateOne({ '_id': user_id }, { $set: { 'shop.id': shop._id } })

    res.status(200).json({ shop })
})

const getShopsByAdmin = catchAsyncError(async (req, res, next) => {
    let format = {}

    let field_set = req.query

    for (let key of Object.keys(field_set))
        format[key] = 1

    let list = await ShopModel.find({}, format)

    res.status(200).json({ list })
})

export {
    getShop, createShop, getShopsByAdmin,
}