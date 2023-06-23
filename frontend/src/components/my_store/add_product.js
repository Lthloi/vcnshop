import React, { useCallback, useRef, useState, useTransition } from "react"
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import AddIcon from '@mui/icons-material/Add'
import Slide from '@mui/material/Slide'
import CloseIcon from '@mui/icons-material/Close'
import { CircularProgress, Tooltip } from "@mui/material"
import { IconButton } from "@mui/material"
import Grid from '@mui/material/Grid'
import CancelIcon from '@mui/icons-material/Cancel'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import InfoIcon from '@mui/icons-material/Info'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Avatar } from "@mui/material"
import { Stack } from "@mui/material"
import Cash from '../../assets/images/payment_methods/cash.png'
import Mastercard from '../../assets/images/payment_methods/mastercard.png'
import Visa from '../../assets/images/payment_methods/visa.png'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { createNewProduct } from '../../store/actions/product_actions'

const labels = {
    Images: 'Images',
    ProductName: 'Product Name',
    Description: 'Description',
    Price: 'Price',
    Type: 'Type',
    Stock: 'Stock',
    Brand: 'Brand',
    Category: {
        labelName: 'Category',
        Shirt: 'Shirt',
        Pant: 'Pant',
    },
    TargetGender: {
        labelName: 'Target Gender',
        Male: 'Male',
        Female: 'Female',
        Unisex: 'Unisex',
    },
    Colors: {
        labelName: 'Colors',
    },
    Sizes: {
        labelName: 'Sizes',
    }
}

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

const RenderPaymentMethod = (title, src, size) => (
    <Tooltip title={title}>
        <Avatar alt={title} src={src} variant="square" sx={{ height: size, width: size }} />
    </Tooltip>
)

const RenderRadio = () => (<Radio color="default" sx={{ color: "#2e7d32" }} />)
const RenderCheckBox = () => (<Checkbox color="default" sx={{ color: "#2e7d32" }} />)

const Detail = React.memo(({ register, formStateErrors, control, setValue }) => {
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
                label='Product Name'
                fullWidth
                helperText={formStateErrors['Product Name'] ? formStateErrors['Product Name'].message : 'Enter product name. This product will be searched by the name by the customers.'}
                InputProps={{ ...register('Product Name') }}
                error={!!formStateErrors['Product Name']}
                color="success"
                inputProps={{ maxLength: 50 }}
            />
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
            <FormControl color="success">
                <FormLabel>Category</FormLabel>
                <Controller
                    control={control}
                    name='Category'
                    render={({ field: { onChange } }) => (
                        <RadioGroup
                            row
                            onChange={onChange}
                        >
                            <FormControlLabel
                                value='Shirt'
                                control={RenderRadio()}
                                label='Shirt'
                            />
                            <FormControlLabel
                                value='Pant'
                                control={RenderRadio()}
                                label='Pant'
                            />
                        </RadioGroup>
                    )}
                />
                <FormHelperText error={!!formStateErrors['Category']}>
                    Pick a category for your products
                </FormHelperText>
            </FormControl>
            <FormControl color="success">
                <FormLabel>Target Gender</FormLabel>
                <Controller
                    control={control}
                    name='Target Gender'
                    render={({ field: { onChange } }) => (
                        <RadioGroup
                            row
                            onChange={onChange}
                        >
                            <FormControlLabel
                                value='Male'
                                control={RenderRadio()}
                                label='Male'
                            />
                            <FormControlLabel
                                value='Female'
                                control={RenderRadio()}
                                label='Female'
                            />
                            <FormControlLabel
                                value='Unisex'
                                control={RenderRadio()}
                                label='Unisex'
                            />
                        </RadioGroup>
                    )}
                />
                <FormHelperText error={!!formStateErrors['Target Gender']}>
                    Pick a kind of gender will be suitable with your products
                </FormHelperText>
            </FormControl>
            <div>
                <TextField
                    variant="outlined"
                    label='Price'
                    fullWidth
                    type="number"
                    color="success"
                    helperText={formStateErrors['Price'] ? formStateErrors['Price'].message : 'Enter the price of your product in USD currency. The following are payment methods accepted for the customers. For example: 52.21 means 52 dollars and 21 cents'}
                    InputProps={{ ...register('Price') }}
                    error={!!formStateErrors['Price']}
                    inputProps={{ min: 0, max: 9999999 }}
                />
                <Stack direction="row" spacing={2} marginTop="3px">
                    {RenderPaymentMethod('Cash', Cash, '35px')}
                    {RenderPaymentMethod('Mastercard', Mastercard, '40px')}
                    {RenderPaymentMethod('Visa', Visa, '40px')}
                </Stack>
            </div>
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
                label='Type'
                color="success"
                fullWidth
                helperText={formStateErrors['Type'] ? formStateErrors['Type'].message : 'Enter the type, example: If your product category is "Shirt" and it is a sweater then enter "Sweater".'}
                InputProps={{ ...register('Type') }}
                error={!!formStateErrors['Type']}
                inputProps={{ maxLength: 30 }}
            />
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
            <TextField
                variant="outlined"
                label='Brand'
                color="success"
                fullWidth
                helperText={formStateErrors['Brand'] ? formStateErrors['Brand'].message : 'Enter the brand of your product. If the product doesn\'t have brand yet then enter "No Brand"'}
                InputProps={{ ...register('Brand') }}
                error={!!formStateErrors['Brand']}
                inputProps={{ maxLength: 50 }}
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

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

const max_add_images = 5

const AddProduct = () => {
    const { loading } = useSelector(({ product }) => product.productDetail)
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [imageList, setImageList] = useState([null, null, null, null, null])
    const { handleSubmit, setError, register, formState: { errors }, control, setValue } = useForm()
    const [isPending, startTransition] = useTransition()
    const dispatch = useDispatch()

    const checkAndSubmitaddProduct = (data, e) => {
        e.preventDefault()

        let product_name = data['Product Name']
        let description = data['Description']
        let type = data['Type']
        let brand = data['Brand']
        let price = data['Price'] * 1
        let stock = data['Stock'] * 1
        let colors = data['Colors']
        let category = data['Category']
        let target_gender = data['Target Gender']
        let sizes = data['Sizes']

        let warning = (message) => toast.warning(message || 'Can\'t not submit, please check your form')

        if (
            !product_name || !description || !type || !price || !stock ||
            !category || !target_gender || !colors || !sizes || !brand
        ) return warning('Please don\'t empty any fields even images field')

        if (product_name.length > 150) {
            warning()
            return setError('Product Name', { message: 'The product name can not longer than 50 characters' })
        }
        if (description.length > 500) {
            warning()
            return setError('Description', { message: 'The product description can not longer than 150 characters' })
        }
        if (brand.length > 50) {
            warning()
            return setError('Stock', { message: 'The stock can not greater than 1000 and lower than 0' })
        }
        if (type.length > 30) {
            warning()
            return setError('Type', { message: 'The type can not longer than 30 characters' })
        }
        if (price > 9999999 || price < 0) {
            warning()
            return setError('Price', { message: 'The price can not greater than 9,999,999 and lower than 0' })
        }
        if (stock < 0 || stock > 1000) {
            warning()
            return setError('Stock', { message: 'The stock can not greater than 1000 and lower than 0' })
        }

        let images = imageList.filter((image_object) => image_object)
        if (images.length === 0) return setError('Images')

        images = images.map(({ file }) => file)
        let colors_array = colors.slice(1).split(',')
        let sizes_array = sizes.slice(1).split(',')

        dispatch(createNewProduct(product_name,
            category,
            target_gender,
            price,
            { colors: colors_array, sizes: sizes_array },
            stock,
            description,
            brand,
            type,
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
                    <h2 className="close_title">Add Product</h2>
                </CloseContainer>
                <DialogContent>
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
                        control={control}
                        setValue={setValue}
                    />

                    <SubmitBtn
                        onClick={handleSubmit(
                            (data, e) => startTransition(() => { checkAndSubmitaddProduct(data, e) })
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
            <AnimationBtn
                onClick={() => {
                    startTransition(() => { setOpenAddProduct(true) })
                }}
            >
                {
                    isPending ?
                        <CircularProgress
                            size={13}
                            thickness={6}
                            sx={{ color: 'black' }}
                        />
                        :
                        <div className="content">
                            <AddIcon sx={{ fontSize: '1.2em' }} />
                            <span>New Product</span>
                        </div>
                }
            </AnimationBtn>
        </>
    )
}

export default React.memo(AddProduct)

const DialogContent = styled('div')(({ theme }) => ({
    padding: '0 40px 20px',
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

const AnimationBtn = styled('button')({
    fontSize: '0.9em',
    cursor: 'pointer',
    backgroundColor: 'white',
    border: '1px black solid',
    position: 'relative',
    overflowX: 'hidden',
    padding: '15px 20px',
    '& .content': {
        display: 'flex',
        columnGap: '10px',
        alignItems: 'center',
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