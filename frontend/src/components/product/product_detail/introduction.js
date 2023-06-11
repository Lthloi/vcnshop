import React, { useEffect } from "react"
import { styled } from '@mui/material/styles'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useDispatch, useSelector } from "react-redux"
import { Skeleton } from "@mui/material"
import { getShop } from "../../../store/actions/shop_actions"

const Introduction = ({ productDescription, shopUsername }) => {
    const { shop, loading, error } = useSelector(({ shop }) => shop)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getShop(shopUsername))
    }, [dispatch])

    return (
        <DetailsArea id="DetailsArea">
            <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                <AutoAwesomeIcon />
                <DetailsTitle>Introduction</DetailsTitle>
            </div>

            <Hr />

            {
                loading ? (
                    <>
                        <Loading sx={{ height: '120px' }} />
                        <Loading sx={{ height: '300px' }} />
                    </>
                ) : error ? (
                    <Error>{error.message}</Error>
                ) : shop && shop.name &&
                <>
                    <DetailsContainer>
                        <Description>
                            {productDescription || ''}
                        </Description>
                    </DetailsContainer>

                    <ShopContainer>
                        <Avatar src={shop.avatar} />
                        <ShopName>{shop.name}</ShopName>

                        {shop.greeting && <ShopGreeting>{shop.greeting}</ShopGreeting>}
                    </ShopContainer>
                </>
            }
        </DetailsArea>
    )
}

export default Introduction

const DetailsArea = styled('div')(({ theme }) => ({
    width: '39%',
    fontFamily: theme.fontFamily.nunito,
}))

const DetailsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    marginTop: '10px',
})

const DetailsTitle = styled('h2')({
    margin: '0',
    fontSize: '1.5em',
    transform: 'scaleY(0.9)',
})

const Hr = styled('div')({
    height: '2px',
    backgroundColor: 'black',
})

const Loading = styled(Skeleton)({
    width: '100%',
    transform: 'unset',
    transformOrigin: 'unset',
    marginTop: '20px',
})

const Error = styled('div')({
    color: 'red',
    fontSize: '1.1em',
    textAlign: 'center',
})

const Description = styled('p')({
    margin: '0',
    fontSize: '0.9em',
})

const ShopContainer = styled('div')({
    marginTop: '30px',
})

const Avatar = styled('img')({
    width: '100px',
    height: '100px',
    border: '2px lightgrey solid',
    boxSizing: 'border-box',
    borderRadius: '50%',
    marginTop: '20px',
})

const ShopName = styled('h2')(({ theme }) => ({
    margin: '0',
    fontSize: '1.2em',
    backgroundColor: 'white',
    padding: '2px 8px',
    borderRadius: '5px',
    marginTop: '5px',
    fontFamily: theme.fontFamily.kanit,
}))

const ShopGreeting = styled('p')({
    margin: '0',
    fontSize: '0.9em',
    whiteSpace: 'pre-line',
    padding: '5px 15px',
    marginTop: '10px',
    borderLeft: '1px black solid',
})