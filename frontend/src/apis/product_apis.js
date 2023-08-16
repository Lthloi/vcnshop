import { EXPRESS_SERVER } from "../configs/constants"

const create_product_api = EXPRESS_SERVER + '/api/product/createProduct/'
const update_product_api = EXPRESS_SERVER + '/api/product/updateProduct/'
const delete_product_api = EXPRESS_SERVER + '/api/product/deleteProduct/'
const get_products_api = EXPRESS_SERVER + '/api/product/getProducts/'
const get_product_api = EXPRESS_SERVER + '/api/product/getProduct/'
const new_review_api = EXPRESS_SERVER + '/api/product/newReview/'
const get_reviews_api = EXPRESS_SERVER + '/api/product/getReviews/'
const get_products_by_admin_api = EXPRESS_SERVER + '/api/product/getProductsByAdmin/'
const get_products_by_ids_api = EXPRESS_SERVER + '/api/product/getProductsByIds/'
const get_products_name_api = EXPRESS_SERVER + '/api/product/getProductsName/'

export {
    create_product_api,
    update_product_api,
    delete_product_api,
    get_products_api,
    get_product_api,
    new_review_api,
    get_reviews_api,
    get_products_by_admin_api,
    get_products_by_ids_api,
    get_products_name_api,
}