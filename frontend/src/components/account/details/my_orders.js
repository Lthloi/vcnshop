import React, { useEffect, useMemo } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from "react-redux"
import { getOrders } from "../../../store/actions/order_actions"
import { LIMIT_GET_ORDERS } from "../../../configs/constants"
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Box, Skeleton, Stack } from "@mui/material"
import Tooltip from '@mui/material/Tooltip'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Pagination as PaginationMUI, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCurrentRoute } from '../../../hooks/custom_hooks'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import moment from 'moment'

const stripe_payment_statuses = {
    SUCCESSED: 'succeeded',
    CANCELED: 'canceled',
    PROCESSING: 'processing',
}

const order_statuses = {
    UNCOMPLETED: 'uncompleted',
}

const tabs = {
    ALL: 'ALL',
    UNPAID: stripe_payment_statuses.PROCESSING,
    SUCCESSED: stripe_payment_statuses.SUCCESSED,
}

const OrderTitle = ({ label, value }) => {
    let style = {}

    let set_style = {
        padding: '3px 8px',
        width: 'fit-content',
        borderRadius: '10px',
    }

    if (value === stripe_payment_statuses.SUCCESSED)
        style = {
            ...set_style,
            backgroundColor: '#74ffcd',
        }
    else if (value === stripe_payment_statuses.PROCESSING || value === order_statuses.UNCOMPLETED)
        style = {
            ...set_style,
            backgroundColor: '#ffd995',
        }
    else if (value === stripe_payment_statuses.CANCELED)
        style = {
            ...set_style,
            backgroundColor: '#ff8b8b',
        }

    return (
        <Box maxWidth="25%">
            <Typography
                component="h2"
                margin="0"
                color="gray"
                fontSize="1.1em"
                fontFamily="inherit"
            >
                {label}
            </Typography>
            <Typography
                sx={style}
                marginTop="5px"
                fontFamily="inherit"
                fontSize="0.9em"
            >
                {value}
            </Typography>
        </Box>
    )
}

const get_date_of_order = (time_string) => moment(time_string).format('dd/mm/yyyy')

const Order = ({ orderInfo }) => {
    const { createdAt, order_status, _id, items_of_order, payment_status } = orderInfo
    const navigate = useNavigate()
    const current_route = useCurrentRoute()

    const viewOrder = () => navigate(current_route + '/orderDetail/' + _id)

    const continueToPayment = () => {
        navigate('/checkout/payment?orderId=' + _id)
    }

    return (
        <Stack
            marginTop="5px"
            bgcolor="white"
            padding="20px"
            width="100%"
            boxSizing="border-box"
        >
            <Stack
                flexDirection="row"
                columnGap="30px"
                justifyContent="space-between"
                padding="10px"
                boxSizing="border-box"
            >
                <OrderTitle label="ORDER ID:" value={_id} />
                <OrderTitle label="PAYMENT STATUS:" value={payment_status} />
                <OrderTitle label="ORDER STATUS:" value={order_status} />
                <OrderTitle label="DATE:" value={get_date_of_order(createdAt)} />
            </Stack>

            <Box height="1px" bgcolor="lightgrey" marginTop="15px" />

            <Stack
                flexDirection="row"
                justifyContent="space-between"
                width="100%"
                marginTop="20px"
                padding="10px 20px"
                boxSizing="border-box"
            >
                <Images>
                    {
                        items_of_order.map(({ name, image_link }) => (
                            <Tooltip title={name} key={image_link}>
                                <Image src={image_link} />
                            </Tooltip>
                        ))
                    }
                </Images>
                <div style={{ width: '40%' }}>
                    {
                        payment_status === stripe_payment_statuses.PROCESSING || order_status === order_statuses.UNCOMPLETED ?
                            <Button
                                sx={{ marginTop: '10px', display: 'flex' }}
                                onClick={continueToPayment}
                            >
                                <OpenInNewIcon sx={{ margin: 'auto' }} />
                            </Button>
                            :
                            <Button onClick={viewOrder}>
                                VIEW ORDER
                            </Button>
                    }
                </div>
            </Stack>

            <Stack
                className="OrderHelpterText"
                flexDirection="row"
                alignItems="center"
                columnGap="5px"
                fontSize="0.8em"
                color="gray"
                marginTop="10px"
            >
                <TipsAndUpdatesIcon sx={{ color: 'gray', fontSize: '1.2em' }} />
                <span>Moving mouse on images to view name of product</span>
            </Stack>
        </Stack>
    )
}

const Orders = () => {
    const { orders, loading, error } = useSelector(({ order_for_user }) => order_for_user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrders(1))
    }, [dispatch])

    return (
        loading ? (
            <>
                <Loading sx={{ height: '50px', marginTop: '30px' }} />
                <Loading sx={{ height: '300px', marginTop: '5px' }} />
            </>
        ) : error ? (
            <Typography
                color="red"
                textAlign="center"
                padding="20px"
            >
                {error.message}
            </Typography>
        ) : orders && orders.length > 0 &&
        orders.map((order) => (
            <Order
                orderInfo={order}
                key={order._id}
            />
        ))
    )
}

const HelperText = () => {
    const { countOrders } = useSelector(({ order_for_user }) => order_for_user)
    const length_of_orders = useSelector(({ order_for_user }) => order_for_user.orders && order_for_user.orders.length)

    return (
        length_of_orders &&
        <Typography
            fontSize="0.9em"
            textAlign="center"
            fontFamily="inherit"
        >
            {'Displaying ' + length_of_orders + ' of ' + countOrders}
        </Typography>
    )
}

const set_page_count = (count_orders) => Math.ceil(count_orders / LIMIT_GET_ORDERS)

const Pagination = ({ orderStatus }) => {
    const { countOrders, currentPage } = useSelector(({ order_for_user }) => order_for_user)
    const dispatch = useDispatch()

    const switchPage = (e, new_page) => {
        if (new_page === currentPage) return

        dispatch(getOrders(new_page, LIMIT_GET_ORDERS, orderStatus !== tabs.ALL ? orderStatus : null))
    }

    return (
        <Box display="flex" justifyContent="center">
            <ReviewPages
                count={set_page_count(countOrders)}
                variant="outlined"
                shape="rounded"
                onChange={switchPage}
                page={currentPage}
            />
        </Box>
    )
}

const MyOrders = () => {
    const { currentTab } = useSelector(({ order_for_user }) => order_for_user)
    const dispatch = useDispatch()

    const tab = useMemo(() => currentTab === null ? tabs.ALL : currentTab, [currentTab])

    const switchTab = (e, new_tab) => {
        dispatch(getOrders(1, LIMIT_GET_ORDERS, new_tab !== tabs.ALL ? new_tab : null))
    }

    return (
        <MyOrdersSection id="MyOrdersSection">
            <Typography
                margin="10px 0"
                fontSize="2.2em"
                width="100%"
                textAlign="center"
            >
                My Orders
            </Typography>

            <HelperText />

            <Stack
                marginTop="30px"
                padding="0 10px"
                bgcolor="white"
            >
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    columnGap="5px"
                    margin="0"
                    padding="10px 15px"
                    borderBottom="1px lightgrey solid"
                >
                    <FilterAltIcon sx={{ fontSize: '1.2em' }} />
                    <span>Filter By Payment Status</span>
                </Stack>

                {
                    tab &&
                    <StyledTabs
                        value={tab}
                        onChange={switchTab}
                        textColor="inherit"
                    >
                        <Tab label="All" value={tabs.ALL} />
                        <Tab label="UNPAID" value={tabs.UNPAID} />
                        <Tab label="SUCCESSED" value={tabs.SUCCESSED} />
                    </StyledTabs>
                }
            </Stack>

            <Orders />

            <Pagination orderStatus={tab} />
        </MyOrdersSection>
    )
}

export default MyOrders

const MyOrdersSection = styled('div')(({ theme }) => ({
    padding: '20px 30px 40px',
    backgroundColor: '#F5F5F5',
    fontFamily: theme.fontFamily.kanit,
}))

const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        height: '3px',
        backgroundColor: '#3FACB1',
    }
})

const Loading = styled(Skeleton)({
    width: '100%',
    transform: 'scale(1)',
})

const Images = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    width: '170px',
    height: '100%',
    overflowX: 'hidden',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '20%',
        height: '100%',
        right: '0',
        top: '0',
        backgroundImage: 'linear-gradient(270deg, white, transparent)',
    }
})

const Image = styled('img')({
    height: '110px',
    border: '1px lightgrey solid',
})

const Button = styled('div')({
    backgroundColor: 'white',
    border: '2px lightgrey solid',
    padding: '10px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white',
    }
})

const ReviewPages = styled(PaginationMUI)({
    marginTop: '40px',
    '& button.MuiPaginationItem-root': {
        backgroundColor: 'black',
        border: '1.5px black solid',
        color: 'white',
        '&:hover': {
            border: '2px white solid',
        },
        '&.Mui-selected': {
            border: '2px white solid',
            backgroundColor: '#3FACB1',
            color: 'white',
        },
        '&.Mui-disabled': {
            opacity: 0.3,
        },
        '& span.MuiTouchRipple-root': {
            display: 'none',
        }
    }
})