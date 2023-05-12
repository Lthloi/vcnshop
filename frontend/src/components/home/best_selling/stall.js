import React, { useEffect } from "react"
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { getBestSelling } from "../../../store/actions/product_actions"
import ProductCard from "./product_card"
import { CircularProgress } from "@mui/material"

const Stall = () => {
    const { loading, products, error } = useSelector(({ product }) => product.bestSelling)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBestSelling(20))
    }, [dispatch])

    return (
        <StallArea id="StallArea">
            <GridContainer
                container
                columns={{ xs: 12 }}
                columnSpacing={{ xs: 1 }}
                rowSpacing={{ xs: 1 }}
            >
                {loading ? (
                    <Loading>
                        <CircularProgress
                            thickness={6}
                            size={40}
                            sx={{ margin: 'auto', color: 'black' }}
                        />
                    </Loading>
                ) : error ?
                    <Error>
                        {error.message}
                    </Error>
                    :
                    products.map((product) => (
                        <ProductCardWrapper
                            item
                            xs={3}
                            key={product._id}
                            className="ProductCardWrapper"
                        >
                            <ProductCard
                                product={product}
                            />
                        </ProductCardWrapper>
                    ))
                }
            </GridContainer>
            <ShowMoreBtn>
                Show More
            </ShowMoreBtn>
        </StallArea>
    )
}

export default Stall

const StallArea = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '10px',
    padding: '0 50px',
})

const GridContainer = styled(Grid)({
    padding: '10px 0 0 0',
    margin: '0',
})

const Loading = styled('div')({
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '10px 0',
})

const Error = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    color: 'red',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2em',
    padding: '10px 0',
})

const ProductCardWrapper = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
})

const ShowMoreBtn = styled('div')({
    padding: '5px 50px',
    borderRadius: '5px',
    fontFamily: '"Chakra Petch", "sans-serif"',
    backgroundColor: 'pink',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '2px 3px black',
    position: 'relative',
    transition: 'top 0.2s , left 0.2s , background-color 0.3s',
    '&:hover': {
        backgroundColor: '#ff8a9f',
    },
    '&:active': {
        top: '5px',
        left: '3px',
        boxShadow: 'none',
    }
})