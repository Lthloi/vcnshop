import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import RateReviewIcon from '@mui/icons-material/RateReview'
import Rating from '@mui/material/Rating'
import { useSelector } from "react-redux"

const ScoreCard = ({ commentTitleRef }) => {
    const { average_rating, count_review } = useSelector(({ productDetail }) => productDetail.product.review)
    const { reviews } = useSelector(({ productDetail }) => productDetail.reviewsState)

    const countStar = useMemo(() => {
        let count_star = [
            { star: 1, count: 0 },
            { star: 2, count: 0 },
            { star: 3, count: 0 },
            { star: 4, count: 0 },
            { star: 5, count: 0 },
        ]

        if (reviews.length > 0)
            for (let review of reviews)
                count_star[review.rating - 1].count++

        return count_star.reverse()
    }, [reviews])

    const scrollIntoCommentTitle = () => {
        commentTitleRef.current.scrollIntoView({ behavior: 'auto', block: 'center' })
        commentTitleRef.current.focus()
    }

    return (
        <ScoreCardArea id="ScoreCardArea">
            <ScoreCardContainer>
                <AverageRatingContainer>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AverageRatingNumber>{average_rating}</AverageRatingNumber>
                        <Rating
                            value={average_rating * 1} precision={0.5}
                            readOnly size="large" sx={{ color: '#ff8888' }}
                        />
                    </div>
                    <BaseOn>
                        <span>{'Based On ' + count_review}</span>
                        <span>{count_review > 1 ? ' Reviews' : ' Review'}</span>
                    </BaseOn>
                </AverageRatingContainer>
                <div style={{ display: 'flex', columnGap: '6px', width: '100%', }}>
                    <RatingsContainer>
                        {
                            [5, 4, 3, 2, 1].map((number) => (
                                <StyledRating value={number} readOnly key={number} />
                            ))
                        }
                    </RatingsContainer>
                    <RatingBarsContainer>
                        {
                            countStar.map(({ star, count }) => (
                                <RatingBars key={star}>
                                    <RatingBar
                                        sx={{ width: (count / count_review) * 100 + '%' }}
                                    >
                                        <div className="rating_bar"></div>
                                    </RatingBar>
                                    <div>{count}</div>
                                </RatingBars>
                            ))
                        }
                    </RatingBarsContainer>
                </div>
            </ScoreCardContainer>

            <MakeAReviewButton
                title="Make a review"
                onClick={scrollIntoCommentTitle}
            >
                <RateReviewIcon sx={{ width: '0.9em', height: '0.9em' }} />
                <span>Make A Review</span>
            </MakeAReviewButton>
        </ScoreCardArea>
    )
}

export default ScoreCard

const ScoreCardArea = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '10px',
}))

const ScoreCardContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '20px',
    width: '75%',
    padding: '0 10px',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 5px grey',
    borderRadius: '5px',
    marginTop: '5px',
    border: '1px gray solid',
})

const AverageRatingContainer = styled('div')({

})

const AverageRatingNumber = styled('h2')({
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    marginRight: '5px',
})

const BaseOn = styled('p')({
    margin: '0',
    fontFamily: '"Work Sans", sans-serif',
    fontSize: '0.9em',
})

const RatingsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    padding: '5px 0',
})

const StyledRating = styled(Rating)({
    color: '#ff8888',
})

const RatingBarsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    borderLeft: '2px #ff8888 solid',
    padding: '6px 0 5px',
    width: '100%',
})

const RatingBars = styled('div')({
    display: 'flex',
    columnGap: '8px',
    fontFamily: '"Nunito", "sans-serif"',
    alignItems: 'center',
})

const RatingBar = styled('div')({
    display: 'flex',
    alignItems: 'center',
    height: '1.51rem',
    '& div.rating_bar': {
        height: '70%',
        width: '100%',
        backgroundColor: '#ff8888',
    }
})

const MakeAReviewButton = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    width: 'fit-content',
    padding: '4px 7px',
    cursor: 'pointer',
    border: '1px #959595 solid',
    transition: 'box-shadow 0.2s',
    borderRadius: '3px',
    '& span': {
        fontFamily: '"Roboto", "sans-serif"',
        fontSize: '0.9em',
    },
    '&:hover': {
        boxShadow: '0px 0px 3px gray',
    }
})