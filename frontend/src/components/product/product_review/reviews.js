import React, { useState } from "react"
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

const Reviews = ({ productId, countReview, srollReviewRef }) => {
    const { reviews, loading, error } = useSelector(({ productDetail }) => productDetail.reviewObject)
    const [reviewPage, setReviewPage] = useState(1)
    const dispatch = useDispatch()

    const switchCommentPage = (e, page) => {
        if (page === reviewPage) return
        srollReviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setReviewPage(page)
        dispatch(getReviews(productId, page))
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
                ) : reviews && reviews.length > 0 ? reviews.map(({ name, username, comment,
                    rating, title, createdOn, avatar, imageURLs, _id }) =>
                    <CommentContainer key={_id}>
                        <Date>
                            <span>Writed On </span>
                            <span>{new window.Date(createdOn).toLocaleDateString()}</span>
                        </Date>
                        <UserInfoContainer>
                            <AvatarWrapper>
                                <Avatar src={avatar} />
                            </AvatarWrapper>
                            <Info>
                                <Name>{name}</Name>
                                <Username>{'@' + username}</Username>
                            </Info>
                        </UserInfoContainer>
                        <Rating value={rating} readOnly size="small" precision={0.5} />
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
                    </CommentContainer>
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
                    count={Math.ceil(countReview / LIMIT_GET_COMMENTS)}
                    variant="outlined" shape="rounded"
                    onChange={switchCommentPage}
                    page={reviewPage}
                />
            </div>
        </>
    )
}

export default Reviews

const CommentContainer = styled('div')({
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

const Info = styled('div')({

})

const Name = styled('h2')({
    fontFamily: '"Work Sans", sans-serif',
    margin: '0',
    fontSize: '1em',
})

const Username = styled('div')({
    display: 'flex',
    alignItems: 'center',
    fontFamily: '"Work Sans", sans-serif',
    fontSize: '0.8em',
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