import React, { useEffect, useCallback, useRef, useState, useMemo } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersForShop } from '../../store/actions/order_actions'
import StorageIcon from '@mui/icons-material/Storage'
import ErrorIcon from '@mui/icons-material/Error'
import { Skeleton } from "@mui/material"
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
import { Pagination } from "@mui/material"
import { IconButton } from "@mui/material"
import { Tooltip } from '@mui/material'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import OrderDetail from "./order_detail"

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

const sortHandler = (orders, sort_by, sort_type) => {
    let sort_orders = [...orders]

    if (sort_by === 'Date Of Placing')
        sort_orders.sort((pre, next) => {
            if (sort_type === 'asc')
                return doingSortByTime(pre.createdAt, next.createdAt)
            else
                return -doingSortByTime(pre.createdAt, next.createdAt)
        })
    else if (sort_by === 'Total Price (USD)')
        sort_orders.sort((pre, next) => {
            if (sort_type === 'asc')
                return doingSortByFloatNumber(pre.total_price, next.total_price)
            else
                return -doingSortByFloatNumber(pre.total_price, next.total_price)
        })

    return sort_orders
}

const converDate = (time_string) => moment(time_string).format('DD/MM/YYYY, HH:mm:ss')

const order_statuses = {
    uncompleted: 'uncompleted',
    processing: 'processing',
    delivering: 'delivering',
    delivered: 'delivered',
}

const OrderStatusIndicator = ({ orderStatus }) => {
    let set_style = {
        padding: '10px 20px',
        borderRadius: '5px',
    }

    if (orderStatus === order_statuses.uncompleted)
        set_style = {
            ...set_style,
            backgroundColor: '#ff8b8b',
        }
    else if (orderStatus === order_statuses.processing || orderStatus === order_statuses.delivering)
        set_style = {
            ...set_style,
            backgroundColor: '#ffd995',
        }
    else if (orderStatus === order_statuses.delivered)
        set_style = {
            ...set_style,
            backgroundColor: '#74ffcd',
        }

    return (
        <div style={set_style}>
            {orderStatus}
        </div>
    )
}

const payment_statuses = {
    processing: 'processing',
    canceled: 'canceled',
    succeeded: 'succeeded',
}

const PaymentStatusIndicator = ({ paymentStatus }) => {
    let set_style = {
        padding: '10px 20px',
        borderRadius: '5px',
    }

    if (paymentStatus === payment_statuses.canceled)
        set_style = {
            ...set_style,
            backgroundColor: '#ff8b8b',
        }
    else if (paymentStatus === payment_statuses.processing)
        set_style = {
            ...set_style,
            backgroundColor: '#ffd995',
        }
    else if (paymentStatus === payment_statuses.succeeded)
        set_style = {
            ...set_style,
            backgroundColor: '#74ffcd',
        }

    return (
        <div style={set_style}>
            {paymentStatus}
        </div>
    )
}

const RowComponent = ({ orderStatus, paymentStatus, createdAt, rowId, items, onViewOrder, totalPrice }) => {
    const [openCollapse, setOpenCollapse] = useState(false)

    return (
        <>
            <StyledTableRow>

                <TableCell>
                    <Tooltip title="View Products">
                        <IconButton
                            size="small"
                            onClick={() => setOpenCollapse(pre => !pre)}
                        >
                            {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Tooltip>
                </TableCell>

                <StyledTableCell>{converDate(createdAt)}</StyledTableCell>

                <StyledTableCell align="center">
                    <OrderStatusIndicator orderStatus={orderStatus} />
                </StyledTableCell>

                <StyledTableCell align="center">
                    <PaymentStatusIndicator paymentStatus={paymentStatus} />
                </StyledTableCell>

                <StyledTableCell align="center">{totalPrice}</StyledTableCell>

                <StyledTableCell>
                    <Tooltip title="View Order">
                        <IconButton onClick={() => onViewOrder(rowId)}>
                            <LaunchIcon />
                        </IconButton>
                    </Tooltip>
                </StyledTableCell>

            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell colSpan={6}>
                    <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                Products
                            </Typography>
                            {
                                items.map(({ _id, name, image_link, price, quantity }) => (
                                    <Product key={_id}>
                                        <ProductImage src={image_link} />
                                        <ProductName>{name}</ProductName>
                                        <ProductQty>{'Qty: ' + quantity}</ProductQty>
                                        <ProductCost>{'$' + price}</ProductCost>
                                    </Product>
                                ))
                            }
                        </Box>
                    </Collapse>
                </StyledTableCell>
            </StyledTableRow>
        </>
    )
}

const TableComponent = ({ orders, tableHeadRef, onViewOrder, onCreateSort, sort }) => {

    const handleOnViewOrder = (order_id) => onViewOrder(order_id)

    return (
        <TableContainer component={Paper} ref={tableHeadRef}>
            <Table sx={{ minWidth: 700 }} aria-label="ProductsOfShop">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell
                            sortDirection={sort.by === 'Date Of Placing' ? sort.type : false}
                        >
                            <TableSortLabel
                                active={sort.by === 'Date Of Placing'}
                                direction={sort.by === 'Date Of Placing' ? sort.type : 'desc'}
                                onClick={() => onCreateSort('Date Of Placing')}
                            >
                                Date Of Placing
                            </TableSortLabel>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            Order Status
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Payment Status
                        </StyledTableCell>

                        <StyledTableCell
                            sortDirection={sort.by === 'Total Price (USD)' ? sort.type : false}
                            align="center"
                        >
                            <TableSortLabel
                                active={sort.by === 'Total Price (USD)'}
                                direction={sort.by === 'Total Price (USD)' ? sort.type : 'desc'}
                                onClick={() => onCreateSort('Total Price (USD)')}
                            >
                                Total Price (USD)
                            </TableSortLabel>
                        </StyledTableCell>

                        <StyledTableCell>
                            View
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {orders.map(({ order_status, payment_status, createdAt, items, _id, total_price }) => (
                        <React.Fragment key={_id}>
                            <RowComponent
                                orderStatus={order_status}
                                paymentStatus={payment_status}
                                createdAt={createdAt}
                                items={items}
                                rowId={_id}
                                onViewOrder={handleOnViewOrder}
                                totalPrice={total_price}
                            />
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const EmptyHeadingComponent = ({ option }) => (
    <EmptyHeading>
        <StorageIcon sx={{ fontSize: '1.8em' }} />
        <div>
            {
                option === 'All Orders' ? (
                    "Oops! You have no order now!"
                ) : option === 'Uncompleted' && (
                    "You have no order is " + option.toLowerCase()
                )
            }
        </div>
    </EmptyHeading >
)

const get_number_of_pages = (count_products, maximum_number_of_orders) => {
    return Math.ceil(count_products / maximum_number_of_orders)
}

const calculate_total_price = (items) => {
    return items.reduce((accumulator, { price, quantity }) => accumulator + (price * quantity).toFixed(2) * 1, 0)
}

const set_total_price_for_each_order = (orders) => {
    return orders.map((order) => ({ total_price: calculate_total_price(order.items), ...order }))
}

const OrdersSection = ({ option }) => {
    const { orders, loading, error, countOrder, currentPage } = useSelector(({ order }) => order)
    const [sort, setSort] = useState({ by: '', type: 'asc' })
    const table_head_ref = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleViewOrder = useCallback((order_id) => {
        navigate('/myStore/Orders/order/' + order_id)
    }, [])

    const handleCreateSort = useCallback((label) => {
        setSort(pre => ({ by: label, type: pre.type === 'asc' ? 'desc' : 'asc' }))
    }, [])

    const update_orders = useMemo(() => {
        let new_orders = orders

        new_orders = set_total_price_for_each_order(new_orders)

        new_orders = sortHandler(new_orders, sort.by, sort.type)

        return new_orders
    }, [orders, sort])

    const switchPage = (e, new_page) => {
        if (new_page === currentPage) return

        table_head_ref.current.scrollIntoView({ block: 'start' })

        dispatch(getOrdersForShop(maximum_number_of_orders, new_page))
    }

    return (
        loading ? (
            <Skeleton sx={{ transform: 'none', height: '300px', marginTop: '30px' }} />
        ) : error ? (
            <Error>
                <ErrorIcon sx={{ fontSize: '1.2em' }} />
                <span>{error.message}</span>
            </Error>
        ) : orders && orders.length > 0 ? (
            <div style={{ marginTop: '30px' }}>
                <TableComponent
                    tableHeadRef={table_head_ref}
                    orders={update_orders}
                    sort={sort}
                    onViewOrder={handleViewOrder}
                    onCreateSort={handleCreateSort}
                />

                {
                    option === 'All Orders' &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Pages
                            count={get_number_of_pages(countOrder, maximum_number_of_orders)}
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
        title: 'All Orders',
        icon: <FilterAltIcon sx={{ color: 'white' }} />,
        tooltip: 'All Orders',
    }, {
        title: 'Uncompleted',
        icon: <FilterAltIcon sx={{ color: 'white' }} />,
        tooltip: 'Filter By The Uncompleted Orders',
    }, {
        title: 'Processing',
        icon: <FilterAltIcon sx={{ color: 'white' }} />,
        tooltip: 'Filter By The Processing Orders',
    },
]

const OptionsAndOrders = () => {
    const [option, setOption] = useState('All Orders')
    const dispatch = useDispatch()

    const switchOption = (title) => {
        if (title === option) return

        if (title === 'All Orders')
            dispatch(getOrdersForShop(maximum_number_of_orders, 1))
        else if (title === 'Uncompleted')
            dispatch(getOrdersForShop(maximum_number_of_orders, 1, order_statuses.uncompleted))
        else if (title === 'Processing')
            dispatch(getOrdersForShop(maximum_number_of_orders, 1, order_statuses.processing))

        setOption(title)
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span></span>
                <OptionsSection id="OptionsSection">
                    <TitleText>Filter By Order Status:</TitleText>
                    {
                        options.map(({ title, icon, tooltip }) => (
                            <Tooltip
                                title={tooltip}
                                key={title}
                                arrow
                                placement="top"
                            >
                                <Option
                                    onClick={() => switchOption(title)}
                                    sx={option === title ? { backgroundColor: 'white', color: 'black', '& svg': { color: 'black' } } : {}}
                                >
                                    {icon}
                                    <span>{title}</span>
                                </Option>
                            </Tooltip>
                        ))
                    }
                </OptionsSection>
            </div>

            <OrdersSection
                option={option}
            />
        </>
    )
}

const maximum_number_of_orders = 10

const Orders = () => {
    // This flag for get orders, if there is not this flag then this component run callback of useEffect only after this 
    // component completed its commit (because the code of react redux is synchronous, this flag will be effective)
    const [flag, setFlag] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrdersForShop(maximum_number_of_orders, 1))
        setFlag(true)
    }, [dispatch])

    return (
        <div id="OrdersSection">
            {
                flag &&
                <Routes>
                    <Route
                        path="/"
                        element={
                            <OptionsAndOrders />
                        }
                    />

                    <Route path="/order/:orderId" element={<OrderDetail />} />
                </Routes>
            }
        </div>
    )
}

export default Orders

const EmptyHeading = styled('div')({
    fontSize: '1.2em',
    width: '100%',
    textAlign: 'center',
    marginTop: '50px',
})

const OptionsSection = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    columnGap: '20px',
    marginTop: '20px',
    fontFamily: theme.fontFamily.nunito,
}))

const Option = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    padding: '10px 20px',
    backgroundColor: 'black',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '2px black solid',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
        '& svg': {
            color: 'black',
        }
    }
})

const TitleText = styled('div')({
    fontWeight: 'bold',
})

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

const Product = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '20px',
    padding: '20px 30px',
    fontFamily: theme.fontFamily.kanit,
}))

const ProductImage = styled('img')({
    width: '100px',
    height: '100px',
    border: '1px lightgrey solid',
})

const ProductName = styled('div')({
    fontSize: '1.2em',
})

const ProductQty = styled('div')({
    fontSize: '1.5em',
})

const ProductCost = styled('div')({
    fontSize: '1.5em',
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