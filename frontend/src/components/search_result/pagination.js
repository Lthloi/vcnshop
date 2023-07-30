import React from "react"
import { styled } from '@mui/material/styles'
import { Pagination as PagninationUI } from "@mui/material"
import {
    useDispatch,
    useSelector,
} from "react-redux"
import { getProducts } from '../../store/actions/product_actions'
import { LIMIT_GET_PRODUCTS_DEFAULT } from "../../utils/constants"
import { Stack } from '@mui/material'

const get_number_of_pages = (count_products) => {
    return Math.ceil(count_products / LIMIT_GET_PRODUCTS_DEFAULT)
}

const Pagination = ({ filterDataRef, handleSetFilterData }) => {
    const filter_data = filterDataRef.current
    const { countProducts, currentPage } = useSelector(({ product }) => product)
    const dispatch = useDispatch()

    const switchProductsPage = (e, page) => {
        if (page === currentPage) return

        handleSetFilterData({ pagination: page })

        dispatch(getProducts(
            filter_data.limit,
            [filter_data.category],
            filter_data.keyword,
            filter_data.rating,
            filter_data.price,
            page,
            [filter_data.target],
        ))
    }

    return (
        <Stack flexDirection="row" justifyContent="space-between" id="Product-Search-Pagination">
            <span></span>
            <ReviewPages
                count={get_number_of_pages(countProducts)}
                variant="outlined"
                shape="rounded"
                onChange={switchProductsPage}
                page={currentPage}
            />
        </Stack>
    )
}

export default Pagination

const ReviewPages = styled(PagninationUI)({
    marginBottom: '30px',
})