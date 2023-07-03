import React, { useCallback, useContext, useEffect, useMemo, useRef, useState, createContext } from "react"
import { styled } from '@mui/material/styles'
import ErrorIcon from '@mui/icons-material/Error'
import AddProduct from './add_product'
import { useDispatch, useSelector } from "react-redux"
import { Skeleton } from "@mui/material"
import { getProducts } from "../../store/actions/product_actions"
import ProductDetail from "./product_detail"
import { useNavigate, Routes, Route } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import LaunchIcon from '@mui/icons-material/Launch'
import moment from "moment"
import TableSortLabel from '@mui/material/TableSortLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import SearchIcon from '@mui/icons-material/Search'
import { useDebounce } from "../../hooks/custom_hooks"
import { Pagination } from "@mui/material"
import { Avatar } from "@mui/material"
import { IconButton } from "@mui/material"
import { Tooltip } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ViewCompactIcon from '@mui/icons-material/ViewCompact'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'

const ThemeContext = createContext()

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '& .MuiButtonBase-root.MuiTableSortLabel-root:hover': {
        color: 'rgba(255,255,255,0.7)',
    },
    '& .MuiButtonBase-root.MuiTableSortLabel-root.Mui-active': {
        color: 'rgba(255,255,255,0.7)',
        ' .MuiTableSortLabel-icon': {
            color: 'rgba(255,255,255,0.7)',
        }
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
    if (order_by === 'Product Name') order_by = 'name'
    else if (order_by === 'Date Of Adding') order_by = 'createdAt'
    else if (order_by === 'Price (USD)') order_by = 'price'
    else if (order_by === 'Stock') order_by = 'stock'

    let sort_products = [...products]
    if (order_by === 'createdAt')
        sort_products.sort((pre, next) => {
            if (order_type === 'asc')
                return doingSortByTime(pre.createdAt, next.createdAt)
            else
                return -doingSortByTime(pre.createdAt, next.createdAt)
        })
    else if (order_by === 'price')
        sort_products.sort((pre, next) => {
            if (order_type === 'asc')
                return doingSortByFloatNumber(pre.price.value, next.price.value)
            else
                return -doingSortByFloatNumber(pre.price.value, next.price.value)
        })
    else
        sort_products.sort((pre, next) => {
            if (order_type === 'asc')
                return doingSortByString(pre, next, order_by)
            else
                return -doingSortByString(pre, next, order_by)
        })

    return sort_products
}

const converDate = (time_string) => moment(time_string).format('DD/MM/YYYY, HH:mm:ss')

const searchHandler = (products, keyword) => {
    return products.filter((product) => {
        return product.name.toLowerCase().includes(keyword.toLowerCase())
    })
}

const get_number_of_pages = (count_products, maximum_number_of_products) => {
    return Math.ceil(count_products / maximum_number_of_products)
}

const table_head_sort_labels = ['Product Name', 'Date Of Adding', 'Price (USD)', 'Stock']

const TableComponent = ({ products, tableHeadRef, onViewProduct, onCreateSort, order }) => (
    <TableContainer component={Paper} ref={tableHeadRef}>
        <Table sx={{ minWidth: 700 }} aria-label="ProductsOfShop">
            <TableHead>
                <StyledTableRow>
                    <StyledTableCell>
                        <Tooltip title="Ordinal Number">
                            <span>O.N</span>
                        </Tooltip>
                    </StyledTableCell>
                    {
                        table_head_sort_labels.map((label) => (
                            <StyledTableCell
                                key={label}
                                align={label === 'Price (USD)' || label === 'Stock' ? 'center' : 'left'}
                                sortDirection={order.by === label ? order.type : false}
                            >
                                <TableSortLabel
                                    active={order.by === label}
                                    direction={order.by === label ? order.type : 'desc'}
                                    onClick={() => onCreateSort(label)}
                                >
                                    {label}
                                </TableSortLabel>
                            </StyledTableCell>
                        ))
                    }
                    <StyledTableCell>
                        View
                    </StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {products.map(({ _id, name, createdAt, price, stock }, index) => (
                    <StyledTableRow key={_id}>
                        <StyledTableCell component="th" scope="row">
                            {index + 1}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            {name}
                        </StyledTableCell>
                        <StyledTableCell>{converDate(createdAt)}</StyledTableCell>
                        <StyledTableCell align="center">{price.value}</StyledTableCell>
                        <StyledTableCell align="center">{stock}</StyledTableCell>
                        <StyledTableCell>
                            <Tooltip title="View Product">
                                <IconButton onClick={() => onViewProduct(_id)}>
                                    <LaunchIcon />
                                </IconButton>
                            </Tooltip>
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
)

const EmptyHeadingComponent = ({ option }) => (
    <EmptyHeading>
        <SentimentNeutralIcon sx={{ fontSize: '1.8em' }} />
        <div>
            {
                option === 'All Products' ? (
                    "Oops! You don't have any product!"
                ) : option === 'Stockout' && (
                    "You have no product is out of stock"
                )
            }
        </div>
    </EmptyHeading >
)

const ProductsSection = ({ option }) => {
    const { products, loading, error, countProducts, currentPage } = useSelector(({ product }) => product)
    const [keyword, setKeyword] = useState('')
    const [order, setOrder] = useState({ by: '', type: 'asc' })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const decounce = useDebounce()
    const table_head_ref = useRef()
    const context = useContext(ThemeContext)

    const handleViewProduct = useCallback((product_id) => {
        navigate('/myStore/Products/product/' + product_id)
    }, [])

    const doingSearch = (e) => {
        let keyword = e.target.value
        setKeyword(keyword)
    }

    const handleCreateSort = useCallback((label) => {
        setOrder(pre => ({ by: label, type: pre.type === 'asc' ? 'desc' : 'asc' }))
    }, [])

    const update_products = useMemo(() => {
        let new_products = products

        if (keyword)
            new_products = searchHandler(products, keyword)

        new_products = sortHandler(new_products, order.by, order.type)

        return new_products
    }, [products, keyword, order])

    const switchPage = (e, new_page) => {
        if (new_page === currentPage) return

        table_head_ref.current.scrollIntoView({ block: 'start' })

        dispatch(getProducts(
            maximum_number_of_products,
            undefined,
            undefined,
            undefined,
            undefined,
            new_page,
            undefined,
            context.shopId,
        ))
    }

    return (
        loading ? (
            <Skeleton sx={{ transform: 'none', height: '300px', marginTop: '30px' }} />
        ) : error ? (
            <Error>
                <ErrorIcon sx={{ fontSize: '1.2em' }} />
                <span>{error.message}</span>
            </Error>
        ) : products && products.length > 0 ? (
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

                <TableComponent
                    order={order}
                    products={update_products}
                    onViewProduct={handleViewProduct}
                    onCreateSort={handleCreateSort}
                    tableHeadRef={table_head_ref}
                />

                {
                    option === 'All Products' &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Pages
                            count={get_number_of_pages(countProducts, maximum_number_of_products)}
                            variant="outlined"
                            shape="rounded"
                            onChange={switchPage}
                            page={currentPage}
                        />
                    </div>
                }
            </div>
        ) : (
            <EmptyHeadingComponent option={option} />
        )
    )
}

const options = [
    {
        title: 'All Products',
        icon: <ViewCompactIcon sx={{ color: 'white' }} />,
        tooltip: 'All Products',
    }, {
        title: 'Stockout',
        icon: <CheckBoxOutlineBlankIcon sx={{ color: 'white' }} />,
        tooltip: 'View The Stockout Products',
    },
]

const OptionsAndProducts = () => {
    const [option, setOption] = useState('All Products')
    const dispatch = useDispatch()
    const context = useContext(ThemeContext)

    const switchOption = (title) => {
        if (title === option) return

        if (title === 'All Products')
            dispatch(getProducts(
                maximum_number_of_products,
                undefined,
                undefined,
                undefined,
                undefined,
                1,
                undefined,
                context.shopId
            ))
        else if (title === 'Stockout')
            dispatch(getProducts(
                100,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                context.shopId,
                [0, 0]
            ))

        setOption(title)
    }

    return (
        <>
            <OptionsContainer>
                <AddProduct />

                <OptionsSection id="OptionsSection">
                    {
                        options.map(({ title, icon, tooltip }) => (
                            <Tooltip
                                title={tooltip}
                                key={title}
                                arrow
                            >
                                <IconButton onClick={() => switchOption(title)}>
                                    <Avatar sx={{ backgroundColor: 'black' }}>
                                        {icon}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        ))
                    }
                </OptionsSection>
            </OptionsContainer>

            <ProductsSection
                option={option}
            />
        </>
    )
}

const maximum_number_of_products = 20

const Products = ({ shopId }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts(
            maximum_number_of_products,
            undefined,
            undefined,
            undefined,
            undefined,
            1,
            undefined,
            shopId
        ))
    }, [dispatch])

    return (
        <div id="ProductsOfStore">
            <ThemeContext.Provider value={{ shopId }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <OptionsAndProducts />
                        }
                    />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                </Routes>
            </ThemeContext.Provider>
        </div>
    )
}

export default Products

const OptionsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
})

const OptionsSection = styled('div')(({ theme }) => ({
    display: 'flex',
    columnGap: '20px',
}))

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

const EmptyHeading = styled('h2')({
    fontSize: '1.2em',
    width: '100%',
    textAlign: 'center',
    marginTop: '30px',
})

const Pages = styled(Pagination)({
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