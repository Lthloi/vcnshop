import React from "react"
import { styled } from '@mui/material/styles'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import StorefrontIcon from '@mui/icons-material/Storefront'
import {
    removeItemFromCart, changeQuantity,
} from "../../store/actions/cart_actions"
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'

const quantity_icon_style = {
    cursor: 'pointer',
    width: '1em',
    height: '1em',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.2)',
    }
}

const ProductCard = ({ item }) => {
    const { _id, image_link, name, size, color, quantity, stock, cost, shop } = item
    const dispatch = useDispatch()

    const removeItems = () => {
        dispatch(removeItemFromCart(_id))
    }

    const changeProductQuantity = (option) => {
        if (option === 1 && quantity === stock) return
        if (option === -1 && quantity === 1) return
        dispatch(changeQuantity(_id, option))
    }

    return (
        <>
            <ProductCardsArea id="ProductCardCart">
                <ProductImgWrapper to={`/productDetail/${_id}`}>
                    <ProductImg src={image_link} />
                </ProductImgWrapper>
                <ProductInfoContainer>
                    <ProductInfoWrapper>
                        <Name title={name} to={`/productDetail/${_id}`}>
                            {name}
                        </Name>
                        <Size>{'Size: ' + size}</Size>
                        <Color>{'Color: ' + color}</Color>
                    </ProductInfoWrapper>
                    <Shop>
                        <ShopWrapper>
                            <StorefrontIcon sx={{ height: '1em', width: '1em', }} />
                            <ShopName>{'Shop: ' + shop.name}</ShopName>
                        </ShopWrapper>
                    </Shop>
                </ProductInfoContainer>
                <Quantity>
                    <AddCircleOutlineIcon
                        titleAccess="Increase one"
                        sx={quantity_icon_style}
                        onClick={() => changeProductQuantity(1)}
                    />
                    <NumberCount>{quantity}</NumberCount>
                    <RemoveCircleOutlineIcon
                        titleAccess="Decrease one"
                        sx={quantity_icon_style}
                        onClick={() => changeProductQuantity(-1)}
                    />
                </Quantity>
                <Price>
                    {'$' + cost.toLocaleString('en', { useGrouping: true })}
                </Price>
                <Remove>
                    <StyledDeleteForeverIcon
                        titleAccess="Remove this product"
                        onClick={removeItems}
                    />
                </Remove>
            </ProductCardsArea>

            <Hr />
        </>
    )
}

export default ProductCard

const ProductCardsArea = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '10px',
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%',
}))

const ProductImgWrapper = styled(Link)({
    display: 'block',
    width: '20%',
})

const Hr = styled('hr')({
    border: '0.5px grey solid',
    width: '100%',
    backgroundColor: 'grey',
    margin: '10px auto',
    boxSizing: 'border-box',
    '&:last-of-type': {
        display: 'none',
    }
})

const ProductImg = styled('img')({
    width: '100%',
})

const ProductInfoContainer = styled('div')({
    flex: '3',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    rowGap: '5px',
})

const ProductInfoWrapper = styled('div')({
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
})

const Name = styled(Link)({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.1em',
    fontWeight: 'bold',
    width: 'fit-content',
    cursor: 'pointer',
    color: 'black',
    textDecoration: 'unset',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const Size = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
})

const Color = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
})

const Shop = styled('div')({
    width: '100%',
    boxSizing: 'border-box',
})

const ShopWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
    cursor: 'pointer',
    columnGap: '5px',
    width: 'fit-content',
})

const ShopName = styled('div')({
    fontFamily: '"Finlandica", "sans-serif"',
    fontSize: '0.9em',
    width: 'fit-content',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const Quantity = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: '5px',
    flex: '1',
})

const NumberCount = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.2em',
    fontWeight: 'bold',
})

const Price = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.2em',
    flex: '1',
})

const Remove = styled('div')({
    display: 'flex',
    flex: '1',
})

const StyledDeleteForeverIcon = styled(DeleteForeverIcon)({
    height: '1.5em',
    width: '1.5em',
    margin: 'auto',
    cursor: 'pointer',
    color: 'red',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.2)',
    }
})