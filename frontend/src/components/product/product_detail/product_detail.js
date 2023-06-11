import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { addProductToCart } from "../../../store/actions/cart_actions"
import Options from "./options"
import Images from "./images"
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StorefrontIcon from '@mui/icons-material/Storefront'
import Rating from '@mui/material/Rating'

const ProductDetail = ({ product }) => {
    const dispatch = useDispatch()
    const [choices, setChoices] = useState({ color: undefined, size: undefined })

    const addToCart = () => {
        if (!choices.color || !choices.size)
            return toast.warn('Please choose both color and size!')

        dispatch(addProductToCart(product._id, choices))
    }

    const choicesSetting = (choice_name, choice_value) => {
        setChoices(pre => ({ ...pre, [choice_name]: choice_value }))
    }

    return (
        <ProductDetailContainer id="ProductDetailContainer">
            <Images images={product.images} image_link={product.image_link} />

            <DetailContainer>
                <ProductName>{product.name}</ProductName>

                <Reviews>
                    <Rating
                        name="half-review-read" readOnly
                        defaultValue={0} precision={0.5}
                        value={product.review.average_rating * 1}
                    />
                    <ReviewCount title="View reviews">
                        <span>{(product.review.count_review)}</span>
                        <span>{(product.review.count_review) > 1 ? ' reviews' : ' review'}</span>
                    </ReviewCount>
                    <AddToFavourite title="Add this product to Favourite List">
                        <FavoriteBorderIcon sx={{ width: '0.9em', height: '0.9em', fontSize: '1.1em' }} />
                        <AddToFavouriteText>
                            Add To Wishlist
                        </AddToFavouriteText>
                    </AddToFavourite>
                </Reviews>

                <Shop>
                    <StorefrontIcon />
                    <ShopName className="ShopName" title="Visit this shop">
                        {'Shop: ' + product.shop.name}
                    </ShopName>
                    <InStock
                        title={product.stock > 0 ? `Left ${product.stock} products` : 'Out of stock'}
                        sx={{ backgroundColor: product.stock > 0 ? '#6ce26c' : '#ff6161' }}
                    >
                        {product.stock > 0 ? 'In Stock [' + product.stock + ']' : 'Out of stock'}
                    </InStock>
                </Shop>

                <Options //options
                    colors={product.options.color}
                    sizes={product.options.size}
                    choicesSetting={choicesSetting}
                />

                <Price title={`Cost ${product.price.value}`}>
                    <span>$</span>
                    <span>
                        {product.price.value.toLocaleString('en', { useGrouping: true })}
                    </span>
                </Price>

                <AddProductToCartContainer
                    title="Add this product to cart"
                    onClick={addToCart}
                >
                    <AddShoppingCartIcon
                        className="AddToCartIcon"
                        sx={{ color: 'white' }}
                    />
                    <span>Add to cart</span>
                </AddProductToCartContainer>

                <AddCoupons>
                    <ConfirmationNumberIcon />
                    <span>Collect Coupons</span>
                </AddCoupons>
            </DetailContainer>
        </ProductDetailContainer>
    )
}

export default ProductDetail

const ProductDetailContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    columnGap: '30px',
    justifyContent: 'space-between',
    marginTop: '15px',
    fontFamily: theme.fontFamily.nunito,
}))

const DetailContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    width: '70%',
    boxSizing: 'border-box',
    padding: '20px 0',
})

const Price = styled('div')({
    display: 'flex',
    columnGap: '3px',
    fontSize: '1.8em',
    fontWeight: 'bold',
})

const AddProductToCartContainer = styled('button')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '10px',
    cursor: 'pointer',
    padding: '5px 20px',
    transition: 'background-color 0.2s',
    borderRadius: '20px',
    backgroundColor: 'black',
    '& span': {
        fontSize: '1.1em',
        fontWeight: 'bold',
        color: 'white',
    },
    '&:hover': {
        backgroundColor: 'pink',
        '& span , .AddToCartIcon': {
            color: 'black',
        }
    }
})

const AddCoupons = styled('button')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    columnGap: '8px',
    fontSize: '0.9em',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: 'bisque',
    border: '1px black solid',
    borderRadius: '3px',
    '&:hover': {
        backgroundColor: '#ffeedb',
    },
    '&:active': {
        backgroundColor: '#ffdeb7',
    }
})

const ProductName = styled('div')({
    fontFamily: '"Work Sans", sans-serif',
    fontWeight: 'bold',
    fontSize: '1.5em',
})

const Reviews = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
})

const ReviewCount = styled('div')({
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const AddToFavourite = styled('div')({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    transition: 'background-color 0.2s',
    padding: '3px 5px',
    cursor: 'pointer',
    marginLeft: '10px',
    columnGap: '3px',
    border: '1px black solid',
    '&:hover': {
        backgroundColor: '#fedddd',
    }
})

const AddToFavouriteText = styled('div')({
    fontSize: '0.9em',
})

const Shop = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    width: 'fit-content',
})

const ShopName = styled('div')({
    fontFamily: '"Finlandica","sans-serif"',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    },
})

const InStock = styled('div')({
    fontFamily: '"Finlandica","sans-serif"',
    fontSize: '0.9em',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '3px 10px',
    marginLeft: '10px',
})