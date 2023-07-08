import React from "react"
import { styled } from '@mui/material/styles'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Rating } from "@mui/material"
import { useDispatch } from "react-redux"
import { addProductToCart } from "../../store/actions/cart_actions"

const icon_option_bar_style = {
    height: '0.8em',
    width: '0.8em',
    fill: 'white',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.2)',
    }
}

const ProductCard = ({ product }) => {
    const { _id, image_link, name, review, sold, price } = product
    const dispatch = useDispatch()

    const iconAction = (type) => {
        if (type === 'Wishlist') {

        }
        if (type === 'Cart') {
            dispatch(addProductToCart(_id))
        }
        if (type === 'Hidden') {

        }
    }

    return (
        <ProductSearchCard id="ProductSearchCardArea">
            <ProductImageContainer>
                <ProductImageImgWrapper href={`/productDetail/${_id}`}>
                    <ProductImage src={image_link} alt="Can't load" />
                </ProductImageImgWrapper>
                <OptionBar className="OptionBar">
                    <FavoriteBorderIcon
                        titleAccess="Add To Wishlist"
                        sx={icon_option_bar_style}
                        onClick={() => iconAction('Wishlist')}
                    />
                    <AddShoppingCartIcon
                        titleAccess="Add To Cart"
                        sx={icon_option_bar_style}
                        onClick={() => iconAction('Cart')}
                    />
                    <ErrorOutlineIcon
                        titleAccess="Hidden"
                        sx={icon_option_bar_style}
                        onClick={() => iconAction('Hidden')}
                    />
                </OptionBar>
            </ProductImageContainer>

            <ProductInfo>
                <Name title={name} href={`/productDetail/${_id}`}>
                    {name}
                </Name>
                <RatingContainer>
                    <Rating
                        name="half-rating-read" defaultValue={0}
                        precision={0.2} readOnly value={review.average_rating}
                        size="small" sx={{ color: '#ff2222', }}
                    />
                    <Count>
                        {review.average_rating > 0.2 ? review.average_rating : 0}
                    </Count>
                    <Count>
                        ({review.count_reviews.toLocaleString('en', { useGrouping: true })})
                    </Count>
                </RatingContainer>
                <SoldCount>
                    {'Sold: ' + sold.count}
                </SoldCount>
                <Price>
                    {'$' + price.value}
                </Price>
            </ProductInfo>
        </ProductSearchCard>
    )
}

export default ProductCard

const ProductSearchCard = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.nunito,
    boxSizing: 'border-box',
    padding: '3px',
    paddingBottom: '6px',
    width: '100%',
    boxShadow: '0px 0px 1px gray',
    borderBottom: '2px black solid',
    '&:hover': {
        boxShadow: '0px 0px 8px gray',
    }
}))

const ProductImageContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    border: '1px #dedede solid',
    overflow: 'hidden',
    height: '200px',
    '&:hover .OptionBar': {
        bottom: '0',
    },
})

const ProductImageImgWrapper = styled('a')({
    display: 'flex',
    width: '100%',
    height: '100%',
    textDecoration: 'unset',
    color: 'black',
})

const ProductImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
})

const OptionBar = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
    padding: '4px 20px',
    backgroundColor: '#00000061',
    position: 'absolute',
    bottom: '-30%',
    left: '0',
    transition: 'bottom 0.3s',
})

const ProductInfo = styled('div')({
    paddingLeft: '5px',
    paddingRight: '5px',
})

const Name = styled('a')({
    display: 'block',
    textDecoration: 'unset',
    color: 'black',
    width: 'fit-content',
    maxWidth: '100%',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '10px',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const RatingContainer = styled('div')({
    display: 'flex',
    columnGap: '5px',
})

const Count = styled('div')({
    fontSize: '0.9rem',
})

const SoldCount = styled('div')({
    fontFamily: 'cursive',
    color: 'grey',
    fontSize: '0.9em',
    fontWeight: 'bold',
})

const Price = styled('div')(({ theme }) => ({
    fontSize: '0.9rem',
    marginTop: '5px',
    paddingLeft: '5px',
    backgroundColor: 'white',
    borderRadius: '5px',
}))