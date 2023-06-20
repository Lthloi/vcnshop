import React, { useEffect } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from "react-redux"
import { getShop } from "../store/actions/shop_actions"
import RegisterShop from "../components/my_store/register_store"
import { Skeleton } from "@mui/material"
import Store from "../components/my_store/store"
import { Routes, Route } from "react-router-dom"
import PageLayout from '../components/layouts/page_layout'

const MyStore = () => {
    const { shop, loading, checkShopIsExist } = useSelector(({ shop }) => shop)
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
                ) : checkShopIsExist ? (
                    <RegisterShop />
                ) : shop && shop.name ? (
                    <Routes>
                        <Route path="/" element={<PageLayout />}>
                            <Route index element={<Store shop={shop} />} />
                        </Route>
                    </Routes>
                ) : (
                    <div>

                    </div>
                )
            }
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