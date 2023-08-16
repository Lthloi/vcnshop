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
import { Tooltip, Box, Stack, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"
import ProgressiveImage from "../materials/progressive_image"

const titles = [
    { title: 'Product', width: '20%', },
    { title: 'Detail', width: '35%', },
    { title: 'Quantity', width: '15%', },
    { title: 'Price', width: '15%', },
    { title: 'Remove', width: '15%', },
]

const ProductCard = ({ itemInfo }) => {
    const { _id, image_link, name, size, color, quantity, stock, price } = itemInfo
    const dispatch = useDispatch()

    const removeItems = () => {
        dispatch(removeItemFromCart(_id))
    }

    const changeProductQuantity = (option) => {
        if (option === 1 && quantity === stock) return
        if (option === -1 && quantity === 1) return
        dispatch(changeQuantity(_id, option))
    }

    const getQtyIocnStyle = (option) => {
        let quantity_icon_style = {
            cursor: 'pointer',
            width: '1em',
            height: '1em',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.2)',
            }
        }

        if ((option === 1 && quantity === stock) || (option === -1 && quantity === 1))
            return { ...quantity_icon_style, opacity: '0.5', pointerEvents: 'none' }
        else
            return quantity_icon_style
    }

    return (
        <Stack
            flexDirection="row"
            justifyContent='space-between'
            columnGap='10px'
            padding='10px'
            boxSizing='border-box'
            width='100%'
        >
            <Box
                to={`/productDetail/${_id}`}
                component={NavLink}
                display='block'
                width={titles[0].width}
                boxSizing='border-box'
                height="145px"
            >
                <ProgressiveImage
                    src={image_link}
                    scss={{ maxHeight: '100%' }}
                    width="100%"
                    alt="Product"
                />
            </Box>
            <Stack
                marginLeft='10px'
                rowGap='10px'
                width={titles[1].width}
                boxSizing='border-box'
            >
                <Name to={`/productDetail/${_id}`}>
                    {name}
                </Name>
                <div>{'Size: ' + size}</div>
                <div>{'Color: ' + color}</div>
            </Stack>
            <Stack
                justifyContent='center'
                alignItems='center'
                rowGap='5px'
                width={titles[2].width}
                boxSizing='border-box'
            >
                <Tooltip title="Increase one" placement="top">
                    <AddCircleOutlineIcon
                        sx={getQtyIocnStyle(1)}
                        onClick={() => changeProductQuantity(1)}
                    />
                </Tooltip>
                <Typography
                    fontSize='1.2em'
                    fontWeight='bold'
                >
                    {quantity}
                </Typography>
                <Tooltip title="Decrease one">
                    <RemoveCircleOutlineIcon
                        sx={getQtyIocnStyle(-1)}
                        onClick={() => changeProductQuantity(-1)}
                    />
                </Tooltip>
            </Stack>
            <Stack
                flexDirection="row"
                justifyContent='center'
                alignItems='center'
                fontWeight='bold'
                fontSize='1.2em'
                width={titles[3].width}
                boxSizing='border-box'
            >
                {'$' + price.toLocaleString('en', { useGrouping: true })}
            </Stack>
            <Stack
                flexDirection="row"
                width={titles[4].width}
                boxSizing='border-box'
            >
                <Tooltip title="Remove this product">
                    <StyledDeleteForeverIcon onClick={() => removeItems(_id)} />
                </Tooltip>
            </Stack>
        </Stack >
    )
}

const ProductCards = ({ cartItems }) => {
    const theme = useTheme()

    return (
        <Stack
            id="ProductCardsSection"
            component="div"
            alignItems='center'
            width='65%'
            backgroundColor='#f0f0f0'
            fontFamily={theme.fontFamily.nunito}
            sx={cartItems.length > 0 ? { height: 'fit-content' } : { height: 'auto' }}
        >
            <Stack
                flexDirection="row"
                justifyContent='space-between'
                columnGap='10px'
                padding='10px'
                boxSizing='border-box'
                width='100%'
                backgroundColor='black'
                marginBottom='10px'
            >
                {
                    titles.map(({ title, width }) => (
                        <Tooltip
                            key={title}
                            title={title}
                        >
                            <Typography
                                fontWeight='bold'
                                fontSize='1.1em'
                                textAlign='center'
                                color='black'
                                borderRadius='5px'
                                backgroundColor='white'
                                padding='2px 0'
                                boxSizing='border-box'
                                width={width}
                            >
                                {title}
                            </Typography>
                        </Tooltip>
                    ))
                }
            </Stack>
            {
                cartItems.length > 0 ?
                    cartItems.map((item) => (
                        <React.Fragment key={item._id}>
                            <ProductCard itemInfo={item} />

                            <Hr />
                        </React.Fragment>
                    ))
                    :
                    <Stack
                        justifyContent='center'
                        alignItems='center'
                        margin='auto'
                        padding='50px 10px'
                    >
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
                    </Stack>
            }
        </Stack>
    )
}

export default ProductCards

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