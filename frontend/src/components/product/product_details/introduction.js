import React, { useEffect } from "react"
import { styled } from '@mui/material/styles'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useDispatch, useSelector } from "react-redux"
import AddIcon from '@mui/icons-material/Add'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
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
                    <Error>{error}</Error>
                ) : shop && shop.name &&
                <>
                    <DetailsContainer>
                        <Description>
                            {productDescription || ''}
                        </Description>
                    </DetailsContainer>

                    <ShopContainer>
                        <ShopInfoArea sx={{ backgroundImage: `url(${shop.background})` }}>
                            <ShopInfoContainer>
                                <Avatar src={shop.avatar} />
                                <NameAndUsername>
                                    <ShopName>{shop.name}</ShopName>
                                    <ShopUsername>{'@' + shop.username}</ShopUsername>
                                </NameAndUsername>
                            </ShopInfoContainer>
                            <FollowButtonWrapper>
                                <StyledAddIcon />
                                <span>Follow</span>
                            </FollowButtonWrapper>
                        </ShopInfoArea>

                        {shop.greeting && <ShopGreeting>{shop.greeting}</ShopGreeting>}

                        <VisitShopButton>
                            <span>Visit Shop</span>
                            <DoubleArrowIcon />
                        </VisitShopButton>
                    </ShopContainer>
                </>
            }
        </DetailsArea>
    )
}

export default Introduction

const DetailsArea = styled('div')(({ theme }) => ({
    width: '39%',
}))

const DetailsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    marginTop: '10px',
})

const DetailsTitle = styled('h2')({
    margin: '0',
    fontFamily: '"Kanit", "sans-serif"',
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
    fontFamily: '"Nunito", "sans-serif"',
    textAlign: 'center',
})

const Description = styled('p')({
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
})

const ShopContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    marginTop: '20px',
    backgroundColor: 'cornsilk',
})

const ShopInfoArea = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 8px',
    alignItems: 'center',
})

const ShopInfoContainer = styled('div')({
    display: 'flex',
    columnGap: '10px',
    alignItems: 'center',
})

const Avatar = styled('img')({
    width: '100px',
    height: '100px',
    border: '1px white solid',
    boxSizing: 'border-box',
})

const NameAndUsername = styled('div')({

})

const ShopName = styled('h2')({
    fontFamily: '"Work Sans", sans-serif',
    margin: '0',
    fontSize: '1.2em',
    backgroundColor: 'white',
    padding: '2px 8px',
    borderRadius: '5px',
})

const ShopUsername = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.8em',
    backgroundColor: 'white',
    padding: '2px 8px',
    borderRadius: '5px',
    width: 'fit-content',
})

const FollowButtonWrapper = styled('button')({
    display: 'flex',
    alignItems: 'center',
    padding: '4px 15px 3px',
    columnGap: '5px',
    cursor: 'pointer',
    backgroundColor: '#e3ffbf',
    border: '1px black solid',
    borderRadius: '3px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#edffd6',
    },
    '&:active': {
        backgroundColor: '#d6fea3',
    }
})

const StyledAddIcon = styled(AddIcon)({
    fontSize: '1.2em',
})

const ShopGreeting = styled('p')({
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
    textAlign: 'center',
    whiteSpace: 'pre-line',
    padding: '0 15px',
})

const VisitShopButton = styled('button')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '3px',
    backgroundColor: 'blanchedalmond',
    borderRadius: '5px',
    border: '1px black solid',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0px 2px 0px grey',
    '&:active': {
        boxShadow: '0px 0px 0px grey',
        transform: 'translateY(2px)',
    }
})