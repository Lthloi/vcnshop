import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import Rating from '@mui/material/Rating'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'

const rating_emotion_style = {
    width: '1em',
    height: '1em',
}

const RatingSet = ({ ratingValue, handleSetRatingValue }) => {
    const [rating, setRating] = useState({ color: 'red', emotion: 'Bad' })

    useEffect(() => {
        if (ratingValue === 0) setRating({ color: 'red', emotion: 'Bad' })
    }, [ratingValue])

    const pickRatingStar = (e, newValue) => {
        handleSetRatingValue(newValue || 0)
    }

    const hoverRatingStar = (e, newValue) => {
        if (newValue > 3 || (newValue < 0 && ratingValue > 3))
            return setRating({ emotion: 'Good', color: 'green' })
        if (newValue > 2 || (newValue < 0 && ratingValue > 2))
            return setRating({ emotion: 'Not Bad', color: '#c3a700' })
        if (newValue > 0 || (newValue < 0 && ratingValue >= 0))
            return setRating({ emotion: 'Bad', color: 'red' })
    }

    return (
        <RatingContainer id="RatingContainer">
            <Rating //rating
                value={ratingValue}
                color="default"
                precision={1}
                size="medium"
                sx={{ '& span.MuiRating-icon': { color: rating.color } }}
                onChange={(e, newValue) => pickRatingStar(e, newValue)}
                onChangeActive={(e, newValue) => hoverRatingStar(e, newValue)}
            />
            {
                rating.emotion === 'Good' ? (
                    <SentimentVerySatisfiedIcon
                        color="success"
                        titleAccess="Good"
                        sx={rating_emotion_style}
                    />
                ) : rating.emotion === 'Not Bad' ? (
                    <SentimentNeutralIcon
                        titleAccess="Not Bad"
                        sx={{ ...rating_emotion_style, color: '#c3a700' }}
                    />
                ) : (
                    <SentimentVeryDissatisfiedIcon
                        color="error"
                        titleAccess="Bad"
                        sx={rating_emotion_style}
                    />
                )
            }
        </RatingContainer>
    )
}

export default RatingSet

const RatingContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '5px',
})