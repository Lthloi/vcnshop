import React, { startTransition, useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersByAdmin } from "../store/actions/order_actions"
import { getUsersByAdmin } from "../store/actions/user_actions"
import { getProductsByAdmin } from "../store/actions/product_actions"
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Dashboard from "../components/admin/dashboard"
import { Box, Skeleton, Stack, Typography, useMediaQuery } from "@mui/material"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import Products from "../components/admin/products"
import { getShopsByAdmin } from "../store/actions/shop_actions"
import InfoIcon from '@mui/icons-material/Info'

const style_for_icons = {
    is_active: {
        color: 'black',
    },
    non_active: {
        color: 'white',
    }
}

const tabs = {
    dashboard: 'Dashboard',
    products: 'Products',
}

const nav_options = [
    {
        label: tabs.dashboard,
        icon: (is_active) => <DashboardIcon sx={is_active ? style_for_icons.is_active : style_for_icons.non_active} />,
    }, {
        label: tabs.products,
        icon: (is_active) => <AllInboxIcon sx={is_active ? style_for_icons.is_active : style_for_icons.non_active} />,
    },
]

const Admin = () => {
    const { users, error: user_error } = useSelector(({ user }) => user)
    const { orders, error: order_error } = useSelector(({ order_for_user }) => order_for_user)
    const { products, error: product_error } = useSelector(({ product }) => product)
    const { shops, error: shop_error } = useSelector(({ shop }) => shop)
    const dispatch = useDispatch()
    const [button, setButton] = useState(nav_options[0].label)

    useEffect(() => {
        dispatch(getOrdersByAdmin('createdAt', 'payment_status'))
        dispatch(getUsersByAdmin('createdAt', 'active'))
        dispatch(getProductsByAdmin('createdAt', 'stock', 'review.count_reviews', 'target_gender'))
        dispatch(getShopsByAdmin('createdAt'))
    }, [dispatch])

    const switchButton = (label_of_button) => {
        if (label_of_button === button) return
        startTransition(() => {
            setButton(label_of_button)
        })
    }

    if (user_error || order_error || product_error || shop_error)
        return (
            <Error>
                {user_error && <div>{user_error.message}</div>}
                {order_error && <div>{order_error.message}</div>}
                {product_error && <div>{product_error.message}</div>}
                {shop_error && <div>{shop_error.message}</div>}
            </Error>
        )

    return (
        <AdminPageSection id="AdminPageSection">
            <PageTitle>
                <AdminPanelSettingsIcon sx={{ fontSize: '1.8em' }} />
                <Title>Admin</Title>
            </PageTitle>

            <Box
                display='flex'
                columnGap='30px'
                marginTop='30px'
                boxSizing='border-box'
            >
                <Navigation component="div">
                    <NavigationLabel>
                        {button}
                    </NavigationLabel>

                    {
                        nav_options.map(({ label, icon }) => (
                            <NavBtnWrapper
                                key={label}
                                sx={button === label ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'rgb(53,53,59)' }}
                            >
                                <NavButton onClick={() => switchButton(label)}>
                                    <ListItemIcon>
                                        {icon(button === label)}
                                    </ListItemIcon>
                                    <ListItemText primary={label} />
                                </NavButton>
                            </NavBtnWrapper>
                        ))
                    }
                </Navigation>

                {
                    users && orders && products ?
                        button === tabs.dashboard ? (
                            <Dashboard
                                users={users}
                                orders={orders}
                                products={products}
                                shops={shops}
                            />
                        ) : button === tabs.products && (
                            <Products products={products} />
                        ) :
                        <Stack width="100%" boxSizing="border-box">
                            <Loading sx={{ height: '100px' }} />
                            <Loading sx={{ height: '380px', marginTop: '20px' }} />
                        </Stack>
                }
            </Box>
        </AdminPageSection>
    )
}

const ResponsiveAdmin = () => {
    const matches_from_lg = useMediaQuery(theme => theme.breakpoints.up('lg'))

    if (matches_from_lg)
        return <Admin />

    return (
        <AdminPageSection id="AdminPageSection">
            <PageTitle>
                <AdminPanelSettingsIcon sx={{ fontSize: '1.8em' }} />
                <Title>Admin</Title>
            </PageTitle>

            <Stack
                width="100%"
                padding="10px"
                boxSizing="border-box"
                alignItems="center"
            >
                <Typography
                    fontSize="1.2em"
                    fontWeight="bold"
                    marginTop="30px"
                    width="fit-content"
                >
                    <InfoIcon sx={{ float: 'left', paddingRight: '10px' }} />
                    You can't access this page on mobile devices.
                    Let's try to change your device or set the size of browser's screen to bigger.
                </Typography>
            </Stack>
        </AdminPageSection>
    )
}

export default ResponsiveAdmin

const Error = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    fontFamily: theme.fontFamily.nunito,
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
    marginTop: '20px',
}))

const AdminPageSection = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.arial,
    padding: '30px 40px',
}))

const PageTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    borderBottom: '2px black solid',
    paddingLeft: '10px',
})

const Title = styled('h2')(({ theme }) => ({
    margin: '0',
    fontSize: '1.8em',
    fontFamily: theme.fontFamily.kanit,
}))

const NavigationLabel = styled('h2')({
    margin: '0',
    fontSize: '1.5em',
    fontWeight: 'bold',
    borderBottom: '2px lightgrey solid',
    borderRadius: '10px',
    padding: '15px 0 30px',
    textAlign: 'center',
    marginBottom: '20px',
})

const Navigation = styled(List)({
    width: '25%',
    padding: '30px 20px',
    backgroundColor: 'rgb(53,53,59)',
    color: 'white',
    borderRadius: '5px',
})

const NavBtnWrapper = styled('div')({
    marginTop: '10px',
    borderRadius: '5px',
    border: '1px lightgrey solid',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.1)',
    },
})

const NavButton = styled(ListItemButton)({
    '& .MuiListItemIcon-root': {
        minWidth: '40px',
    },
})

const Loading = styled(Skeleton)({
    transform: 'none',
    width: '100%',
})