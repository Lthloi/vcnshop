import React, { startTransition, useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import { Stack, Box, Typography, Tabs, Tab, Skeleton, Grid, Rating, Tooltip } from "@mui/material"
import { getProductsOverview } from "../../store/actions/product_actions"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "@emotion/react"
import { NavLink } from "react-router-dom"
import ProgressiveImage from '../materials/progressive_image'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useTranslation } from "react-i18next"

const Product = ({ productInfo }) => {
    const { _id, image_link, name, price, review, category } = productInfo
    const theme = useTheme()

    return (
        <ProductSection
            className={`Product_${category}`}
        >
            <Box
                overflow="hidden"
            >
                <ProductAvatarWrapper
                    to={`/productDetail/${_id}`}
                >
                    <ProgressiveImage
                        src={image_link}
                        alt="Product"
                        scss={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                            margin: 'auto',
                        }}
                    />
                </ProductAvatarWrapper>
            </Box>

            <Box
                padding="0 5px"
            >

                <Tooltip
                    title={name}
                >
                    <Name to={`/productDetail/${_id}`}>
                        {name}
                    </Name>
                </Tooltip>

                <Rating
                    defaultValue={0}
                    precision={0.5}
                    readOnly
                    value={review.average_rating}
                    size="small"
                />

                <Typography
                    fontFamily={theme.fontFamily.kanit}
                    fontSize="0.9em"
                    marginTop="5px"
                    paddingLeft="5px"
                    bgcolor="white"
                    borderRadius="5px"
                >
                    {'$' + price.value}
                </Typography>

            </Box>
        </ProductSection>
    )
}

const Products = ({ products }) => {
    return (
        <Box
            marginTop="50px"
            paddingLeft="33px"
        >
            <Grid
                container
                rowSpacing={{ xs: 2 }}
                columnSpacing={{ xs: 2 }}
                columns={{ xs: 12 }}
            >
                {
                    products.map((product) => (
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
        </Box >
    )
}

const style_for_loading = {
    transform: 'scale(1)',
    height: '350px',
    width: '100%',
}

const Loading = () => {
    return (
        <Stack
            marginTop="60px"
            rowGap="20px"
            padding="0 32px"
        >
            <Stack
                flexDirection="row"
                columnGap="20px"
            >
                <Skeleton sx={style_for_loading} />
                <Skeleton sx={style_for_loading} />
                <Skeleton sx={style_for_loading} />
                <Skeleton sx={style_for_loading} />
            </Stack>

            <Stack
                flexDirection="row"
                columnGap="20px"
            >
                <Skeleton sx={style_for_loading} />
                <Skeleton sx={style_for_loading} />
                <Skeleton sx={style_for_loading} />
                <Skeleton sx={style_for_loading} />
            </Stack>
        </Stack>
    )
}

const MoreBtn = () => {
    const { t } = useTranslation('home_page')

    return (
        <Box
            display="flex"
            width="100%"
            marginTop="50px"
        >
            <ViewMoreBtn>
                {t('VIEW MORE')}
            </ViewMoreBtn>
        </Box>
    )
}

const categories = [
    'Shirt',
    'Pant',
]

const max_number_of_products = 16

const filterProducts = (products, category_to_filter) => {
    return products
        .filter(({ category }) => category === category_to_filter)
        .slice(0, max_number_of_products)
}

const Overview = () => {
    const { products, loading, error } = useSelector(({ product }) => product.overview)
    const [tab, setTab] = useState(categories[0])
    const [mainProducts, setMainProducts] = useState(null)
    const dispatch = useDispatch()
    const { t } = useTranslation('home_page')

    useEffect(() => {
        dispatch(getProductsOverview(
            categories.length * max_number_of_products,
            ['Shirt', 'Pant'],
            1,
            { name: 'sold.count', type: -1 }
        ))
    }, [dispatch])

    useEffect(() => {
        if (products && products.length > 0) {
            startTransition(() => {
                setMainProducts(filterProducts(products, tab))
            })
        }
    }, [products, tab])

    const switchCategory = (e, new_tab) => {
        setTab(new_tab)
    }


    return (
        <Box
            component="div"
            id="Overview-Home"
            padding="0 60px"
            marginTop="20px"
        >

            <Stack
                color="black"
                flexDirection="row"
                alignItems="center"
                columnGap="15px"
            >
                <FilterListIcon sx={{ color: 'black' }} />

                <StyledTabs
                    value={tab}
                    onChange={switchCategory}
                    textColor="inherit"
                >
                    {
                        categories.map((category) => (
                            <StyledTab
                                key={category}
                                value={category}
                                label={t(category)}
                            />
                        ))
                    }
                </StyledTabs>
            </Stack>

            {
                loading ? (
                    <Loading />
                ) : error ? (
                    <Typography
                        color="red"
                        padding="30px"
                        boxSizing="border-box"
                        width="100%"
                        textAlign="center"
                    >
                        {error.message}
                    </Typography>
                ) :
                    mainProducts && mainProducts.length > 0 &&
                    <Products products={mainProducts} />
            }

            <MoreBtn />

        </Box>
    )
}

export default Overview

const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: 'black',
    }
})

const StyledTab = styled(Tab)(({ theme }) => ({
    padding: '0',
    fontSize: '1.1em',
    textTransform: 'none',
    fontFamily: theme.fontFamily.kanit,
}))

const Name = styled(NavLink)(({ theme }) => ({
    display: 'block',
    textDecoration: 'unset',
    color: 'black',
    width: '100%',
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: '15px 0 10px',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: theme.fontFamily.nunito,
    '&:hover': {
        textDecoration: 'underline',
    }
}))

const ProductAvatarWrapper = styled(NavLink)({
    display: "flex",
    width: "100%",
    height: "250px",
    color: "black",
    textDecoration: 'none',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.1)',
    }
})

const ViewMoreBtn = styled('button')(({ theme }) => ({
    borderRadius: "15px",
    backgroundColor: "rgba(0,0,0,.1)",
    border: 'none',
    margin: "auto",
    padding: "10px 50px",
    cursor: 'pointer',
    fontFamily: theme.fontFamily.kanit,
    fontSize: '1em',
    transition: 'background-color 0.2s, color 0.2s',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white',
    }
}))

const ProductSection = styled('div')({
    boxSizing: 'border-box',
    minWidth: '225px',
    maxWidth: '225px',
    padding: '10px 0',
})