import React from "react"
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField';

const Detail = () => {
    return (
        <DetailSection id="DetailSection">
            <TextField
                variant="outlined"
                label="Product Name"
                fullWidth
            />
        </DetailSection>
    )
}

export default React.memo(Detail)

const DetailSection = styled('div')(({ theme }) => ({
    
}))