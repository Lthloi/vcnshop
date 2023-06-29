import React, { useState, useCallback, useTransition, useRef } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { IconButton } from "@mui/material"
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import Grid from '@mui/material/Grid'
import CancelIcon from '@mui/icons-material/Cancel'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import InfoIcon from '@mui/icons-material/Info'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import { updateProduct } from '../../store/actions/product_actions'
import { CircularProgress, Tooltip } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import ErrorIcon from '@mui/icons-material/Error'

const options = {
    colors: [
        'Red',
        'Yellow',
        'Green',
        'Blue',
        'Violet',
        'White',
        'Black',
    ],
    sizes: ['S', 'M', 'L'],
}

const RenderCheckBox = () => (<Checkbox color="default" sx={{ color: "#2e7d32" }} />)

const Detail = React.memo(({ register, formStateErrors, setValue }) => {
    const colors_string = useRef('')
    const sizes_string = useRef('')

    const pickColor = (e) => {
        let color = e.target.value
        if (e.target.checked)
            colors_string.current += `,${color}`
        else
            colors_string.current = colors_string.current.replace(`,${color}`, '')
        setValue(
            'Colors',
            colors_string.current
        )
    }

    const pickSize = (e) => {
        let size = e.target.value
        if (e.target.checked)
            sizes_string.current += `,${size}`
        else
            sizes_string.current = sizes_string.current.replace(`,${size}`, '')
        setValue(
            'Sizes',
            sizes_string.current
        )
    }

    return (
        <DetailSection id="DetailSection">
            <TextField
                variant="outlined"
                label='Description'
                fullWidth
                multiline
                inputProps={{ maxLength: 500 }}
                rows={5}
                helperText={formStateErrors['Description'] ? formStateErrors['Product Name'].message : 'Describe your product. Enter everything your customer should know about this product. This info will be displayed to the customers.'}
                InputProps={{ ...register('Description') }}
                error={!!formStateErrors['Description']}
                color="success"
            />
            <input
                {...register('Colors')}
                style={{ display: 'none' }}
            />
            <FormControl color="success">
                <FormLabel>Colors</FormLabel>
                <FormGroup
                    row
                    onChange={pickColor}
                >
                    {
                        options.colors.map((color) => (
                            <FormControlLabel
                                key={color}
                                control={RenderCheckBox()}
                                label={color}
                                value={color}
                            />
                        ))
                    }
                </FormGroup>
                <FormHelperText error={!!formStateErrors['Colors']}>
                    Pick colors your products have
                </FormHelperText>
            </FormControl>
            <input
                {...register('Sizes')}
                style={{ display: 'none' }}
            />
            <FormControl color="success">
                <FormLabel>Sizes</FormLabel>
                <FormGroup
                    row
                    onChange={pickSize}
                >
                    {
                        options.sizes.map((size) => (
                            <FormControlLabel
                                key={size}
                                value={size}
                                control={RenderCheckBox()}
                                label={size}
                            />
                        ))
                    }
                </FormGroup>
                <FormHelperText error={!!formStateErrors['Sizes']}>
                    Pick a size your products have
                </FormHelperText>
            </FormControl>
            <TextField
                variant="outlined"
                label='Stock'
                fullWidth
                color="success"
                type="number"
                helperText={formStateErrors['Stock'] ? formStateErrors['Stock'].message : 'Enter the current amount of your product.'}
                InputProps={{ ...register('Stock') }}
                error={!!formStateErrors['Stock']}
                inputProps={{ min: 1, max: 1000 }}
            />
        </DetailSection>
    )
})

const DetailSection = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '30px',
    fontFamily: theme.fontFamily.nunito,
}))

const AddImagesSection = React.memo(({ onCancelPickImg, onPickImages, imageList }) => {

    const RenderAddImgButton = (height, paddingBottom, image_object, index) => {
        return (
            <Grid item xs={1}>
                {
                    image_object && image_object.url ?
                        <ImageWrapper sx={height ? { height } : { paddingBottom }}>
                            <Tooltip title="Delete">
                                <CloseIconWrapper onClick={() => onCancelPickImg(image_object.url)}>
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
            <div style={{ display: 'none' }}>
                {
                    [0, 1, 2, 3, 4].map((index) => (
                        <input
                            key={index}
                            type="file"
                            id={`image_input_${index}`}
                            onChange={(e) => onPickImages(e, index)}
                            multiple
                            accept="image/*"
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
        </>
    )
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} unmountOnExit />
})

const max_add_images = 5

const EditProduct = ({ productId }) => {
    const { loading } = useSelector(({ product }) => product.productDetail)
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [imageList, setImageList] = useState([null, null, null, null, null])
    const { handleSubmit, setError, register, formState: { errors }, setValue } = useForm()
    const [isPending, startTransition] = useTransition()
    const dispatch = useDispatch()

    const checkAndSubmitEditProduct = (data, e) => {
        e.preventDefault()

        let description = data['Description']
        let stock = data['Stock'] * 1
        let colors = data['Colors']
        let sizes = data['Sizes']
        let images = imageList.filter((image_object) => image_object)

        if (!description && !stock && !colors && !sizes && images.length === 0)
            return toast.warning('Please fill in at least one field that you want to chnage')

        if (description.length > 500) {
            toast.warning('The Description field can not be longer than 500 characters')
            return setError('Description', { message: 'The product description can not longer than 500 characters' })
        }
        if (stock < 0 || stock > 1000) {
            toast.warning('The stock field can not be greater than 1000 and lower than 0')
            return setError('Stock', { message: 'The stock can not be greater than 1000 and lower than 0' })
        }

        images = images.map(({ file }) => file)
        let colors_array = colors.slice(1).split(',')
        let sizes_array = sizes.slice(1).split(',')

        dispatch(updateProduct(
            sizes_array,
            colors_array,
            stock,
            description,
            productId,
            images
        ))
    }

    const handleCancelPickImg = useCallback((image_url) => {
        setImageList(pre => pre.map(
            (image_object) => {
                if (image_object && image_url !== image_object.url)
                    return image_object
                else
                    return null
            }
        ))

        URL.revokeObjectURL(image_url)
    }, [])

    const handlePickImgs = useCallback((e, index_of_image_list) => {
        let { files } = e.target

        files = Array.from(files).slice(0, max_add_images - index_of_image_list)

        setImageList(pre => {
            let name_of_images = pre.map((image_object) => image_object && image_object.file.name)
            let images_to_add = files.filter(({ name }) => !name_of_images.includes(name))
            images_to_add = images_to_add.map((file) => ({ file, url: URL.createObjectURL(file) }))

            let i = 0, number_of_files = files.length

            return pre.map((object, index) => {
                if (object || i > number_of_files - 1 || index < index_of_image_list)
                    return object
                else
                    return images_to_add[i++]
            })
        })

        e.target.value = null
    }, [])

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
                    <h2 className="close_title">Edit Product</h2>
                </CloseContainer>
                <DialogContent>
                    <Note>
                        <ErrorIcon sx={{ fontSize: '1.2em', color: 'gray' }} />
                        <span>
                            Note that all of the old data will be changed to the data that you filled in
                            the fields below. And the data of fields isn't filled will be stay unchanged.
                            Now feel free to edit.
                        </span>
                    </Note>
                    <AddImagesSection
                        onCancelPickImg={handleCancelPickImg}
                        onPickImages={handlePickImgs}
                        imageList={imageList}
                    />
                    <FormHelperText error={!!errors['Images']}>
                        Add at least one image for your products. This info will be displayed on product page for the customers
                    </FormHelperText>

                    <Title>
                        <InfoIcon />
                        <span>Product Detail</span>
                    </Title>

                    <Detail
                        register={register}
                        formStateErrors={errors}
                        setValue={setValue}
                    />

                    <SubmitBtn
                        onClick={handleSubmit(
                            (data, e) => startTransition(() => { checkAndSubmitEditProduct(data, e) })
                        )}
                    >
                        {
                            isPending || loading ?
                                <CircularProgress
                                    size={17}
                                    thickness={5}
                                    sx={{ color: 'white' }}
                                />
                                :
                                'Submit'
                        }
                    </SubmitBtn>
                </DialogContent>
            </Dialog >
            <EditBtn
                onClick={() => {
                    startTransition(() => { setOpenAddProduct(true) })
                }}
            >
                {
                    isPending ?
                        <CircularProgress
                            size={15}
                            thickness={6}
                            sx={{ color: 'white' }}
                        />
                        :
                        <>
                            <span>Edit</span>
                            <EditIcon />
                        </>
                }
            </EditBtn>
        </>
    )
}

export default React.memo(EditProduct)

const EditBtn = styled('button')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px black solid',
    columnGap: '10px',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: '30px',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '1.2em',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
    }
})

const DialogContent = styled('div')(({ theme }) => ({
    padding: '0 40px 20px',
    fontFamily: theme.fontFamily.nunito,
}))

const Note = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    marginTop: '10px',
    '& span': {
        fontFamily: '"Nunito", "sans-serif"',
        fontSize: '0.8em',
    }
})

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
        outline: '1.5px black solid',
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

const SubmitBtn = styled('button')({
    padding: '10px 30px',
    borderRadius: '5px',
    backgroundColor: 'black',
    color: 'white',
    border: '2px black solid',
    marginTop: '30px',
    width: '100%',
    fontSize: '1.1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
        '& svg': {
            color: 'black',
        }
    },
})