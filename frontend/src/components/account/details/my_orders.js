import React, { useEffect, useMemo, useRef } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from "react-redux"
import { getOrders } from "../../../store/actions/order_actions"
import { LIMIT_GET_ORDERS } from "../../../utils/constants"
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Skeleton } from "@mui/material"
import Tooltip from '@mui/material/Tooltip'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Pagination } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCurrentRoute } from '../../../hooks/custom_hooks'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

const statuses = {
    stripe_payment: {
        SUCCESSED: 'succeeded',
        CANCELED: 'canceled',
        PROCESSING: 'processing',
    },
    order: {
        UNCOMPLETED: 'uncompleted',
    }
}

const tabs = {
    ALL: 'all',
    UNPAID: statuses.stripe_payment.PROCESSING,
    SUCCESSED: statuses.stripe_payment.SUCCESSED,
}

const RenderType = (label_of_type, value_of_type) => {
    let set_style

    let general_style_for_status = {
        padding: '3px 8px',
        width: 'fit-content',
        borderRadius: '10px',
    }

    if (value_of_type === statuses.stripe_payment.SUCCESSED)
        set_style = {
            ...general_style_for_status,
            backgroundColor: '#74ffcd',
        }
    else if (value_of_type === statuses.stripe_payment.PROCESSING || value_of_type === statuses.order.UNCOMPLETED)
        set_style = {
            ...general_style_for_status,
            backgroundColor: '#ffd995',
        }
    else if (value_of_type === statuses.stripe_payment.CANCELED)
        set_style = {
            ...general_style_for_status,
            backgroundColor: '#ff8b8b',
        }

    return (
        <ItemLabel>
            <LabelName>{label_of_type}</LabelName>
            <LabelValue sx={set_style}>
                {value_of_type}
            </LabelValue>
        </ItemLabel>
    )
}

const MyOrders = () => {
    const { orders, countOrder, currentPage, currentTab, loading, error } = useSelector(({ order }) => order)
    const dispatch = useDispatch()
    const orders_container_ref = useRef()
    const navigate = useNavigate()
    const current_route = useCurrentRoute()

    const tab = useMemo(() => currentTab, [currentTab])
    const page = useMemo(() => currentPage, [currentPage])

    useEffect(() => {
        if (orders && orders.length === 0) dispatch(getOrders(1))
    }, [dispatch])

    const switchTab = (e, new_tab) => {
        dispatch(getOrders(1, LIMIT_GET_ORDERS, new_tab !== tabs.ALL ? new_tab : null))
    }

    const switchPage = (e, new_page) => {
        if (new_page === page) return

        orders_container_ref.current.scrollIntoView({ block: 'start' })

        dispatch(getOrders(new_page, LIMIT_GET_ORDERS, tab))
    }

    const viewOrder = (order_id) => navigate(current_route + '/orderDetail/' + order_id)

    const continueToPayment = (order_id) => {
        navigate('/checkout?step=payment&orderId=' + order_id)
    }

    return (
        <MyOrdersSection id="MyOrdersSection">
            <TitleSection>My Orders</TitleSection>
            <HelperText>{'Displaying ' + orders.length + ' of ' + countOrder}</HelperText>
            {
                loading ? (
                    <>
                        <Loading sx={{ height: '50px', marginTop: '30px' }} />
                        <Loading sx={{ height: '300px', marginTop: '5px' }} />
                    </>
                ) : error ? (
                    <Error>{error.message}</Error>
                ) : orders && orders.length > 0 &&
                <>
                    <div ref={orders_container_ref} style={{ marginTop: '30px', padding: '0 10px', backgroundColor: 'white' }}>
                        <TabsTitle>
                            <FilterAltIcon sx={{ fontSize: '1.2em' }} />
                            <span>Filter By Payment Status</span>
                        </TabsTitle>
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
                    </div>
                    {
                        orders.map(({ createdAt, order_status, _id, items_of_order, payment_status }) => (
                            <ItemContainer key={_id}>
                                <ItemLabels>
                                    {RenderType('ORDER ID:', _id)}
                                    {RenderType('PAYMENT STATUS:', payment_status)}
                                    {RenderType('ORDER STATUS:', order_status)}
                                    {RenderType('DATE:', new Date(createdAt).toDateString())}
                                </ItemLabels>
                                <ItemHr />
                                <Container>
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
                                            payment_status === statuses.stripe_payment.PROCESSING || order_status === statuses.order.UNCOMPLETED ?
                                                <Button
                                                    sx={{ marginTop: '10px', display: 'flex' }}
                                                    onClick={() => continueToPayment(_id)}
                                                >
                                                    <OpenInNewIcon sx={{ margin: 'auto' }} />
                                                </Button>
                                                :
                                                <Button onClick={() => viewOrder(_id)}>
                                                    VIEW ORDER
                                                </Button>
                                        }
                                    </div>
                                </Container>
                                <OrderHelpterText>
                                    <TipsAndUpdatesIcon sx={{ color: 'gray', fontSize: '1.2em' }} />
                                    <span>Moving mouse on images to view name of product</span>
                                </OrderHelpterText>
                            </ItemContainer>
                        ))
                    }
                </>
            }
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ReviewPages
                    count={Math.ceil(countOrder / LIMIT_GET_ORDERS)}
                    variant="outlined"
                    shape="rounded"
                    onChange={switchPage}
                    page={page}
                />
            </div>
        </MyOrdersSection>
    )
}

export default MyOrders

const MyOrdersSection = styled('div')(({ theme }) => ({
    padding: '20px 30px 40px',
    backgroundColor: '#F5F5F5',
}))

const TitleSection = styled('h2')({
    fontFamily: '"Kanit", "sans-serif"',
    margin: '10px 0',
    fontSize: '2.2em',
    width: '100%',
    textAlign: 'center',
})

const HelperText = styled('p')({
    margin: '0',
    fontSize: '0.9em',
    textAlign: 'center',
    fontFamily: '"Kanit", "sans-serif"',
    '& span.dot_required': {
        display: 'inline-block',
        color: 'red',
        fontSize: '1em',
        transform: 'scale(1.2)',
    },
})

const Error = styled('div')({
    fontFamily: '"Kanit", "sans-serif"',
    color: 'red',
    padding: '20px',
    textAlign: 'center',
})

const TabsTitle = styled('h6')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    margin: '0',
    padding: '10px 15px',
    fontFamily: '"Kanit", "sans-serif"',
    borderBottom: '1px lightgrey solid',
})

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

const ItemContainer = styled('div')({
    padding: '20px',
    backgroundColor: 'white',
    marginTop: '5px',
    width: '100%',
    boxSizing: 'border-box',
})

const ItemLabels = styled('div')({
    display: 'flex',
    columnGap: '30px',
    justifyContent: 'space-between',
    padding: '10px',
    boxSizing: 'border-box',
})

const ItemLabel = styled('div')({
    maxWidth: '25%',
})

const LabelName = styled('h2')({
    margin: '0',
    color: 'gray',
    fontSize: '1.1em',
    fontFamily: '"Kanit", "sans-serif"',
})

const LabelValue = styled('div')({
    fontFamily: '"Kanit", "sans-serif"',
    marginTop: '5px',
    fontSize: '0.9em',
})

const ItemHr = styled('div')({
    height: '1px',
    backgroundColor: 'lightgrey',
    marginTop: '15px',
})

const OrderHelpterText = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    fontSize: '0.8em',
    fontFamily: '"Kanit", "sans-serif"',
    color: 'gray',
    marginTop: '10px',
})

const Container = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '20px',
    padding: '10px 20px',
    boxSizing: 'border-box',
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
    fontFamily: '"Kanit", "sans-serif"',
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

const ReviewPages = styled(Pagination)({
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