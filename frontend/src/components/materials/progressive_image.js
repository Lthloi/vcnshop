import React, { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"

const ProgressiveImage = ({ src, alt, height, width, css, className, textFont, textSize }) => {
    const [imgSrc, setImgSrc] = useState()

    useEffect(() => {
        let image = new Image()

        image.src = src

        image.onload = () => {
            setImgSrc(image.src)
        }
    }, [src])

    return (
        imgSrc ? (
            <Box
                component="img"
                src={imgSrc}
                alt={alt}
                className={className || ''}
                sx={{
                    height: height || 'auto',
                    width: width || 'auto',
                    ...(css || {}),
                }}
            />
        ) :
            <Box
                display="flex"
                sx={{
                    height: height || 'auto',
                    width: width || 'auto',
                    margin: 'auto',
                    ...(css || {}),
                }}
            >
                <Typography
                    margin="auto"
                    fontSize={textSize || '1em'}
                    sx={textFont ? { fontFamily: textFont } : {}}
                >
                    Loading...
                </Typography>
            </Box>
    )
}

export default ProgressiveImage