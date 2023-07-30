import React, { useEffect, useMemo } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import Skeleton from '@mui/material/Skeleton'
import { getProducts } from "../../store/actions/product_actions"
import { Grid } from "@mui/material"
import { LIMIT_GET_PRODUCTS_DEFAULT } from "../../utils/constants"
import { useParams } from "react-router-dom"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Rating, Stack, Typography, Box } from "@mui/material"
import { addProductToCart } from "../../store/actions/cart_actions"
import { NavLink } from "react-router-dom"
import { useTheme } from "@emotion/react"
import ProgressiveImage from "../materials/progressive_image"

const Loading = () => (
    <Grid
        container
        columns={{ xs: 12 }}
        columnSpacing={{ xs: 1.5 }}
        rowSpacing={{ xs: 2 }}
    >
        {
            [1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                <Grid
                    item
                    key={value}
                    xs={3}
                >
                    <Skeleton
                        animation="wave"
                        sx={{
                            width: '100%',
                            height: '300px',
                            transform: 'scale(1)',
                        }}
                    />
                </Grid>
            ))
        }
    </Grid>
)

const Empty = () => (
    <Stack
        justifyContent="center"
        alignItems="center"
        rowGap="15px"
        width="100%"
        bgcolor="#f5f5f5"
        padding="20px"
        boxSizing="border-box"
        border="5px #dddddd solid"
        margin="16px 15px"
    >
        <HeartBrokenIcon sx={{ fontSize: '3.8em' }} />
        <Typography margin="0" component="p" fontSize="1.2em" fontWeight="bold">
            Oops!! No Result For Your Search...
        </Typography>
    </Stack>
)

const icon_option_bar_style = {
    height: '0.8em',
    width: '0.8em',
    fill: 'white',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.2)',
    }
}

const ProductAvatar = ({ productId, imageLink }) => {
    const dispatch = useDispatch()

    const iconAction = (type) => {
        if (type === 'Wishlist') {

        }
        if (type === 'Cart') {
            dispatch(addProductToCart(productId))
        }
        if (type === 'Hidden') {

        }
    }

    return (
        <ProductImageContainer>

            <Box
                to={`/productDetail/${productId}`}
                component={NavLink}
                display="flex"
                width="100%"
                height="100%"
                color="black"
                sx={{ textDecoration: 'none' }}
            >
                <ProgressiveImage
                    src={imageLink}
                    alt="Product"
                    css={{ maxHeight: '100%', maxWidth: '100%', margin: 'auto' }}
                />
            </Box>

            <Stack
                className="OptionBar"
                justifyContent="space-between"
                flexDirection="row"
                width="100%"
                boxSizing="border-box"
                padding="5px 20px"
                bgcolor="#00000061"
                position="absolute"
                bottom="-30%"
                left="0"
                sx={{ transition: 'bottom 0.3s' }}
            >
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
            </Stack>

        </ProductImageContainer>
    )
}

const get_average_rating = (average_rating) => average_rating.toLocaleString('en', { useGrouping: true })

const ProductInfo = ({ productName, productId, price, averageRating, countReviews, soldCount }) => {
    const theme = useTheme()

    return (
        <Stack padding="0 5px">
            <Name to={`/productDetail/${productId}`}>
                {productName}
            </Name>
            <Stack flexDirection="row" columnGap="5px">
                <Rating
                    precision={0.5}
                    readOnly
                    value={averageRating}
                    size="small"
                    sx={{ color: '#ff2222' }}
                />
                <Typography fontSize="0.9em">
                    {get_average_rating(averageRating)}
                </Typography>
                <Typography fontSize="0.9em">
                    ({countReviews})
                </Typography>
            </Stack>
            <Typography color="gray" fontWeight="bold" fontSize="0.9em">
                {'Sold: ' + soldCount}
            </Typography>
            <Typography
                fontFamily={theme.fontFamily.kanit}
                fontSize="0.9em"
                marginTop="5px"
                paddingLeft="5px"
                bgcolor="white"
                borderRadius="5px"
            >
                {'$' + price}
            </Typography>
        </Stack>
    )
}

const Product = ({ productInfo }) => {
    const { _id, image_link, name, review, sold, price } = productInfo

    return (
        <ProductSection id="Product-Search">

            <ProductAvatar productId={_id} imageLink={image_link} />

            <ProductInfo
                price={price.value}
                soldCount={sold.count}
                averageRating={review.average_rating}
                countReviews={review.count_reviews}
                productName={name}
                productId={_id}
            />

        </ProductSection>
    )
}

const Products = ({ products }) => {

    const sliced_products = useMemo(() => {
        return products
    }, [])

    return (
        <Grid
            container
            columns={{ xs: 12 }}
            columnSpacing={{ xs: 1.5 }}
            rowSpacing={{ xs: 2 }}
        >
            {
                sliced_products.map((product) => (
                    <Grid
                        key={product._id}
                        item
                        xs={3}
                    >
                        <Product productInfo={product} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

const Result = () => {
    const { products, loading, error } = useSelector(({ product }) => product)
    const dispatch = useDispatch()
    const { keyword } = useParams()

    useEffect(() => {
        dispatch(getProducts(LIMIT_GET_PRODUCTS_DEFAULT, undefined, keyword))
    }, [dispatch])

    return (
        <Stack width="100%">
            {
                loading ? (
                    <Loading />
                ) : error ? (
                    <Typography
                        fontSize="1.2em"
                        color="red"
                        width="100%"
                        textAlign="center"
                    >
                        {error.message}
                    </Typography>
                ) : products && products.length > 0 ?
                    <Products products={products} />
                    :
                    <Empty />
            }
        </Stack>
    )
}

export default Result

const ProductSection = styled('div')(({ theme }) => ({
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

const Name = styled(NavLink)({
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