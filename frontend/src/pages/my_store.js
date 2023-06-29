import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from "react-redux"
import { getShop } from "../store/actions/shop_actions"
import RegisterShop from "../components/my_store/register_store"
import { Skeleton } from "@mui/material"
import Avatar from '@mui/material/Avatar'
import PhoneIcon from '@mui/icons-material/Phone'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import StoreIcon from '@mui/icons-material/Store'
import Products from "../components/my_store/products"
import ScrollToTopBtn from "../components/scroll_top_top_btn"

const tabs = {
    Products: 'Products',
    Greeting: 'Greeting',
}

const MyStore = () => {
    const { shop, loading, error, checkShopIsExist } = useSelector(({ shop }) => shop)
    const dispatch = useDispatch()
    const [tab, setTab] = useState(tabs.Products)

    const switchTab = (e, new_tab) => {
        setTab(new_tab)
    }

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
                ) : shop && shop.name && (
                    <InfoContainer id="StoreSection">
                        <PageTitle>
                            <StoreIcon sx={{ width: '1.4em', height: '1.4em' }} />
                            <span>Store</span>
                        </PageTitle>
                        <AvatarContainer>
                            {
                                shop.avatar ?
                                    <StyledAvatar src={shop.avatar} alt="Shop Avatar" />
                                    :
                                    <StyledAvatar>{shop.name[0]}</StyledAvatar>
                            }
                            <div style={{ margin: '15px auto', fontSize: '1.2em' }}>
                                {shop.name}
                            </div>
                        </AvatarContainer>
                        <ContactInfo>
                            <PhoneIcon sx={{ fontSize: '1.2em' }} />
                            <span>{shop.contact_info.phone}</span>
                        </ContactInfo>
                        <TabsWrapper>
                            <Tabs
                                value={tab}
                                onChange={switchTab}
                                textColor="inherit"
                            >
                                <Tab label={tabs.Products} value={tabs.Products} />
                                <Tab label={tabs.Greeting} value={tabs.Greeting} />
                            </Tabs>
                        </TabsWrapper>
                        <Content>
                            {
                                tab === tabs.Products ? (
                                    <Products shopId={shop._id} />
                                ) : tab === tabs.Greeting && (
                                    <Greeting>{shop.greeting}</Greeting>
                                )
                            }
                        </Content>
                    </InfoContainer>
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

const InfoContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    padding: '30px 50px',
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

const AvatarContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
})

const StyledAvatar = styled(Avatar)({
    width: '100px',
    height: '100px',
    backgroundColor: 'black',
    color: 'white',
    border: '2px white solid',
})

const ContactInfo = styled('div')({
    display: 'flex',
    columnGap: '5px',
    alignItems: 'center',
    fontSize: '0.8em',
    color: 'gray',
})

const TabsWrapper = styled('div')({
    color: 'white',
    backgroundColor: 'black',
    marginTop: '30px',
    width: '100%',
    boxSizing: 'border-box',
    '& .MuiTabs-indicator': {
        height: '4px',
        backgroundColor: '#3FACB1',
    }
})

const Content = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.nunito,
    padding: '30px 50px 0',
    width: '100%',
    boxSizing: 'border-box',
}))

const Greeting = styled('div')({
    padding: '10px 30px',
    borderLeft: '1px lightgrey solid',
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