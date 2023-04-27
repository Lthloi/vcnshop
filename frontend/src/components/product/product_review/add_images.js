import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { toast } from 'react-toastify'

const AddImages = ({ images, changeImages }) => {
    const [imageObjects, setImageObjects] = useState([])

    useEffect(() => {
        let images = imageObjects.map(({ file }) => file) //get "file" from object list
        changeImages(images) //set review in parent component
    }, [imageObjects])

    useEffect(() => {
        if (images.length === 0 && imageObjects.length > 0) {
            //set images review when submit the review
            imageObjects.map(({ preview }) => removeImage(preview))
        }
    }, [images])

    const uploadImg = (e) => {
        let { files } = e.target

        if (files.length + imageObjects.length > 6)
            return toast.warn('Up to six imageObjects allowed')

        //create a image list for remove images were duplicate
        let current_images = imageObjects.map(({ file }) => file.name)

        //remove elements are in false
        files = Array.from(files)
        files = files.filter(({ name }) => !current_images.includes(name))

        //init file object list and remove images were duplicate
        files = files.map((file) => ({ file, preview: URL.createObjectURL(file) }))

        setImageObjects(pre => [...pre, ...files])

        e.target.value = null
    }

    const removeImage = (link) => {
        setImageObjects(pre => pre.filter(({ preview }) => preview !== link))
        URL.revokeObjectURL(link)
    }

    return (
        <AddImagesArea id="AddImagesArea">

            <input //fake input
                style={{ display: 'none' }}
                type="file"
                id="upload_review_image"
                onChange={uploadImg}
                multiple
            />

            {
                imageObjects.length > 0 &&
                <ImagePreviewsContainer>
                    {imageObjects.map(({ preview }) => (
                        <PreviewWrapper key={preview}>
                            <Preview src={preview} alt="Preview" />
                            <RemoveImageButton
                                onClick={() => removeImage(preview)}
                                title="Remove this image"
                            >
                                <HighlightOffIcon />
                            </RemoveImageButton>
                        </PreviewWrapper>
                    ))}
                </ImagePreviewsContainer>
            }

            {
                imageObjects.length < 6 &&
                <AddPhotosContainer
                    title="Add a photo (optional)"
                    htmlFor="upload_review_image"
                >
                    <ImgIcon />
                    <HelperText>
                        {
                            imageObjects.length === 0 ?
                                'ADD PHOTOS (OPTIONAL)'
                                :
                                imageObjects.length + '/6'
                        }
                    </HelperText>
                </AddPhotosContainer>
            }
        </AddImagesArea>
    )
}

export default AddImages

const AddImagesArea = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    margin: '8px 0',
    boxSizing: 'border-box',
}))

const ImagePreviewsContainer = styled('div')({
    display: 'flex',
    columnGap: '15px',
    rowGap: '15px',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
})

const PreviewWrapper = styled('div')({
    display: 'flex',
    flexBasis: '30.3333%',
    position: 'relative',
    padding: '15px 0',
    backgroundColor: 'lightgray',
    height: '35vh',
})

const Preview = styled('img')({
    width: '100%',
    margin: 'auto',
    maxHeight: '35vh',
})

const RemoveImageButton = styled('div')({
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    zIndex: '10',
    cursor: 'pointer',
    '& svg.MuiSvgIcon-root': {
        color: 'black',
        width: '0.9em',
        height: '0.9em',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    }
})

const AddPhotosContainer = styled('label')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 2px gray',
    border: '1.5px gray dashed',
    transition: 'box-shadow 0.2s',
    cursor: 'pointer',
    padding: '12px',
    boxSizing: 'border-box',
    '&:hover': {
        boxShadow: '0px 0px 5px gray',
    }
})

const ImgIcon = styled(AddPhotoAlternateIcon)({
    height: '0.9em',
    width: '0.9em',
    padding: '5px',
    color: '#585858',
})

const HelperText = styled('p')({
    fontFamily: '"Kanit", "sans-serif"',
    margin: '0',
    fontSize: '0.7em',
    color: 'gray',
})