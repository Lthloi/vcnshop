import React from "react"
import { styled } from '@mui/material/styles'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Paper from '@mui/material/Paper'
import { addProductToCart } from '../../../store/actions/cart_actions'
import { useDispatch } from "react-redux"

const TopWeekProduct = ({ product }) => {
    const { _id, image_link, name, price, stock } = product
    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(addProductToCart(_id, null, stock))
    }

    return (
        <Product
            className="Product"
            elevation={4}
        >
            <ModalBaseSlide className="ModalBaseSlide">
                <ModalBaseSlideContent className="ModalBaseSlideContent">
                    <NameProduct >
                        {name}
                    </NameProduct>
                    <ShowMore href={`/productDetail/${_id}`}>
                        Show More...
                    </ShowMore>
                    <AddToCartContainer onClick={addToCart}>
                        <StyledAddShoppingCartIcon />
                        <AddToCartText>
                            Add To Cart
                        </AddToCartText>
                    </AddToCartContainer>
                </ModalBaseSlideContent>
            </ModalBaseSlide>
            <Price>
                {'$' + price.value}
            </Price>
            <ImgWrapper>
                <StyledImg src={image_link} alt="Can't load" />
            </ImgWrapper>
        </Product>
    )
}

export default TopWeekProduct

const modal_base_slide = '#00000078'

const Product = styled(Paper)({
    position: 'relative',
    height: '98%',
    width: '30%',
    cursor: 'pointer',
    '&:hover .ModalBaseSlide': {
        opacity: '1',
        background: modal_base_slide,
    },
    '&:hover .ModalBaseSlideContent': {
        opacity: '1',
    }
})

const ModalBaseSlide = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: modal_base_slide,
    opacity: '0',
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    transition: 'opacity 0.4s',
})

const ModalBaseSlideContent = styled('div')({
    width: 'fit-content',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})

const NameProduct = styled('div')({
    maxWidth: '100%',
    textAlign: 'center',
    marginBottom: '20px',
    color: 'white',
    fontFamily: '"Satisfy", "cursive"',
    fontSize: '2em',
    '&:hover': {
        cursor: 'text',
    }
})

const ShowMore = styled('a')({
    padding: '10px',
    border: '2px white solid',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: 'white',
    transition: 'transform 0.3s',
    textDecoration: 'unset',
    '&:hover': {
        transform: 'scale(1.1)',
    }
})

const AddToCartContainer = styled('div')({
    display: 'flex',
    height: '35px',
    marginTop: '20px',
    padding: '5px 10px',
    background: 'white',
    transition: 'transform 0.4s',
    '&:hover': {
        transform: 'scale(1.1)',
    }
})

const AddToCartText = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
    fontFamily: '"Oswald", "sans-serif"',
    fontSize: '1.5em',
    color: 'black',
    textAlign: 'center',
})

const StyledAddShoppingCartIcon = styled(AddShoppingCartIcon)({
    width: 'auto',
    height: '100%',
    fill: 'black',
})

const Price = styled('div')({
    fontSize: '1.5em',
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '10px',
    right: '20px',
    '&:hover': {
        cursor: 'text',
    }
})

const ImgWrapper = styled('div')({
    height: '100%',
})

const StyledImg = styled('img')({
    height: '100%',
    width: '100%',
    objectFit: 'cover',
})