import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import PhoneIcon from '@mui/icons-material/Phone'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import StoreIcon from '@mui/icons-material/Store'
import { useDispatch, useSelector } from "react-redux"
import CheckroomIcon from '@mui/icons-material/Checkroom'
import { Skeleton } from "@mui/material"
import ErrorIcon from '@mui/icons-material/Error'
import AddProduct from './add_product'

const tabs = {
    Products: 'Products',
    Greeting: 'Greeting',
}

const Store = ({ shop }) => {
    const [tab, setTab] = useState(tabs.Products)
    const { products, loading, error } = useSelector(({ product }) => product.search)
    const dispatch = useDispatch()
    console.log('>>> shop >>>', shop)

    const switchTab = (e, new_tab) => {
        setTab(new_tab)
    }

    return (
        <InfoContainer id="StoreSection">
            <PageTitleContainer>
                <StoreIcon sx={{ width: '1.4em', height: '1.4em' }} />
                <Title>Store</Title>
            </PageTitleContainer>
            <AvatarContainer>
                <StyledAvatar>{shop.name[0]}</StyledAvatar>
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
                        <div>
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
                                    <div>

                                    </div>
                                ) : (
                                    <ProductsTitle>
                                        <CheckroomIcon sx={{ fontSize: '1.8em' }} />
                                        <div>Oops! You don't have any product!</div>
                                    </ProductsTitle>
                                )
                            }
                        </div>
                    ) : tab === tabs.Greeting && (
                        <Greeting>{shop.greeting}</Greeting>
                    )
                }
            </Content>
        </InfoContainer>
    )
}

export default Store

const InfoContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    padding: '30px 50px',
})

const PageTitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    boxSizing: 'border-box',
    width: '100%',
    borderBottom: '2px black solid',
})

const Title = styled('h2')({
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

const Greeting = styled('div')({
    padding: '10px 30px',
    borderLeft: '1px lightgrey solid',
    whiteSpace: 'pre',
    width: '100%',
    boxSizing: 'border-box',
})

const ProductsTitle = styled('h2')({
    fontSize: '1.2em',
    width: '100%',
    textAlign: 'center',
    marginTop: '30px',
})