import { EXPRESS_SERVER } from "../configs/constants"

const get_shop_api = EXPRESS_SERVER + '/api/shop/getShop/'
const create_shop_api = EXPRESS_SERVER + '/api/shop/createShop/'
const get_shops_by_admin_api = EXPRESS_SERVER + '/api/shop/getShopsByAdmin/'

export {
    get_shop_api,
    create_shop_api,
    get_shops_by_admin_api,
}