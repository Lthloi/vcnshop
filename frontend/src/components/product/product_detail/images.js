import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import zoom_in_image from '../../../assets/images/zoom_in_mouse_hover.svg'
import CancelIcon from '@mui/icons-material/Cancel'
import { Box, Stack, Modal } from "@mui/material"
import ProgressiveImage from "../../materials/progressive_image"

const SmallImage = ({ img, active, handlePickImg, className }) => {
    return (
        <SubmainImage
            key={img}
            className={active ? 'active ' + className : className}
            src={img}
            onClick={() => handlePickImg(img)}
        />
    )
}

const SubmainImages = ({ imagePicked, images, handlePickImg }) => {
    return (
        <Stack
            rowGap="12px"
            width="12.5%"
            height="100%"
        >
            {

                images.map((img) => (
                    <SmallImage
                        img={img}
                        active={img === imagePicked}
                        handlePickImg={handlePickImg}
                        className=""
                        key={img}
                    />
                ))
            }
        </Stack>
    )
}

const MainImage = ({ imagePicked }) => {
    const [openLightBox, setOpenLightBox] = useState(false)

    const viewProductImg = (open) => {
        setOpenLightBox(open)
    }

    const LightBox = () => {
        return (
            <Modal
                open={openLightBox}
                sx={{ '& .wrapper_box': { outline: 'unset' } }}
            >
                <Stack
                    className="wrapper_box"
                    boxSizing="border-box"
                    padding="50px"
                    width="100vw"
                    height="100vh"
                    position="relative"
                >
                    <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent="center"
                    >
                        <LightBoxImg src={imagePicked} />
                    </Box>

                    <CloseLightBoxBtn
                        titleAccess="Close"
                        onClick={() => viewProductImg(false)}
                    />
                </Stack>
            </Modal>
        )
    }

    return (
        <>
            <Box
                component={Paper}
                display="flex"
                width="85%"
                height="90vh"
                overflow="hidden"
                elevation={5}
                onClick={() => viewProductImg(true)}
                sx={{ cursor: `url(${zoom_in_image}), auto` }}
            >
                <ProgressiveImage
                    css={{ margin: 'auto', maxWidth: '100%' }}
                    src={imagePicked}
                    height="100%"
                />
            </Box>

            <LightBox open={openLightBox} imagePicked={imagePicked} />
        </>
    )
}

const Images = ({ images }) => {
    const [imagePicked, setImagePicked] = useState(images[0])

    const pickImg = (img) => {
        setImagePicked(img)
    }

    return (
        <Stack
            id="ProductImgs"
            component="div"
            flexDirection="row"
            justifyContent="space-between"
            columnGap="5px"
            width="100%"
            boxSizing="border-box"
        >
            <SubmainImages
                imagePicked={imagePicked}
                images={images}
                handlePickImg={pickImg}
            />

            <MainImage
                imagePicked={imagePicked}
            />
        </Stack>
    )
}

export default Images

const SubmainImage = styled('img')({
    width: '100%',
    maxHeight: '93px',
    cursor: 'pointer',
    borderRadius: '3px',
    boxShadow: '0px 0px 5px gray',
    '&.active': {
        outline: '2px black solid',
    },
    '&:hover': {
        outline: '2px black solid',
    },
})

const LightBoxImg = styled('img')({
    maxHeight: '100%',
    maxWidth: '100%',
    borderRadius: '5px',
})

const CloseLightBoxBtn = styled(CancelIcon)({
    color: 'white',
    width: '1.8em',
    height: '1.8em',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    position: 'absolute',
    right: '30px',
    top: '30px',
    '&:hover': {
        transform: 'scale(1.2)',
    }
})