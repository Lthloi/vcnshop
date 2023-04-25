import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from "react-redux"
import { Rating } from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import Pagination from '@mui/material/Pagination'
import ReviewImages from "./review_images"
import { getReviews } from "../../../store/actions/product_actions"
import { Skeleton } from "@mui/material"
import CommentIcon from '@mui/icons-material/Comment'
import { LIMIT_GET_COMMENTS } from "../../../utils/constants"

const Reviews = ({ productId, srollReviewRef }) => {
    const { reviews, loading, error } = useSelector(({ productDetail }) => productDetail.reviewsState)
    const [reviewPage, setReviewPage] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getReviews(productId, 1))
    }, [dispatch])

    const switchCommentPage = (e, page) => {
        if (page === reviewPage) return
        srollReviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setReviewPage(page)
        dispatch(getReviews(productId, page))
    }

    const convertDate = (date_in_string) => {
        let date_splitting = date_in_string.split('/')
        let temp = date_splitting[0]
        date_splitting[0] = date_splitting[1]
        date_splitting[1] = temp
        return date_splitting.join('/')
    }

    return (
        <>
            {
                loading ? (
                    <>
                        <ReviewLoading />
                        <ReviewLoading />
                        <ReviewLoading />
                    </>
                ) : error ? (
                    <ReviewError>{error.message}</ReviewError>
                ) : reviews && reviews.length > 0 ? reviews.map(({ _id, name, comment, rating, title, createdAt, avatar, imageURLs }) =>
                    <ReviewContainer key={_id}>
                        <Date>
                            <span>Written On </span>
                            <span>{convertDate(new window.Date(createdAt).toLocaleDateString())}</span>
                        </Date>
                        <UserInfoContainer>
                            <AvatarWrapper>
                                <Avatar src={avatar} />
                            </AvatarWrapper>
                            <Name>{name}</Name>
                        </UserInfoContainer>
                        <Rating value={rating * 1} readOnly size="small" precision={0.5} />
                        <CommentTitle>{title}</CommentTitle>
                        <Comment>{comment}</Comment>
                        <ReviewImages imageURLs={imageURLs} />
                        <IsHelpful>
                            <span className="title">Was This Review Helpful ?</span>
                            <div title="Helpful"
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <ThumbUpIcon sx={{ fontSize: '0.8em', cursor: 'pointer', }} />
                                <ThumbUpCount>{0}</ThumbUpCount>
                            </div>
                            <div title="Unhelpful"
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <ThumbDownIcon sx={{ fontSize: '0.8em', cursor: 'pointer', }} />
                                <ThumbUpCount>{0}</ThumbUpCount>
                            </div>
                        </IsHelpful>
                    </ReviewContainer>
                )
                    :
                    <EmptyReviews>
                        <CommentIcon sx={{ height: '2em', width: '2em' }} />
                        <EmptyReviewsText>
                            There's no one review...
                        </EmptyReviewsText>
                    </EmptyReviews>
            }

            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <ReviewPages
                    count={Math.ceil(reviews.length / LIMIT_GET_COMMENTS)}
                    variant="outlined" shape="rounded"
                    onChange={switchCommentPage}
                    page={reviewPage}
                />
            </div>
        </>
    )
}

export default Reviews

const ReviewContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    padding: '10px',
    backgroundColor: '#e0f9ff',
    borderBottom: '2px gray solid',
    position: 'relative',
    marginTop: '10px',
})

const Date = styled('div')({
    fontFamily: '"Work Sans", sans-serif',
    fontSize: '0.9em',
    position: 'absolute',
    top: '10px',
    right: '10px',
})

const UserInfoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    width: 'fit-content',
    cursor: 'pointer',
    paddingRight: '5px',
})

const AvatarWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '50%',
    height: 'fit-content',
})

const Avatar = styled('img')({
    height: '40px',
    width: '40px',
})

const Name = styled('h2')({
    fontFamily: '"Work Sans", sans-serif',
    margin: '0',
    fontSize: '1em',
})

const CommentTitle = styled('h2')({
    fontFamily: '"Work Sans", sans-serif',
    margin: '0',
    marginLeft: '5px',
    fontSize: '1.1em',
})

const Comment = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    paddingLeft: '5px',
})

const IsHelpful = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px',
    marginTop: '5px',
    '& span.title': {
        fontFamily: '"Work Sans", sans-serif',
        fontSize: '0.8em',
        marginLeft: '10px',
    }
})

const ThumbUpCount = styled('span')({
    fontFamily: '"Work Sans", sans-serif',
    fontSize: '0.8em',
    marginLeft: '3px',
})

const ReviewPages = styled(Pagination)({
    marginTop: '20px',
    '& button.MuiPaginationItem-root': {
        backgroundColor: '#c4f9ff',
        border: '1.5px black solid',
        color: 'black',
        '&:hover': {
            border: '1.5px #c4f9ff solid',
        },
        '&.Mui-selected': {
            border: '2px #c4f9ff solid',
            '&:hover': {
                backgroundColor: '#c4f9ff',
            }
        },
        '&.Mui-disabled': {
            opacity: '0.5',
        },
        '& span.MuiTouchRipple-root': {
            display: 'none',
        }
    }
})

const EmptyReviews = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '5px',
    backgroundColor: '#f0f0f0',
    height: '35vh',
    width: '100%',
    marginTop: '10px',
})

const EmptyReviewsText = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1.2em',
})

const ReviewLoading = styled(Skeleton)({
    marginTop: '20px',
    width: '100%',
    height: '150px',
    transform: 'unset',
})

const ReviewError = styled('div')({
    textAlign: 'center',
    width: '100%',
    padding: '10px',
    fontFamily: '"Nunito", "sans-serif"',
    color: 'red',
    fontWeight: 'bold',
})