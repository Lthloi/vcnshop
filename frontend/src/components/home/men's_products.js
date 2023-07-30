import React, { useEffect, useMemo, useState } from "react"
import { styled } from '@mui/material/styles'
import { Stack, Box, Typography, Tabs, Tab, Skeleton } from "@mui/material"
import men_banner from '../../assets/images/men_banner.jpg'
import { useTheme } from "@emotion/react"
import { useDispatch, useSelector } from "react-redux"
import { getMenSProducts } from "../../store/actions/product_actions"
import ProgressiveImage from "../materials/progressive_image"
import { addProductToCart } from "../../store/actions/cart_actions"
import { NavLink } from "react-router-dom"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const categories = ['Shirt', 'Pant']

const MenBanner = () => {
    const theme = useTheme()

    return (
        <Box
            fontFamily={theme.fontFamily.kanit}
            height="500px"
            minWidth="250px"
            sx={{
                backgroundImage: `url(${men_banner})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Stack
                padding="30px"
                height="100%"
                boxSizing="border-box"
                alignItems="center"
                justifyContent="center"
                bgcolor="rgba(0,0,0,.1)"
            >
                <Typography
                    fontFamily="inherit"
                    color="white"
                    fontSize="3em"
                >
                    Men's
                </Typography>
                <Typography
                    fontFamily='inherit'
                    color="white"
                    fontSize="1em"
                    paddingBottom="5px"
                    borderBottom="3px white solid"
                    sx={{ cursor: 'pointer' }}
                >
                    Discover More
                </Typography>
            </Stack>
        </Box>
    )
}

const ProductAvatar = ({ productId, imageLink }) => {
    const dispatch = useDispatch()

    const handleAddProductToCart = () => {
        dispatch(addProductToCart(productId))
    }

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            position="relative"
            cursor="pointer"
            overflow="hidden"
            height="250px"
            width="100%"
            border="1px rgba(0,0,0,.05) solid"
            boxSizing="border-box"
        >

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

            <AddProductToCartBtn
                onClick={handleAddProductToCart}
                className="AddToCartBtn"
            >
                Add To Cart
            </AddProductToCartBtn>

        </Stack>
    )
}

const ProductInfo = ({ productName, productId, price }) => {
    const theme = useTheme()

    return (
        <Box
            padding="0 5px"
        >
            <Name to={`/productDetail/${productId}`}>
                {productName}
            </Name>

            <Typography
                fontFamily={theme.fontFamily.kanit}
                fontSize="0.9em"
                marginTop="5px"
                paddingLeft="5px"
                bgcolor="white"
                borderRadius="5px"
                textAlign="center"
            >
                {'$' + price}
            </Typography>
        </Box>
    )
}

const Product = ({ productInfo }) => {
    const { image_link, name, price, _id } = productInfo

    return (
        <ProductSection className="Product">

            <ProductAvatar productId={_id} imageLink={image_link} />

            <ProductInfo
                price={price.value}
                productName={name}
                productId={_id}
            />

        </ProductSection>
    )
}

const slide_icon_style = {
    color: 'gray',
    fontSize: '1.5em',
    margin: 'auto',
}

const switch_slide_btn_style = {
    display: 'flex',
    position: "absolute",
    top: "50%",
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,.05)',
    }
}

const Slider = ({ products }) => {
    const [slideIndex, setSlideIndex] = useState(0)

    const switchSlide = (direction) => {
        if (direction === 'left') {
            setSlideIndex(pre => pre > 0 ? pre - 1 : 2)
        } else {
            setSlideIndex(pre => pre < 2 ? pre + 1 : 0)
        }
    }

    const get_translate_x = () => {
        if (products.length < 4) return `translateX(0)`

        return `translateX(calc(-${slideIndex * 100}% - ${slideIndex * 30}px))`
    }

    return (
        <Stack
            position="relative"
            width="100%"
            alignItems="center"
        >
            <Box
                component="div"
                onClick={() => switchSlide('left')}
                sx={{ ...switch_slide_btn_style, left: '-30px' }}
            >
                <ArrowForwardIosIcon sx={{ transform: 'rotate(180deg)', ...slide_icon_style }} />
            </Box>

            <Box
                marginTop="40px"
                width="735px"
                overflow="hidden"
            >
                <Stack
                    flexDirection="row"
                    columnGap="30px"
                    sx={{
                        transform: get_translate_x(),
                        transition: 'transform 0.8s',
                    }}
                >
                    {
                        products.map((product) => (
                            <Product productInfo={product} key={product._id} />
                        ))
                    }
                </Stack>
            </Box>

            <Box
                component="div"
                onClick={() => switchSlide('right')}
                sx={{ ...switch_slide_btn_style, right: '-30px' }}
            >
                <ArrowForwardIosIcon sx={slide_icon_style} />
            </Box>
        </Stack>
    )
}

const max_number_of_products = 9

const filter_products_by_category = (category_to_filter, products) => {
    return products
        .filter(({ category }) => category === category_to_filter)
        .slice(0, max_number_of_products)
}

const loading_style = {
    transform: 'scale(1)',
    height: '100%',
    width: '100%',
}

const Products = () => {
    const { products, loading, error } = useSelector(({ product }) => product.menS)
    const [tab, setTab] = useState(categories[0])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMenSProducts(
            categories.length * max_number_of_products,
            1,
            { name: 'sold.count', type: -1 }
        ))
    }, [dispatch])

    const main_products = useMemo(() => {
        if (products && products.length > 0) {
            return filter_products_by_category(tab, products)
        }

        return null
    }, [products, tab])

    const selectTab = (e, new_tab) => {
        if (new_tab === tab) return

        setTab(new_tab)
    }

    return (
        <Stack
            width="100%"
            alignItems="center"
        >

            <Box
                color="black"
                width="fit-content"
            >
                <StyledTabs
                    value={tab}
                    onChange={selectTab}
                    textColor="inherit"
                >
                    {
                        categories.map((category) => (
                            <StyledTab
                                key={category}
                                value={category}
                                label={category}
                            />
                        ))
                    }
                </StyledTabs>
            </Box>

            {
                loading ? (
                    <Stack
                        flexDirection="row"
                        columnGap="30px"
                        width="100%"
                        marginTop="40px"
                        justifyContent="space-between"
                        height="333px"
                    >
                        <Skeleton sx={loading_style} />
                        <Skeleton sx={loading_style} />
                        <Skeleton sx={loading_style} />
                    </Stack>
                ) : error ? (
                    <Typography>
                        {error.message}
                    </Typography>
                ) :
                    main_products && main_products.length > 0 &&
                    <Slider products={main_products} />
            }

        </Stack>
    )
}

const MenSProducts = () => {

    return (
        <Stack
            component="div"
            id="Men's-Banner"
            flexDirection="row"
            alignItems="center"
            padding="20px 60px"
            justifyContent="space-between"
            marginTop="50px"
            columnGap="100px"
        >

            <Products />

            <MenBanner />

        </Stack>
    )
}

export default MenSProducts

const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: 'black',
    }
})

const StyledTab = styled(Tab)({
    padding: '0',
    fontSize: '1.1em',
    textTransform: 'none',
})

const ProductSection = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.nunito,
    boxSizing: 'border-box',
    minWidth: '225px',
    maxWidth: '225px',
    padding: '10px 0',
    '&:hover .AddToCartBtn': {
        bottom: '10px',
    }
}))

const AddProductToCartBtn = styled('button')(({ theme }) => ({
    fontFamily: theme.fontFamily.kanit,
    borderRadius: '15px',
    fontSize: '0.9em',
    justifyContent: "space-between",
    flexDirection: "row",
    width: "max-content",
    boxSizing: "border-box",
    padding: "5px 20px",
    backgroundColor: "white",
    position: "absolute",
    bottom: "-30%",
    left: "50%",
    transform: 'translateX(-50%)',
    transition: 'bottom 0.3s',
    border: '1.5px black solid',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white',
    }
}))

const Name = styled(NavLink)({
    display: 'block',
    textDecoration: 'unset',
    color: 'black',
    width: '100%',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '15px',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    '&:hover': {
        textDecoration: 'underline',
    }
})