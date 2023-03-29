import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import CancelIcon from '@mui/icons-material/Cancel'

const ReviewImages = ({ imageURLs }) => {
    const [openImageLightBox, setOpenImageLightBox] = useState(false)
    const [imageLightBox, setImageLightBox] = useState()

    const handleViewImage = (show, image_URL) => {
        setOpenImageLightBox(show)

        if (show) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'unset'

        if (image_URL) setImageLightBox(image_URL)
    }

    return (
        <ReviewImagesContainer id="ReviewImagesContainer">

            {
                openImageLightBox &&
                <ImageLightBoxArea>
                    <ImageLightBox src={imageLightBox} />
                    <div
                        title="Close"
                        onClick={() => handleViewImage(false)}
                    >
                        <StyledCancelIcon />
                    </div>
                </ImageLightBoxArea>
            }

            {imageURLs && imageURLs.length > 0 && imageURLs.map((imageURL) => (
                <ReviewImage
                    key={imageURL}
                    src={imageURL}
                    onClick={() => handleViewImage(true, imageURL)}
                />
            ))}
        </ReviewImagesContainer>
    )
}

export default ReviewImages

const ReviewImagesContainer = styled('div')({
    display: 'flex',
    columnGap: '10px',
})

const ImageLightBoxArea = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: '101',
    padding: '30px 0',
})

const ImageLightBox = styled('img')({
    height: '100%',
    border: '1px white solid',
    boxSizing: 'border-box',
    borderRadius: '5px',
})

const StyledCancelIcon = styled(CancelIcon)({
    width: '1.8em',
    height: '1.8em',
    position: 'absolute',
    top: '30px',
    right: '30px',
    color: 'white',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.1)',
    }
})

const ReviewImage = styled('img')({
    height: '80px',
    maxWidth: '15.3%',
    border: '1.5px white solid',
    cursor: 'pointer',
    '&:hover': {
        outline: '2px black solid',
    }
})