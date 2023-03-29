import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { addProductToCart } from "../../../store/actions/cart_actions"
import Options from "./options"
import Images from "./images"
import TopDetail from "./top_detail"
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'

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

                <TopDetail product={product} />

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
    columnGap: '20px',
    justifyContent: 'space-between',
    marginTop: '15px',
}))

const DetailContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    width: '39%',
    boxSizing: 'border-box',
    padding: '20px 0',
})

const Price = styled('div')({
    display: 'flex',
    columnGap: '3px',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.8em',
    fontWeight: 'bold',
})

const AddProductToCartContainer = styled('button')({
    fontFamily: '"Nunito", "sans-serif"',
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
    fontFamily: '"Nunito", "sans-serif"',
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