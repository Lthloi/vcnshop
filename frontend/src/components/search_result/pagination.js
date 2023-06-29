import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import { Pagination as PagninationUI } from "@mui/material"
import {
    useDispatch,
} from "react-redux"
import { getProducts } from '../../store/actions/product_actions'
import { LIMIT_GET_PRODUCTS_DEFAULT } from "../../utils/constants"

const Pagination = ({ productsAreaRef, filterDataRef, countProducts }) => {
    const [productsPage, setProductsPage] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        setProductsPage(1)
    }, [countProducts])

    const switchProductsPage = (e, page) => {
        if (page === productsPage) return

        productsAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', })

        filterDataRef.current.pagination = page

        let filterDataRef_current = filterDataRef.current

        dispatch(getProducts(
            filterDataRef_current.limit, filterDataRef_current.category,
            filterDataRef_current.keyword, filterDataRef_current.rating,
            filterDataRef_current.price, page, filterDataRef_current.for,
            filterDataRef_current.type,
        ))

        setProductsPage(page)
    }

    return (
        <PaginationArea id="PaginationArea">
            <ReviewPages
                count={Math.ceil(countProducts / LIMIT_GET_PRODUCTS_DEFAULT)}
                variant="outlined"
                shape="rounded"
                onChange={switchProductsPage}
                page={productsPage}
            />
        </PaginationArea>
    )
}

export default Pagination

const PaginationArea = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
}))

const ReviewPages = styled(PagninationUI)({
    marginTop: '30px',
    '& button.MuiPaginationItem-root': {
        backgroundColor: 'black',
        border: '1.5px black solid',
        color: 'white',
        '&:hover': {
            border: '2px white solid',
        },
        '&.Mui-selected': {
            border: '2px white solid',
            backgroundColor: '#a4dfff',
            color: 'black',
        },
        '&.Mui-disabled': {
            opacity: 0.3,
        },
        '& span.MuiTouchRipple-root': {
            display: 'none',
        }
    }
})