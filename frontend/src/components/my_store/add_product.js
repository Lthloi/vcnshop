import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import AddIcon from '@mui/icons-material/Add'
import Slide from '@mui/material/Slide'
import CloseIcon from '@mui/icons-material/Close'
import { Tooltip } from "@mui/material"
import { IconButton } from "@mui/material"
import Grid from '@mui/material/Grid'
import CancelIcon from '@mui/icons-material/Cancel'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import InfoIcon from '@mui/icons-material/Info'
import Detail from './detail'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const max_add_images = 5

const AddProduct = () => {
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [imageList, setImageList] = useState([null, null, null, null, null])

    const handlePickImgs = (e, index_of_image_list) => {
        let { files } = e.target

        files = Array.from(files).slice(0, max_add_images - index_of_image_list)

        let name_of_images = imageList.map((image_object) => image_object && image_object.file.name)
        let images_to_add = files.filter(({ name }) => !name_of_images.includes(name))
        images_to_add = images_to_add.map((file) => ({ file, url: URL.createObjectURL(file) }))

        let i = 0, length_of_files = files.length
        let update_images = imageList.map((object, index) => {
            if (object || i > length_of_files || index < index_of_image_list)
                return object
            else
                return images_to_add[i++]
        })

        setImageList(update_images)
        e.target.value = null
    }

    const handleCancelPickImg = (image_url) => {
        setImageList(pre => pre.map(
            (image_object) => {
                if (image_object && image_url !== image_object.url)
                    return image_object
                else
                    return null
            }
        ))
        URL.revokeObjectURL(image_url)
    }

    const RenderAddImgButton = (height, paddingBottom, image_object, index) => {
        return (
            <Grid item xs={1}>
                {
                    image_object && image_object.url ?
                        <ImageWrapper sx={height ? { height } : { paddingBottom }}>
                            <Tooltip title="Delete">
                                <CloseIconWrapper onClick={() => handleCancelPickImg(image_object.url)}>
                                    <CancelIcon sx={{ color: 'red' }} />
                                </CloseIconWrapper>
                            </Tooltip>
                            <img src={image_object.url} alt="Product" />
                        </ImageWrapper>
                        :
                        <Tooltip title="Add Image" followCursor>
                            <AddImg
                                htmlFor={`image_input_${index}`}
                                sx={height ? { height } : { paddingBottom }}
                            >
                                <AddIconWrapper>
                                    <AddIcon />
                                </AddIconWrapper>
                            </AddImg>
                        </Tooltip>
                }
            </Grid>
        )
    }

    return (
        <>
            <Dialog
                fullScreen
                open={openAddProduct}
                onClose={() => setOpenAddProduct(false)}
                TransitionComponent={Transition}
            >
                <CloseContainer>
                    <Tooltip title="Close">
                        <IconButton onClick={() => setOpenAddProduct(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    <span>Cancel</span>
                    <h2 className="close_title">Add Product</h2>
                </CloseContainer>
                <DialogContent>

                    <div style={{ display: 'none' }}>
                        {
                            [0, 1, 2, 3, 4].map((index) => (
                                <input
                                    key={index}
                                    type="file"
                                    id={`image_input_${index}`}
                                    onChange={(e) => handlePickImgs(e, index)}
                                    multiple
                                />
                            ))
                        }
                    </div>

                    <Title>
                        <PermMediaIcon />
                        <span>Product Images</span>
                    </Title>

                    <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={{ xs: 2 }}
                        columns={2}
                    >
                        {RenderAddImgButton('100%', null, imageList[0], 0)}
                        <Grid xs={1} item>
                            <Grid
                                container
                                rowSpacing={2}
                                columnSpacing={{ xs: 2 }}
                                columns={2}
                            >
                                {RenderAddImgButton(null, '90%', imageList[1], 1)}
                                {RenderAddImgButton(null, '90%', imageList[2], 2)}
                                {RenderAddImgButton(null, '90%', imageList[3], 3)}
                                {RenderAddImgButton(null, '90%', imageList[4], 4)}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Title>
                        <InfoIcon />
                        <span>Product Detail</span>
                    </Title>

                    <Detail />
                </DialogContent>
            </Dialog >
            <AnimationBtn onClick={() => setOpenAddProduct(true)}>
                <div className="content">
                    <AddIcon sx={{ fontSize: '1.2em' }} />
                    <span>New Product</span>
                </div>
            </AnimationBtn>
        </>
    )
}

export default React.memo(AddProduct)

const DialogContent = styled('div')(({ theme }) => ({
    padding: '0 20px 20px',
    fontFamily: theme.fontFamily.nunito,
}))

const CloseContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    columnGap: '5px',
    alignItems: 'center',
    fontWeight: 'bold',
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px',
    paddingLeft: '20px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    fontFamily: theme.fontFamily.nunito,
    position: 'relative',
    '& .close_title': {
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    }
}))

const image_layout = {
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
}

const ImageWrapper = styled('div')({
    ...image_layout,
    border: '1px white solid',
    '& img': {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
    },
})

const CloseIconWrapper = styled('div')({
    position: 'absolute',
    right: '0',
    top: '0',
    zIndex: '3',
    transform: 'translate(50%,-50%)',
    backgroundColor: 'white',
    borderRadius: '50%',
    height: '1.5em',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.1) translate(50%,-50%)',
    },
})

const AddImg = styled('label')({
    display: 'block',
    border: '1px gray solid',
    ...image_layout,
    cursor: 'pointer',
    '&:hover': {
        outline: '1.5px gray solid',
    }
})

const AddIconWrapper = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
})

const Title = styled('h2')({
    display: 'flex',
    columnGap: '10px',
    alignItems: 'center',
    fontSize: '1.3em',
    fontWeight: 'bold',
    marginTop: '40px',
})

const AnimationBtn = styled('button')({
    cursor: 'pointer',
    backgroundColor: 'white',
    border: '1px black solid',
    position: 'relative',
    overflowX: 'hidden',
    '& .content': {
        display: 'flex',
        columnGap: '10px',
        alignItems: 'center',
        padding: '15px 20px',
        fontSize: '1em',
        zIndex: '2',
        position: 'relative',
        transition: 'color 0.5s',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        backgroundColor: 'black',
        left: '0',
        top: '0',
        height: '100%',
        width: '130%',
        transition: 'transform 0.5s',
        transform: 'skew(30deg) translateX(-130%)',
        zIndex: '1',
    },
    '&:hover::after': {
        transform: 'skew(30deg) translateX(-10%)',
    },
    '&:hover .content': {
        color: 'white',
    }
})