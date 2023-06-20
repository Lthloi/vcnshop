import React, { useEffect, useRef } from "react"
import { styled } from '@mui/material/styles'
import ProductDetail from "../components/product/product_detail/product_detail"
import ScrollToTopBtn from '../components/scroll_top_top_btn'
import ProductReview from "../components/product/product_review/product_review"
import InfoIcon from '@mui/icons-material/Info'
import Introduction from '../components/product/product_detail/introduction'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProductDetail } from '../store/actions/product_actions'
import Skeleton from '@mui/material/Skeleton'
import CommentIcon from '@mui/icons-material/Comment'
import Reviews from "../components/product/product_review/reviews"

const loading_widths = ['82%', '75%', '60%', '45%', '50%']

const Product = () => {
    const { product, loading, error } = useSelector(({ product }) => product.productDetail)
    const dispatch = useDispatch()
    const { productId } = useParams()
    const switch_review_page_ref = useRef()

    useEffect(() => {
        dispatch(getProductDetail(productId))
    }, [dispatch])

    return (
        <ProductDetailPage id="ProductDetailPage">
            <PageTitle>
                <InfoIcon sx={{ height: '1.8em', width: '1.8em', }} />
                <Text>
                    Product Detail
                </Text>
            </PageTitle>

            <Hr />

            {
                loading ? (
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

                        <ReviewsAndIntroduction>
                            {
                                product && product._id &&
                                <>
                                    <ProductReviewSection>
                                        <ProductReview productId={product._id} productReview={product.review} />
                                        <ReviewsSection id="Reviews" ref={switch_review_page_ref}>
                                            <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                                                <CommentIcon />
                                                <ReviewsTitle>Reviews</ReviewsTitle>
                                            </div>

                                            <Hr />

                                            <Reviews
                                                productId={productId}
                                                srollReviewRef={switch_review_page_ref}
                                            />
                                        </ReviewsSection>
                                    </ProductReviewSection>
                                    <Introduction
                                        productDescription={product.description}
                                        shopId={product.shop.id}
                                    />
                                </>
                            }
                        </ReviewsAndIntroduction>
                    </>
            }

            <ScrollToTopBtn />
        </ProductDetailPage>
    )
}

export default Product

const ProductDetailPage = styled('div')(({ theme }) => ({
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
    height: '2px',
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

const ReviewsAndIntroduction = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '20px',
    marginTop: '35px',
    fontFamily: theme.fontFamily.nunito,
}))

const ProductReviewSection = styled('div')(({ theme }) => ({
    width: '56%',
}))

const ReviewsSection = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
})

const ReviewsTitle = styled('h2')({
    margin: '0',
    fontSize: '1.5em',
    transform: 'scaleY(0.9)',
})