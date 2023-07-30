import React, { useEffect, useState } from "react"
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
import { Skeleton, Stack } from "@mui/material"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import Products from "../components/admin/products"
import { getShopsByAdmin } from "../store/actions/shop_actions"

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
        setButton(label_of_button)
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
            <PageTitleContainer>
                <AdminPanelSettingsIcon sx={{ fontSize: '1.8em' }} />
                <Title>Admin</Title>
            </PageTitleContainer>
            <AdminSection>
                <StyledList component="div">
                    <ListTitle>
                        {button}
                    </ListTitle>
                    {
                        nav_options.map(({ label, icon }) => (
                            <ListItemButtonWrapper
                                key={label}
                                sx={button === label ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'rgb(53,53,59)' }}
                            >
                                <StyledListItemButton onClick={() => switchButton(label)}>
                                    <ListItemIcon>
                                        {icon(button === label)}
                                    </ListItemIcon>
                                    <ListItemText primary={label} />
                                </StyledListItemButton>
                            </ListItemButtonWrapper>
                        ))
                    }
                </StyledList>
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
                        )
                        :
                        <Stack width="100%" boxSizing="border-box">
                            <StyledSkeleton sx={{ height: '100px' }} />
                            <StyledSkeleton sx={{ height: '380px', marginTop: '20px' }} />
                        </Stack>
                }
            </AdminSection>
        </AdminPageSection>
    )
}

export default Admin

const Error = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.nunito,
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
    color: 'red',
}))

const AdminPageSection = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.arial,
    padding: '30px 40px',
}))

const PageTitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    borderBottom: '2px black solid',
    paddingLeft: '10px',
})

const Title = styled('h2')({
    margin: '0',
    fontFamily: 'Kanit, "sans-serif"',
    fontSize: '1.8em',
})

const AdminSection = styled('div')({
    display: 'flex',
    columnGap: '30px',
    marginTop: '30px',
    boxSizing: 'border-box',
})

const ListTitle = styled('h2')({
    margin: '0',
    fontSize: '1.5em',
    fontWeight: 'bold',
    borderBottom: '2px lightgrey solid',
    borderRadius: '10px',
    padding: '15px 0 30px',
    textAlign: 'center',
    marginBottom: '20px',
})

const StyledList = styled(List)({
    width: '25%',
    padding: '30px 20px',
    backgroundColor: 'rgb(53,53,59)',
    color: 'white',
    borderRadius: '5px',
})

const ListItemButtonWrapper = styled('div')({
    marginTop: '10px',
    borderRadius: '5px',
    border: '1px lightgrey solid',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.1)',
    },
})

const StyledListItemButton = styled(ListItemButton)({
    '& .MuiListItemIcon-root': {
        minWidth: '40px',
    },
})

const StyledSkeleton = styled(Skeleton)({
    transform: 'none',
    width: '100%',
})