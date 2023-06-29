import React, { useEffect, useMemo, useState } from "react"
import { styled } from '@mui/material/styles'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import ErrorIcon from '@mui/icons-material/Error'
import AddProduct from './add_product'
import { useDispatch, useSelector } from "react-redux"
import { Skeleton } from "@mui/material"
import { getProducts } from "../../store/actions/product_actions"
import ProductDetail from "./product_detail"
import { useNavigate, Routes, Route } from 'react-router-dom'
import { useCurrentRoute } from "../../hooks/custom_hooks"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import LaunchIcon from '@mui/icons-material/Launch'
import { Tooltip } from "@mui/material"
import { IconButton } from "@mui/material"
import moment from "moment"
import TableSortLabel from '@mui/material/TableSortLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import SearchIcon from '@mui/icons-material/Search'
import { useDebounce } from "../../hooks/custom_hooks"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}))

// -1: pre less than next && 1: pre greater than next && 0: pre is equal to next
const doingSortByString = (pre_product, next_product, sort_by) => {
    if (pre_product[sort_by] > next_product[sort_by])
        return 1
    else if (pre_product[sort_by] < next_product[sort_by])
        return -1
    return 0
}

const doingSortByTime = (pre_time, next_time) => {
    if (moment(pre_time).isAfter(next_time))
        return 1
    else if (moment(pre_time).isBefore(next_time))
        return -1
    return 0
}

const doingSortByFloatNumber = (pre_number, next_number) => {
    return parseFloat(pre_number) - parseFloat(next_number)
}

const sortHandler = (products, order_by, order_type) => {
    let sort_by
    if (order_by === 'Product Name') sort_by = 'name'
    else if (order_by === 'Date Of Adding') sort_by = 'createdAt'
    else if (order_by === 'Price (USD)') sort_by = 'price'
    else if (order_by === 'Stock') sort_by = 'stock'

    let sort_products = [...products]
    if (sort_by === 'createdAt')
        sort_products.sort((pre, next) => {
            if (order_type === 'asc')
                return doingSortByTime(pre.createdAt, next.createdAt)
            else
                return -doingSortByTime(pre.createdAt, next.createdAt)
        })
    else if (sort_by === 'price')
        sort_products.sort((pre, next) => {
            if (order_type === 'asc')
                return doingSortByFloatNumber(pre.price.value, next.price.value)
            else
                return -doingSortByFloatNumber(pre.price.value, next.price.value)
        })
    else
        sort_products.sort((pre, next) => {
            if (order_type === 'asc')
                return doingSortByString(pre, next, sort_by)
            else
                return -doingSortByString(pre, next, sort_by)
        })

    return sort_products
}

const searchHandler = (product, keyword) => {
    let product_name = product.name.toLowerCase()
    return product_name.includes(keyword.toLowerCase())
}

const table_head_labels = ['Product Name', 'Date Of Adding', 'Price (USD)', 'Stock', 'View']

const ProductsComponent = ({ products }) => {
    const navigate = useNavigate()
    const current_route = useCurrentRoute()
    const [keyword, setKeyword] = useState('')
    const [order, setOrder] = useState({ by: '', type: 'asc' })
    const decounce = useDebounce()

    const viewProduct = (product_id) => {
        navigate(current_route + '/product/' + product_id)
    }

    const doingSearch = (e) => {
        let keyword = e.target.value
        setKeyword(keyword)
    }

    const converDate = (time_string) => moment(time_string).format('DD/MM/YYYY, HH:mm:ss')

    const createSort = (label) => {
        setOrder(pre => ({ by: label, type: pre.type === 'asc' ? 'desc' : 'asc' }))
    }

    const update_products = useMemo(() => {
        let new_products = products

        if (keyword)
            new_products = new_products.filter((product) => {
                return searchHandler(product, keyword)
            })

        new_products = sortHandler(new_products, order.by, order.type)

        return new_products
    }, [products, keyword, order])

    return (
        <div style={{ marginTop: '30px' }}>
            <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <InputLabel htmlFor="search_by_name" color="success">Search By Name</InputLabel>
                <OutlinedInput
                    id="search_by_name"
                    color="success"
                    startAdornment={<SearchIcon sx={{ paddingRight: '10px' }} />}
                    label="Search By Name"
                    onChange={decounce(doingSearch, 400)}
                    placeholder="Enter the product name here..."
                />
            </FormControl>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="ProductsOfShop">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <Tooltip title="Ordinal Number">
                                    <span>O.N</span>
                                </Tooltip>
                            </StyledTableCell>
                            {
                                table_head_labels.map((label) => (
                                    <StyledTableCell
                                        key={label}
                                        align="left"
                                        sortDirection={order.by === label && label !== 'View' ? order.type : false}
                                    >
                                        <TableSortLabel
                                            active={order.by === label && label !== 'View'}
                                            direction={order.by === label && label !== 'View' ? order.type : 'desc'}
                                            onClick={() => createSort(label)}
                                        >
                                            {label}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {update_products.map(({ _id, name, createdAt, price, stock }, index) => (
                            <TableRow key={_id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {name}
                                </StyledTableCell>
                                <StyledTableCell>{converDate(createdAt)}</StyledTableCell>
                                <StyledTableCell align="center">{(price.value)}</StyledTableCell>
                                <StyledTableCell align="center">{stock}</StyledTableCell>
                                <StyledTableCell>
                                    <Tooltip title="View Product">
                                        <IconButton onClick={() => viewProduct(_id)}>
                                            <LaunchIcon />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const Products = ({ shopId }) => {
    const { products, loading, error } = useSelector(({ product }) => product)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts(
            10,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            shopId
        ))
    }, [dispatch])

    return (
        <div id="ProductsSection">
            <AddProduct />
            {
                loading ? (
                    <Skeleton sx={{ transform: 'none', height: '300px', marginTop: '30px' }} />
                ) : error ? (
                    <Error>
                        <ErrorIcon sx={{ fontSize: '1.2em' }} />
                        <span>{error.message}</span>
                    </Error>
                ) : products && products.length > 0 ? (
                    <Routes>
                        <Route path="/" element={<ProductsComponent products={products} />} />
                        <Route path="/product/:productId" element={<ProductDetail />} />
                    </Routes>
                ) : (
                    <ProductsTitle>
                        <CheckroomIcon sx={{ fontSize: '1.8em' }} />
                        <div>Oops! You don't have any product!</div>
                    </ProductsTitle>
                )
            }
        </div>
    )
}

export default Products

const Error = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '5px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: 'red',
    width: '100%',
    marginTop: '30px',
})

const ProductsTitle = styled('h2')({
    fontSize: '1.2em',
    width: '100%',
    textAlign: 'center',
    marginTop: '30px',
})