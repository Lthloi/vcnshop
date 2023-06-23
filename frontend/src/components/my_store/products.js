import React from "react"
import { styled } from '@mui/material/styles'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import ErrorIcon from '@mui/icons-material/Error'
import AddProduct from './add_product'
import { useSelector } from "react-redux"
import { Skeleton } from "@mui/material"

const Products = () => {
    const { products, loading, error } = useSelector(({ product }) => product.search)

    return (
        <div id="ProductsSection">
            <AddProduct />
            {
                loading ? (
                    <Skeleton sx={{ transform: 'none', height: '300px', marginTop: '30px' }} />
                ) : error ? (
                    <Error>
                        <ErrorIcon sx={{ fontSize: '1.2em' }} />
                        <span>{error.message}</span>
                    </Error>
                ) : products && products.length > 0 ? (
                    <div>

                    </div>
                ) : (
                    <ProductsTitle>
                        <CheckroomIcon sx={{ fontSize: '1.8em' }} />
                        <div>Oops! You don't have any product!</div>
                    </ProductsTitle>
                )
            }
        </div>
    )
}

export default Products

const Error = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '5px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: 'red',
    width: '100%',
    marginTop: '30px',
})

const ProductsTitle = styled('h2')({
    fontSize: '1.2em',
    width: '100%',
    textAlign: 'center',
    marginTop: '30px',
})