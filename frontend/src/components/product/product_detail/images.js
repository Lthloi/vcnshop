import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import CancelIcon from '@mui/icons-material/Cancel'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Drawer from '@mui/material/Drawer'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

const RenderImg = (img, active, pickImgs, className) => {
    return (
        <Img
            key={img}
            className={active ? 'active ' + className : className}
            src={img}
            onClick={() => pickImgs(img)}
        />
    )
}

const light_box_change_img_icon_style = {
    width: '2.2em',
    height: '2.2em',
    color: 'white',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.2)',
    }
}

const Images = ({ images }) => {
    const [openLightBox, setOpenLightBox] = useState(false)
    const [openImgsDrawer, setOpenImgsDrawer] = useState(false)
    const [imagePicked, setImagePicked] = useState(images[0])

    const image_list = images || []

    const viewProductImg = (open) => {
        setOpenLightBox(open)
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }

    const handleOpenImgsDrawer = (open) => {
        setOpenImgsDrawer(open)
    }

    const pickImgs = (img) => {
        setImagePicked(img)
    }

    const changeImgLightBox = (direction) => {
        let img_index = image_list.findIndex((img) => img === imagePicked)
        if (img_index === 0 && direction === 'left') return
        if (img_index === image_list.length - 1 && direction === 'right') return
        if (direction === 'left')
            setImagePicked(image_list[img_index - 1])
        if (direction === 'right')
            setImagePicked(image_list[img_index + 1])
    }

    return (
        <ProductImgs id="ProductImgs">
            {image_list.length > 5 &&
                <ImgsDrawer open={openImgsDrawer}
                    onClose={() => handleOpenImgsDrawer(false)}
                >
                    <ImgsDrawerList>
                        {image_list.map((img) => (
                            RenderImg(img, img === imagePicked, pickImgs, '')
                        ))}
                    </ImgsDrawerList>
                </ImgsDrawer>
            }
            <ImgsContainer sx={image_list.length < 6 && { justifyContent: 'unset' }}>
                {image_list.length > 5 ?
                    <>
                        {image_list.slice(0, 5).map((img) => (
                            RenderImg(img, img === imagePicked, pickImgs, '')
                        ))}
                        <MoreWrapper onClick={() => handleOpenImgsDrawer(true)}>
                            <MoreIcon />
                        </MoreWrapper>
                    </>
                    :
                    image_list.map((img) => (
                        RenderImg(img, img === imagePicked, pickImgs, '')
                    ))
                }
            </ImgsContainer>

            {openLightBox &&
                <LightBoxModalBase className="LightBoxModalBase">
                    <LightBoxImgConatiner>
                        <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                            <ArrowCircleLeftIcon
                                sx={light_box_change_img_icon_style}
                                onClick={() => changeImgLightBox('left')}
                            />
                            <LightBoxImg src={imagePicked} className="LightBoxImg" />
                            <ArrowCircleRightIcon
                                sx={light_box_change_img_icon_style}
                                onClick={() => changeImgLightBox('right')}
                            />
                        </div>
                        <LightBoxImgsList>
                            {image_list.map((img, index) => (
                                RenderImg(img, img === imagePicked, pickImgs, 'LightBoxImgsList')
                            ))}
                        </LightBoxImgsList>
                    </LightBoxImgConatiner>
                    <CloseLightBoxIcon
                        titleAccess="Close"
                        onClick={() => viewProductImg(false)}
                    />
                </LightBoxModalBase>
            }

            <ProductImageWrapper
                elevation={5}
                onClick={() => viewProductImg(true)}
            >
                <ProductImage src={imagePicked} />
            </ProductImageWrapper>
        </ProductImgs>
    )
}

export default Images

const ProductImgs = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '5px',
    width: '100%',
    boxSizing: 'border-box',
})

const ImgsDrawer = styled(Drawer)({

})

const ImgsDrawerList = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    padding: '20px',
})

const ImgsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    rowGap: '12px',
    width: '12.5%',
    height: '99vh',
})

const Img = styled('img')({
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
    '&.LightBoxImgsList': {
        boxSizing: 'border-box',
        border: '2px transparent solid',
        '&:hover': {
            outline: '2px white solid',
        },
        '&.active': {
            outline: '2px white solid',
        }
    },
})

const MoreWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '22px',
    borderRadius: '5px',
    backgroundColor: 'black',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '2px white solid',
    boxSizing: 'border-box',
    '&:hover': {
        outline: '2px black solid',
    }
})

const MoreIcon = styled(MoreHorizIcon)({
    color: 'white',
    width: '1.2em',
    height: '1.2em',
    transition: 'transform 0.2s',
})

const LightBoxModalBase = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: '100',
    padding: '20px',
})

const LightBoxImgConatiner = styled('div')({
    display: 'flex',
    columnGap: '80px',
})

const LightBoxImg = styled('img')({
    height: '100%',
    borderRadius: '5px',
})

const LightBoxImgsList = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 10px',
    overflowY: 'scroll',
    width: '8.1vw',
    rowGap: '10px',
})

const CloseLightBoxIcon = styled(CancelIcon)({
    color: 'white',
    width: '1.8em',
    height: '1.8em',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    position: 'absolute',
    right: '15px',
    top: '15px',
    '&:hover': {
        transform: 'scale(1.2)',
    }
})

const ProductImageWrapper = styled(Paper)({
    display: 'flex',
    width: '85%',
    height: '99vh',
    overflow: 'hidden',
    '&:hover': {
        cursor: `url(${FitScreenIcon}), auto`,
    }
})

const ProductImage = styled('img')({
    margin: 'auto',
    height: '100%',
})