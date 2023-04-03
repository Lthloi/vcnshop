import React, { useEffect } from "react"
import { styled } from '@mui/material/styles'
import ProductDetail from "../components/product/product_details/product_details"
import ScrollToTopBtn from '../components/scroll_top_top_btn'
import ProductReview from "../components/product/product_review/product_review"
import HelpChat from '../components/help_chat'
import InfoIcon from '@mui/icons-material/Info'
import Details from '../components/product/product_details/details'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProductDetail } from '../store/actions/product_actions'
import Skeleton from '@mui/material/Skeleton'

const loading_widths = ['82%', '75%', '60%', '45%', '50%']

const Product = () => {
    const { product, loading, error } = useSelector(({ productDetail }) => productDetail)
    const dispatch = useDispatch()
    const { productId } = useParams()

    useEffect(() => {
        dispatch(getProductDetail(productId))
    }, [dispatch])

    return (
        <ProductDetailArea id="ProductDetailArea">
            <PageTitle>
                <InfoIcon sx={{ height: '1.8em', width: '1.8em', }} />
                <Text>
                    Product Detail
                </Text>
            </PageTitle>

            <Hr />

            {loading ? (
                <LoadingContainer>
                    <ProductSkeleton />
                    <Detail>
                        {loading_widths.map((width) => (
                            <DetailSkeleton
                                key={width}
                                style={{ width }}
                                animation="pulse"
                                variant="rectangular"
                            />
                        ))}
                    </Detail>
                </LoadingContainer>
            ) : error ? (
                <Error>
                    {error.message}
                </Error>
            ) :
                <>
                    {product && product._id && <ProductDetail product={product} />}

                    <ReviewsAndDetails>
                        {
                            product && product._id &&
                            <>
                                <ProductReview productId={product._id} productReview={product.review} />
                                <Details productDescription={product.description} shopUsername={product.shop.username} />
                            </>
                        }
                    </ReviewsAndDetails>

                    <ScrollToTopBtn />
                    <HelpChat />
                </>
            }
        </ProductDetailArea>
    )
}

export default Product

const ProductDetailArea = styled('div')(({ theme }) => ({
    padding: '0 30px',
    marginTop: '20px',
}))

const PageTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    marginLeft: '20px',
    transform: 'scaleY(0.9)',
})

const Text = styled('h2')({
    fontSize: '2em',
    fontFamily: '"Kanit", "sans-serif"',
    margin: '0',
})

const Hr = styled('div')({
    height: '5px',
    backgroundColor: 'black',
})

const LoadingContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '20px',
    width: '100%',
    height: '99vh',
    marginTop: '10px',
})

const ProductSkeleton = styled(Skeleton)({
    width: '60%',
    height: '100%',
    transform: 'unset',
})

const Detail = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '30px',
    width: '37%',
})

const DetailSkeleton = styled(Skeleton)({
    height: '30px',
})

const Error = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.2em',
    color: 'red',
    margin: 'auto',
    width: '100%',
    height: '25vh',
})

const ReviewsAndDetails = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '20px',
    marginTop: '35px',
})