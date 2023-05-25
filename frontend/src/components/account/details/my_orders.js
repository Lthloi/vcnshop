import React, { useEffect, useRef, useState } from "react"
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

const tabs = {
    ALL: '1',
    UNCOMPLETED: '2',
}

const stripe_payment_status = {
    SUCCESSED: 'succeeded',
    CANCELED: 'canceled',
    PROCESSING: 'processing',
}

const RenderType = (label_name, label_value) => {
    let style_for_status = {
        padding: '3px 8px',
        width: 'fit-content',
        borderRadius: '10px',
    }

    let set_style = {}

    if (label_value === stripe_payment_status.SUCCESSED)
        set_style = {
            ...style_for_status,
            backgroundColor: '#74ffcd',
        }
    else if (label_value === stripe_payment_status.PROCESSING)
        set_style = {
            ...style_for_status,
            backgroundColor: '#ffd995',
        }
    else if (label_value === stripe_payment_status.CANCELED)
        set_style = {
            ...style_for_status,
            backgroundColor: '#ff8b8b',
        }

    return (
        <ItemLabel>
            <LabelName>{label_name}</LabelName>
            <LabelValue sx={set_style}>
                {label_value}
            </LabelValue>
        </ItemLabel>
    )
}

const MyOrders = () => {
    const { orders, countOrder } = useSelector(({ order }) => order)
    const dispatch = useDispatch()
    const [tab, setTab] = useState(tabs.ALL)
    const [ordersPage, setOrdersPage] = useState(1)
    const orders_container_ref = useRef()
    console.log('>>> orders >>>', orders, countOrder, ordersPage)
    useEffect(() => {
        if (orders && orders.length === 0) dispatch(getOrders(1))
    }, [dispatch])

    const switchTab = (e, new_value) => {
        setTab(new_value)
    }

    const switchPage = (e, page) => {
        if (page === ordersPage) return

        orders_container_ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

        setOrdersPage(page)

        dispatch(getOrders(page))
    }

    return (
        <MyOrdersSection id="MyOrdersSection">
            <TitleSection>My Orders</TitleSection>
            <HelperText>
                {'Displaying ' + (countOrder < LIMIT_GET_ORDERS ? countOrder : LIMIT_GET_ORDERS) + ' of ' + countOrder}
            </HelperText>
            {
                orders && orders.length > 0 ?
                    <>
                        <MyOrdersContainer ref={orders_container_ref}>
                            <StyledTabs
                                value={tab}
                                onChange={switchTab}
                                textColor="inherit"
                            >
                                <Tab label="All" value={tabs.ALL} />
                                <Tab label="Un Completed" value={tabs.UNCOMPLETED} />
                            </StyledTabs>
                        </MyOrdersContainer>
                        {
                            orders.map(({ createdAt, order_status, _id, items_of_order, payment_info }) => (
                                <ItemContainer key={_id}>
                                    <ItemLabels>
                                        {RenderType('ORDER ID:', _id)}
                                        {RenderType('PAYMENT STATUS:', payment_info.status)}
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
                                            <Button>
                                                VIEW ORDER
                                            </Button>
                                            <Button sx={{ marginTop: '10px', display: 'flex' }}>
                                                <OpenInNewIcon sx={{ margin: 'auto' }} />
                                            </Button>
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
                    :
                    <>
                        <Loading sx={{ height: '50px', marginTop: '30px' }} />
                        <Loading sx={{ height: '300px', marginTop: '5px' }} />
                    </>
            }
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ReviewPages
                    count={Math.ceil(countOrder / LIMIT_GET_ORDERS)}
                    variant="outlined"
                    shape="rounded"
                    onChange={switchPage}
                    page={ordersPage}
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

const MyOrdersContainer = styled('div')({
    marginTop: '30px',
})

const StyledTabs = styled(Tabs)({
    backgroundColor: 'white',
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