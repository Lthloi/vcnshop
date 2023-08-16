import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import Rating from '@mui/material/Rating'
import { useSelector } from "react-redux"

const ScoreCard = () => {
    const { average_rating, count_reviews } = useSelector(({ product }) => product.productDetail.product.review)
    const { reviews } = useSelector(({ product }) => product.reviews)

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

    return (
        <ScoreCardContainer>
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AverageRatingNumber>{average_rating}</AverageRatingNumber>
                    <Rating
                        value={average_rating * 1} precision={0.5}
                        readOnly size="large" sx={{ color: '#ff8888' }}
                    />
                </div>
                <BaseOn>
                    <span>{'Based On ' + count_reviews}</span>
                    <span>{count_reviews > 1 ? ' Reviews' : ' Review'}</span>
                </BaseOn>
            </div>
            <div style={{ display: 'flex', columnGap: '8px', width: '100%', alignItems: 'center' }}>
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
                                    sx={{ width: (count / count_reviews) * 100 + '%' }}
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
    )
}

export default ScoreCard

const ScoreCardContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    columnGap: '20px',
    padding: '0 25px',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 3px grey',
    borderRadius: '5px',
    marginTop: '5px',
    fontFamily: theme.fontFamily.nunito,
}))

const AverageRatingNumber = styled('h2')({
    margin: '0',
    marginRight: '5px',
})

const BaseOn = styled('p')({
    margin: '0',
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
    padding: '10px 0 8px',
    width: '100%',
})

const RatingBars = styled('div')({
    display: 'flex',
    columnGap: '8px',
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