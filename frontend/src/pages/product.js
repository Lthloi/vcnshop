import React, { useEffect, useRef } from "react"
import { styled } from '@mui/material/styles'
import ProductDetail from "../components/product/product_detail/product_detail"
import ScrollToTopBtn from '../components/scroll_top_top_btn'
import MakeReview from "../components/product/product_review/make_review"
import InfoIcon from '@mui/icons-material/Info'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProductDetail } from '../store/actions/product_actions'
import Skeleton from '@mui/material/Skeleton'
import CommentIcon from '@mui/icons-material/Comment'
import Reviews from "../components/product/product_review/reviews"
import StorefrontIcon from '@mui/icons-material/Storefront'

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
                ) : product &&
                <>
                    <ProductDetail product={product} />

                    <ReviewsAndIntroduction>
                        <div style={{ width: '100%' }}>
                            <MakeReview productId={product._id} productReview={product.review} />
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
                        </div>

                        <DetailsContainer>
                            <Title>Description</Title>
                            <Description>
                                {product.description}
                            </Description>

                            <VistShopButton>
                                <StorefrontIcon />
                                <span>Vist Shop</span>
                            </VistShopButton>
                        </DetailsContainer>
                    </ReviewsAndIntroduction>
                </>
            }

            <ScrollToTopBtn />
        </ProductDetailPage >
    )
}

export default Product

const ProductDetailPage = styled('div')(({ theme }) => ({
    padding: '0 30px',
    marginTop: '20px',
    fontFamily: theme.fontFamily.kanit,
}))

const PageTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    marginLeft: '20px',
    transform: 'scaleY(0.9)',
})

const Text = styled('h2')({
    fontSize: '1.8em',
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
    fontSize: '1.2em',
    color: 'red',
    margin: 'auto',
    width: '100%',
    height: '25vh',
})

const ReviewsAndIntroduction = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '30px',
    marginTop: '50px',
    fontFamily: theme.fontFamily.nunito,
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

const Title = styled('div')({
    margin: '0',
    fontSize: '1.2em',
    transform: 'scaleY(0.9)',
    borderBottom: '2px black solid',
    fontWeight: 'bold',
    width: 'fit-content',
})

const Description = styled('p')({
    margin: '0',
    fontSize: '0.9em',
})

const DetailsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    marginTop: '10px',
    width: '70%',
})

const VistShopButton = styled('button')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    padding: '10px 30px',
    backgroundColor: 'black',
    color: 'white',
    border: '2px black solid',
    borderRadius: '5px',
    marginTop: '30px',
    width: 'fit-content',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
    }
})