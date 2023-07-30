import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from "react-redux"
import { getProductDetail } from "../../store/actions/product_actions"
import { Skeleton, Typography, Tooltip } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info'
import ReviewsAndDescription from "./reviews_and_description"
import { Divider } from "@mui/material"
import EditProduct from "./edit_product"
import { useNavigate, useParams } from "react-router-dom"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import DeleteProduct from "./delete_product"

const Images = React.memo(({ images, image_link }) => {
    const [mainImage, setMainImage] = useState('')

    const pickImage = (url) => { setMainImage(url) }

    return (
        <ImagesSection>
            <div>
                {
                    images.map((url) => (
                        <div key={url}>
                            <DescImage
                                src={url}
                                onClick={() => pickImage(url)}
                                sx={{ outline: mainImage === url ? '2px gray solid' : 'unset' }}
                            />
                        </div>
                    ))
                }
            </div>
            <MainImageWrapper>
                <MainImage src={mainImage || image_link} />
            </MainImageWrapper>
        </ImagesSection>
    )
})

const ProductDetail = () => {
    const { product, loading, error } = useSelector(({ product }) => product.productDetail)
    const dispatch = useDispatch()
    const { productId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductDetail(productId))
    }, [dispatch])

    return (
        <ProductSection id="ProductSection">
            <SectionTitle>
                <GoBackBtn onClick={() => navigate(-1)}>
                    <NavigateBeforeIcon />
                    <span>Back</span>
                </GoBackBtn>
                <InfoIcon sx={{ fontSize: '1.3m' }} />
                <span>Product Detail</span>
            </SectionTitle>
            {
                loading && (!product || !product.name) ? (
                    <Skeleton sx={{ height: '400px', transform: 'scale(1)', marginTop: '20px' }} />
                ) : error ? (
                    <Error>{error.message}</Error>
                ) : product && product.name && (
                    <>
                        <ProductStack>
                            <Images images={product.images} image_link={product.image_link} />
                            <InfoContainer>
                                <Tooltip
                                    title={product.name}
                                >
                                    <Typography
                                        component="div"
                                        margin="0"
                                        textOverflow="ellipsis"
                                        whiteSpace="nowrap"
                                        fontSize="1.5em"
                                        width="100%"
                                        overflow="hidden"
                                    >
                                        {product.name}
                                    </Typography>
                                </Tooltip>
                                <div>
                                    <Fields>
                                        <InfoIcon sx={{ fontSize: '1em' }} />
                                        <Field>
                                            <span className="bold">Stock: </span>
                                            <span>{product.stock}</span>
                                        </Field>
                                        <Divider orientation="vertical" flexItem={true} />
                                        <Field>
                                            <span className="bold">Target Gender: </span>
                                            <span>{product.target_gender}</span>
                                        </Field>
                                        <Divider orientation="vertical" flexItem={true} />
                                        <Field>
                                            <span className="bold">Category: </span>
                                            <span>{product.category}</span>
                                        </Field>
                                    </Fields>
                                    <Title>Colors</Title>
                                    <Colors>
                                        {
                                            product.options.colors.map((color) => (
                                                <Tooltip key={color} title={color}>
                                                    <Color theme={{ color }}></Color>
                                                </Tooltip>
                                            ))
                                        }
                                    </Colors>
                                    <Title>Sizes</Title>
                                    <Sizes>
                                        {
                                            product.options.sizes.map((size) => (
                                                <Tooltip key={size} title={'Size ' + size}>
                                                    <Size>
                                                        {size}
                                                    </Size>
                                                </Tooltip>
                                            ))
                                        }
                                    </Sizes>
                                    <Tooltip title={`Price: ${product.price.value} USD`} placement="right">
                                        <Price>
                                            {'$' + product.price.value}
                                        </Price>
                                    </Tooltip>
                                </div>

                                <EditProduct productId={productId} />

                            </InfoContainer>
                        </ProductStack>

                        <DeleteProduct productId={productId} />

                        <ReviewsAndDescription
                            productId={productId}
                            description={product.description}
                        />
                    </>
                )
            }
        </ProductSection>
    )
}

export default ProductDetail

const ProductSection = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.nunito,
}))

const SectionTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '10px',
    paddingBottom: '3px',
    boxSizing: 'border-box',
    width: '100%',
    borderBottom: '2px black solid',
    margin: '0',
    fontSize: '1.3em',
    marginTop: '30px',
    position: 'relative',
})

const GoBackBtn = styled('button')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    backgroundColor: 'white',
    border: 'none',
    fontSize: '1em',
    position: 'absolute',
    left: '0',
    top: '0',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const Error = styled('div')(({ theme }) => ({
    color: 'red',
    width: '100%',
    textAlign: 'center',
    padding: '20px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    boxSizing: 'border-box',
    fontFamily: theme.fontFamily.nunito,
}))

const ProductStack = styled('div')({
    display: 'flex',
    columnGap: '30px',
    marginTop: '20px',
})

const ImagesSection = styled('div')({
    display: 'flex',
    columnGap: '15px',
    maxWidth: '60%',
})

const DescImage = styled('img')({
    width: '70px',
    marginBottom: '10px',
    borderRadius: '3px',
    border: '2px white solid',
    cursor: 'pointer',
    boxShadow: '0px 0px 2px gray',
    '&:hover': {
        outline: '2px gray solid',
    }
})

const MainImageWrapper = styled('div')({
    width: '500px',
    height: '550px',
})

const MainImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    borderRadius: '3px',
    boxShadow: '0px 0px 3px gray',
})

const InfoContainer = styled('div')({
    width: '40%',
    paddingLeft: '20px',
})

const Fields = styled('div')({
    display: 'flex',
    marginTop: '15px',
    columnGap: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
})

const Field = styled('div')({
    fontSize: '1em',
    padding: '5px',
    '& .bold': {
        fontWeight: 'bold',
    }
})

const Colors = styled('div')({
    display: 'flex',
    columnGap: '20px',
})

const Title = styled('h2')({
    margin: '25px 0 10px',
    fontSize: '1.1em',
})

const Color = styled('div')(({ theme }) => ({
    backgroundColor: theme.color,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    boxShadow: '0px 0px 3px black',
}))

const Sizes = styled('div')({
    display: 'flex',
    columnGap: '10px',
})

const Size = styled('div')({
    padding: '5px 20px',
    border: '2px black solid',
})

const Price = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.kanit,
    fontSize: '3em',
    marginTop: '30px',
    width: 'fit-content',
}))