import React from "react"
import { styled } from '@mui/material/styles'
import empty_cart from '../../assets/images/empty_cart.svg'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
    removeItemFromCart, changeQuantity,
} from "../../store/actions/cart_actions"
import { useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom'
import { Tooltip } from "@mui/material"

const description_titles = [
    { title: 'Product', width: '20%', },
    { title: 'Detail', width: '35%', },
    { title: 'Quantity', width: '15%', },
    { title: 'Price', width: '15%', },
    { title: 'Remove', width: '15%', },
]

const quantity_icon_style = {
    cursor: 'pointer',
    width: '1em',
    height: '1em',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.2)',
    }
}

const ProductCardsSection = ({ cartItems }) => {
    const dispatch = useDispatch()

    const removeItems = (product_id) => {
        dispatch(removeItemFromCart(product_id))
    }

    const changeProductQuantity = (option, quantity, stock, product_id) => {
        if (option === 1 && quantity === stock) return
        if (option === -1 && quantity === 1) return
        dispatch(changeQuantity(product_id, option))
    }

    return (
        <ProductCardsSectionArea
            id="ProductCardsSectionArea"
            sx={cartItems.length > 0 ? { height: 'fit-content' } : { height: 'auto' }}
        >
            <DescriptionsCard>
                {
                    description_titles.map(({ title, width }) => (
                        <DescriptionsTitle
                            title={title}
                            key={title}
                            sx={{ width }}
                        >
                            {title}
                        </DescriptionsTitle>
                    ))
                }
            </DescriptionsCard>
            {
                cartItems.length > 0 ?
                    cartItems.map(({ _id, image_link, name, size, color, quantity, stock, price }) => (
                        <React.Fragment key={_id}>
                            <ProductCardsArea>
                                <ProductImgWrapper to={`/productDetail/${_id}`}>
                                    <img src={image_link} style={{ width: '100%' }} alt="Product" />
                                </ProductImgWrapper>
                                <ProductInfoContainer>
                                    <Name to={`/productDetail/${_id}`}>
                                        {name}
                                    </Name>
                                    <div>{'Size: ' + size}</div>
                                    <div>{'Color: ' + color}</div>
                                </ProductInfoContainer>
                                <Quantity>
                                    <Tooltip title="Increase one" placement="top">
                                        <AddCircleOutlineIcon
                                            sx={quantity_icon_style}
                                            onClick={() => changeProductQuantity(1, quantity, stock, _id)}
                                        />
                                    </Tooltip>
                                    <NumberCount>{quantity}</NumberCount>
                                    <Tooltip title="Decrease one">
                                        <RemoveCircleOutlineIcon
                                            sx={quantity_icon_style}
                                            onClick={() => changeProductQuantity(-1, quantity, stock, _id)}
                                        />
                                    </Tooltip>
                                </Quantity>
                                <Price>
                                    {'$' + price.toLocaleString('en', { useGrouping: true })}
                                </Price>
                                <Remove>
                                    <Tooltip title="Remove this product">
                                        <StyledDeleteForeverIcon onClick={() => removeItems(_id)} />
                                    </Tooltip>
                                </Remove>
                            </ProductCardsArea>

                            <Hr />
                        </React.Fragment>
                    ))
                    :
                    <EmptyCartContainer>
                        <img
                            src={empty_cart}
                            style={{ height: '20vh' }}
                            alt="Empty"
                        />
                        <EmptyCartText>
                            THERE IS NO ITEM IN YOUR CART
                        </EmptyCartText>
                        <EmptyCartText className="desc">
                            Let's shop now and make up your cart!!
                        </EmptyCartText>
                        <EmptyCartBtn href="/">
                            Shopping Now
                        </EmptyCartBtn>
                    </EmptyCartContainer>
            }
        </ProductCardsSectionArea>
    )
}

export default ProductCardsSection

const ProductCardsSectionArea = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '65%',
    backgroundColor: '#f0f0f0',
    fontFamily: theme.fontFamily.nunito,
}))

const DescriptionsCard = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '10px',
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: 'black',
    marginBottom: '10px',
})

const DescriptionsTitle = styled('div')({
    fontWeight: 'bold',
    fontSize: '1.1em',
    textAlign: 'center',
    color: 'black',
    borderRadius: '5px',
    backgroundColor: 'white',
    padding: '2px 0',
    boxSizing: 'border-box',
})

const ProductCardsArea = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '10px',
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%',
}))

const ProductImgWrapper = styled(NavLink)({
    display: 'block',
    width: description_titles[0].width,
    boxSizing: 'border-box',
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

const ProductInfoContainer = styled('div')({
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    width: description_titles[1].width,
    boxSizing: 'border-box',
})

const Name = styled(NavLink)({
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

const Quantity = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: '5px',
    width: description_titles[2].width,
    boxSizing: 'border-box',
})

const NumberCount = styled('div')({
    fontSize: '1.2em',
    fontWeight: 'bold',
})

const Price = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.2em',
    width: description_titles[3].width,
    boxSizing: 'border-box',
})

const Remove = styled('div')({
    display: 'flex',
    width: description_titles[4].width,
    boxSizing: 'border-box',
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

const EmptyCartContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto',
    padding: '50px 10px',
})

const EmptyCartText = styled('p')(({ theme }) => ({
    display: 'block',
    fontFamily: theme.fontFamily.kanit,
    fontWeight: 'bold',
    fontSize: '1.5em',
    color: '#323232',
    margin: '0',
    marginTop: '10px',
    '&.desc': {
        display: 'block',
        fontWeight: 'bold',
        fontSize: '0.9em',
        marginTop: '0px',
    }
}))

const EmptyCartBtn = styled('a')({
    padding: '10px 20px',
    borderRadius: '10px',
    fontFamily: 'nunito',
    fontWeight: 'bold',
    fontSize: '1em',
    color: 'white',
    backgroundColor: 'black',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'transform 0.2s',
    textDecoration: 'unset',
    '&:hover': {
        transform: 'scale(1.05)',
    },
})