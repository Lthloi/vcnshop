import { EXPRESS_SERVER } from "../configs/constants"

const complete_place_order_api = EXPRESS_SERVER + '/api/order/completePlaceOrder/'
const get_order_api = EXPRESS_SERVER + '/api/order/getOrder/'
const get_orders_api = EXPRESS_SERVER + '/api/order/getOrders/'
const get_orders_for_shop_api = EXPRESS_SERVER + '/api/order/getOrdersForShop/'
const get_one_order_for_shop_api = EXPRESS_SERVER + '/api/order/getOneOrderForShop/'
const get_orders_by_admin_api = EXPRESS_SERVER + '/api/order/getOrdersByAdmin/'
const init_place_order_api = EXPRESS_SERVER + '/api/order/initPlaceOrder/'
const get_stripe_key_api = EXPRESS_SERVER + '/api/order/getStripeKey/'
const send_receipt_via_email_api = EXPRESS_SERVER + '/api/order/sendReceiptViaEmail/'
const find_orders_with_productId_api = EXPRESS_SERVER + '/api/order/findOrdersWithProductId/'

export {
    complete_place_order_api,
    get_order_api,
    get_orders_api,
    get_orders_for_shop_api,
    get_one_order_for_shop_api,
    get_orders_by_admin_api,
    init_place_order_api,
    get_stripe_key_api,
    send_receipt_via_email_api,
    find_orders_with_productId_api
}