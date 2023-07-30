import React, { useEffect } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from "react-redux"
import { getShop } from "../store/actions/shop_actions"
import RegisterShop from "../components/my_store/register_store"
import { Skeleton, Stack } from "@mui/material"
import Avatar from '@mui/material/Avatar'
import PhoneIcon from '@mui/icons-material/Phone'
import StoreIcon from '@mui/icons-material/Store'
import Products from "../components/my_store/products"
import ScrollToTopBtn from "../components/scroll_top_top_btn"
import Orders from '../components/my_store/orders'
import { useNavigate, Route, Routes } from "react-router-dom"
import { useCurrentRoute } from "../hooks/custom_hooks"
import ErrorIcon from '@mui/icons-material/Error'
import ProductDetail from '../components/my_store/product_detail'

const GreetingSection = ({ greeting }) => {
    return (
        <Greeting>
            {greeting}
        </Greeting>
    )
}

const StoreInfo = ({ store }) => {
    return (
        <Stack
            bgcolor="rgba(0,0,0,0.05)"
            width="100%"
            justifyContent="center"
            alignItems="center"
            padding="30px"
            marginTop="30px"
            boxSizing="border-box"
            borderRadius="10px"
        >
            <Stack>
                {
                    store.avatar ?
                        <StyledAvatar src={store.avatar} alt="Shop Avatar" />
                        :
                        <StyledAvatar>{store.name[0]}</StyledAvatar>
                }
                <div style={{ margin: '15px auto', fontSize: '1.2em' }}>
                    {store.name}
                </div>
            </Stack>

            <Stack columnGap="5px" alignItems="center" fontSize="0.8em" color="gray" flexDirection="row">
                <PhoneIcon sx={{ fontSize: '1.2em' }} />
                <span>{store.contact_info.phone}</span>
            </Stack>
        </Stack>
    )
}

const NavButton = ({ navText, href }) => {
    const navigate = useNavigate()
    const current_route = useCurrentRoute()

    const switchNav = (href) => {
        navigate('/myStore/' + href)
    }

    return (
        <NavBtn
            onClick={() => switchNav(href)}
            sx={current_route.includes(href) ? { backgroundColor: 'black', color: 'white' } : {}}
        >
            {navText}
        </NavBtn>
    )
}

const Navigation = () => {

    return (
        <Stack flexDirection="row" marginTop="20px" width="100%">
            <NavButton navText={'Products'} href={'Products'} />
            <NavButton navText={'Greeting'} href={'Greeting'} />
            <NavButton navText={'Orders'} href={'Orders'} />
        </Stack>
    )
}

const MyStore = () => {
    const { shop, loading, error, checkShopIsExist } = useSelector(({ shop }) => shop)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!checkShopIsExist)
            dispatch(getShop())
    }, [dispatch])

    return (
        <MyStoreSection id="MyStoreSection">
            {
                loading ? (
                    <div style={{ padding: '20px' }}>
                        <Loading sx={{ height: '50px' }} />
                        <Loading sx={{ height: '300px' }} />
                        <Loading sx={{ height: '50px' }} />
                    </div>
                ) : error && error.statusCode !== 404 ? (
                    <Error>
                        {error.message}
                    </Error>
                ) : !checkShopIsExist ? (
                    <RegisterShop />
                ) : shop && (
                    <Stack
                        id="StoreSection"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        boxSizing="border-box"
                        padding="50px 30px"
                    >

                        <PageTitle>
                            <StoreIcon sx={{ width: '1.4em', height: '1.4em' }} />
                            <span>Store</span>
                        </PageTitle>

                        <StoreInfo store={shop} />

                        <Navigation />

                        <Note>
                            <ErrorIcon sx={{ fontSize: '1.2em', color: 'gray' }} />
                            <span>Now select one tab above to view</span>
                        </Note>

                        <Main>
                            <Routes>
                                <Route path="/Products/*" element={<Products shopId={shop._id} />} />
                                <Route path="/Greeting" element={<GreetingSection greeting={shop.greeting} />} />
                                <Route path="/Orders/*" element={<Orders />} />
                                <Route path="/Product/:productId" element={<ProductDetail />} />
                            </Routes>
                        </Main>

                    </Stack>
                )
            }

            <ScrollToTopBtn />
        </MyStoreSection>
    )
}

export default MyStore

const MyStoreSection = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.nunito,
}))

const Loading = styled(Skeleton)({
    marginTop: '20px',
    transform: 'none',
})

const PageTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    boxSizing: 'border-box',
    width: '100%',
    borderBottom: '2px black solid',
    margin: '0',
    fontSize: '1.8em',
})

const StyledAvatar = styled(Avatar)({
    width: '150px',
    height: '150px',
    backgroundColor: 'black',
    color: 'white',
    border: '2px white solid',
})

const NavBtn = styled('button')({
    fontWeight: 'bold',
    border: '2px black solid',
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 30px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'transform 0.2s ease',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
        transform: 'scale(1.1)',
    }
})

const Note = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    marginTop: '10px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '0.8em',
})

const Main = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.nunito,
    padding: '30px 50px 0',
    width: '100%',
    boxSizing: 'border-box',
}))

const Greeting = styled('div')({
    padding: '10px 30px',
    borderLeft: '1px lightgrey solid',
    borderRight: '1px lightgrey solid',
    whiteSpace: 'pre-line',
    width: '100%',
    boxSizing: 'border-box',
})

const Error = styled('div')({
    color: 'red',
    fontWeight: 'bold',
    fontSize: '1.3em',
    width: '100%',
    textAlign: 'center',
    marginTop: '30px',
})