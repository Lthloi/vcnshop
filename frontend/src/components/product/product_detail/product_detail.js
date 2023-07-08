import React, { createContext, useContext, useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { addProductToCart } from "../../../store/actions/cart_actions"
import Images from "./images"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Rating from '@mui/material/Rating'
import { CircularProgress, Stack, Tooltip } from "@mui/material"
import StraightenIcon from '@mui/icons-material/Straighten'

const OptionsContext = createContext()

const ColorsComponent = ({ onPickColor }) => {
    const [colorPicked, setColorPicked] = useState()
    const colors = useContext(OptionsContext).colors

    const pickColor = (color) => {
        setColorPicked(color)
        onPickColor('color', color)
    }

    return (
        <div>
            <SectionTitle>Color:</SectionTitle>
            <Colors>
                {
                    colors.length > 5 ?
                        <SelectOptions onClick={pickColor}>
                            <option value="none">
                                Please select one!
                            </option>
                            {
                                colors.map((color) => (
                                    <option
                                        value={color}
                                        key={color}
                                    >
                                        {color}
                                    </option>
                                ))
                            }
                        </SelectOptions>
                        :
                        colors.map((color) => (
                            <Tooltip
                                key={color}
                                title={color}
                            >
                                <ColorIndicator theme={{ picked: colorPicked === color, color }}>
                                    <Color
                                        theme={{ color }}
                                        onClick={() => pickColor(color)}
                                    />
                                </ColorIndicator>
                            </Tooltip>
                        ))
                }
            </Colors>
        </div>
    )
}

const SizesComponent = ({ onPickSize }) => {
    const sizes = useContext(OptionsContext).sizes

    const handlePickSize = (e) => {
        let size_name = e.target.value
        if (size_name === 'none') {
            e.target.value = ''
            onPickSize('size', null)
        } else {
            e.target.value = size_name
            onPickSize('size', size_name)
        }
    }

    return (
        <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <SectionTitle>Size:</SectionTitle>
                <FindYourSizeContainer>
                    <StraightenIcon />
                    <FindYourSize>
                        Find your size exactly.
                    </FindYourSize>
                </FindYourSizeContainer>
            </div>
            <SelectOptions onClick={handlePickSize}>
                <option value="none">
                    Please choose one!
                </option>
                {
                    sizes.map((size) => (
                        <option
                            value={size}
                            key={size}
                        >
                            {size}
                        </option>
                    ))
                }
            </SelectOptions>
        </div>
    )
}

const Options = ({ onSetOptions }) => {

    const handleSetOptions = (option_name, option_value) => {
        onSetOptions(option_name, option_value)
    }

    return (
        <OptionsArea id="Options">
            <ColorsComponent onPickColor={handleSetOptions} />
            <SizesComponent onPickSize={handleSetOptions} />
        </OptionsArea>
    )
}

const ProductDetail = ({ product }) => {
    const { loading } = useSelector(({ cart }) => cart)
    const dispatch = useDispatch()
    const options = useRef({ color: null, size: null })

    const addToCart = () => {
        let selections = options.current
        if (!selections.color || !selections.size)
            return toast.warn('Please select one color and one size')

        dispatch(addProductToCart(product._id, selections))
    }

    const handleSetOptions = (option_name, option_value) => {
        options.current = { ...options.current, [option_name]: option_value }
    }

    return (
        <ProductDetailContainer id="ProductDetailContainer">
            <Images images={product.images} image_link={product.image_link} />

            <DetailContainer>
                <ProductName>{product.name}</ProductName>

                <Stack columnGap={'10px'} flexDirection={'row'} alignItems={'center'}>
                    <Rating
                        name="half-review-read" readOnly
                        defaultValue={0} precision={0.5}
                        value={product.review.average_rating * 1}
                    />
                    <div>
                        <span>({product.review.count_reviews}</span>
                        <span>{(product.review.count_reviews) > 1 ? ' reviews' : ' review'})</span>
                    </div>
                    <Tooltip title="Add this product to wishlist">
                        <AddToWishList>
                            <FavoriteBorderIcon sx={{ width: '0.9em', height: '0.9em', fontSize: '1.1em' }} />
                            <AddToFavouriteText>
                                Add To Wishlist
                            </AddToFavouriteText>
                        </AddToWishList>
                    </Tooltip>
                </Stack>

                <InStock
                    title={product.stock > 0 ? `Left ${product.stock} products` : 'Out of stock'}
                    sx={{ backgroundColor: product.stock > 0 ? '#6ce26c' : '#ff6161' }}
                >
                    {product.stock > 0 ? 'In Stock: ' + product.stock : 'Out of stock'}
                </InStock>

                <OptionsContext.Provider
                    value={{
                        colors: product.options.colors,
                        sizes: product.options.sizes,
                    }}
                >
                    <Options onSetOptions={handleSetOptions} />
                </OptionsContext.Provider>

                <Tooltip title={`Price: ${product.price.value}USD`} placement="right">
                    <Price>
                        <span>$</span>
                        <span>
                            {product.price.value.toLocaleString('en', { useGrouping: true })}
                        </span>
                    </Price>
                </Tooltip>

                <Tooltip title="Add this product to your cart" placement="top">
                    <AddProductToCartContainer onClick={addToCart}>
                        {
                            loading ||false?
                                <CircularProgress
                                    thickness={6}
                                    size={20}
                                    sx={{ color: 'white', fontSize: '1.2em' }}
                                />
                                :
                                <>
                                    <AddShoppingCartIcon sx={{ color: 'white', fontSize: '1.2em' }} />
                                    <span>Add to cart</span>
                                </>
                        }
                    </AddProductToCartContainer>
                </Tooltip>

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
    margin: '10px 0',
    width: 'fit-content',
})

const AddProductToCartContainer = styled('button')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '10px',
    cursor: 'pointer',
    padding: '10px 20px',
    transition: 'background-color 0.2s',
    borderRadius: '20px',
    fontSize: '1em',
    backgroundColor: 'black',
    fontWeight: 'bold',
    color: 'white',
    '&:hover': {
        backgroundColor: 'pink',
        '& span , svg': {
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
    fontWeight: 'bold',
    fontSize: '1.5em',
})

const AddToWishList = styled('div')({
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

const InStock = styled('div')({
    fontSize: '0.9em',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '5px 15px',
    width: 'fit-content',
})

const OptionsArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '12px',
})

const SectionTitle = styled('h2')({
    fontSize: '1.1em',
    margin: '0',
    fontWeight: 'bold',
})

const Colors = styled('div')({
    display: 'flex',
    columnGap: '15px',
    marginTop: '8px',
})

const ColorIndicator = styled('div')(({ theme }) => ({
    borderRadius: '50%',
    padding: '2px',
    ...(theme.picked ? { outline: `2px ${theme.color.toLowerCase() !== 'white' ? theme.color : 'gray'} solid` } : {}),
}))

const Color = styled('div')(({ theme }) => ({
    backgroundColor: theme.color,
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    boxShadow: '0px 0px 3px gray',
    cursor: 'pointer',
}))

const SelectOptions = styled('select')({
    marginTop: '5px',
    padding: '5px',
    fontSize: '1em',
    border: '2px gray solid',
    width: '100%',
})

const FindYourSizeContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    width: 'fit-content',
})

const FindYourSize = styled('div')({
    fontSize: '0.9em',
    color: 'red',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})