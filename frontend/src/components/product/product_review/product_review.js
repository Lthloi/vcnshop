import React, { useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import ReviewsIcon from '@mui/icons-material/Reviews'
import Reviews from './reviews'
import { useDispatch } from "react-redux"
import { newReview } from "../../../store/actions/product_actions"
import ScoreCard from "./scorecard"
import AddImages from "./add_images"
import RatingSet from "./rating_set"
import { toast } from 'react-toastify'
import FileUploadFilter from "../../../utils/file_upload_filter"
import CommentIcon from '@mui/icons-material/Comment'

const ProductReview = ({ productId, productReview }) => {
    const [review, setReview] = useState({ rating: 0, images: [] })
    const comment_title_ref = useRef()
    const comment_ref = useRef()
    const switch_review_page_ref = useRef()
    const dispatch = useDispatch()

    const submitReviews = () => {
        if (
            review.rating === 0 || comment_title_ref.current.value === '' ||
            comment_ref.current.value === ''
        )
            return toast.warn('Please complete Rating and Title and Comment!')

        const reviewData = new FormData()
        if (review.images.length > 0) {
            let file_upload_filter
            for (let file of review.images) {
                file_upload_filter = new FileUploadFilter(file)
                if (!file_upload_filter.mimetypeIsValid())
                    return toast.error(file_upload_filter.invalidMessage)
                if (!file_upload_filter.sizeIsValid())
                    return toast.error(file_upload_filter.invalidMessage)

                reviewData.append('images', file)
            }
        }

        reviewData.set('rating', review.rating)
        reviewData.set('comment', comment_ref.current.value)
        reviewData.set('title', comment_title_ref.current.value)

        dispatch(newReview(productId, reviewData))

        //set review state to original
        setReview({ rating: 0, images: [] })
        comment_ref.current.value = ''
        comment_title_ref.current.value = ''
    }

    const changeImages = (images) => {
        images = images.map(({ file }) => file) //get "file" keys from object list
        setReview(pre => ({ ...pre, images }))
    }

    const handleSetRating = (rating) => {
        setReview(pre => ({ ...pre, rating }))
    }

    return (
        <ProductReviewArea id="ProductReviewArea">
            <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                <ReviewsIcon />
                <ProductReviewTitle>Customer Reviews</ProductReviewTitle>
            </div>

            <Hr />
            <ReviewsContainer>
                <ReviewOverviewTitle>Overview</ReviewOverviewTitle>

                <ScoreCard
                    commentTitleRef={comment_title_ref}
                    review={productReview}
                />

                <ReviewWriteComment>Make Review</ReviewWriteComment>

                <AddImages
                    images={review.images}
                    changeImages={changeImages}
                />

                <RatingSet
                    ratingValue={review.rating}
                    handleSetRatingValue={handleSetRating}
                />

                <CommentTitle
                    id="WriteCommentTitle"
                    ref={comment_title_ref}
                    maxLength={65}
                    placeholder="Write your title of comment here..."
                />

                <WriteComment //textarea
                    id="WriteCommentText"
                    ref={comment_ref}
                    placeholder="Write your comment here..."
                    rows={5} maxLength={200}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span></span>
                    <SubmitCommentBtn onClick={submitReviews}>
                        Submit Review
                    </SubmitCommentBtn>
                </div>
            </ReviewsContainer>

            <ReviewsArea id="Reviews" ref={switch_review_page_ref}>
                <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                    <CommentIcon />
                    <ReviewsTitle>Reviews</ReviewsTitle>
                </div>

                <Hr />

                <Reviews
                    countReview={productReview.count_review}
                    productId={productId}
                    srollReviewRef={switch_review_page_ref}
                />

            </ReviewsArea>
        </ProductReviewArea>
    )
}

export default ProductReview

const ProductReviewArea = styled('div')({
    width: '56%',
})

const ProductReviewTitle = styled('h2')({
    margin: '0',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1.5em',
    transform: 'scaleY(0.9)',
})

const Hr = styled('div')({
    height: '2px',
    backgroundColor: 'black',
})

const ReviewsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    marginTop: '5px',
})

const ReviewOverviewTitle = styled('div')({
    margin: '0',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1.5em',
    transform: 'scaleY(0.9)',
    borderBottom: '2px black solid',
    fontWeight: 'bold',
    width: 'fit-content',
})

const ReviewWriteComment = styled(ReviewOverviewTitle)({

})

const CommentTitle = styled('input')({
    fontSize: '1em',
    fontFamily: '"Nunito", "sans-serif"',
    padding: '3px 15px',
    border: '1.5px black solid',
    outline: 'unset',
})

const WriteComment = styled('textarea')({
    outline: 'unset',
    padding: '5px 15px',
    fontSize: '1.1em',
    boxSizing: 'border-box',
    border: '1.5px black solid',
    width: '100%',
    fontFamily: '"Nunito", "sans-serif"',
    resize: 'vertical',
})

const SubmitCommentBtn = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    padding: '8px 12px',
    cursor: 'pointer',
    backgroundColor: 'black',
    color: 'white',
    border: '2px white solid',
    '&:hover': {
        outline: '2px black solid',
    }
})

const ReviewsArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
})

const ReviewsTitle = styled('h2')({
    margin: '0',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1.5em',
    transform: 'scaleY(0.9)',
})