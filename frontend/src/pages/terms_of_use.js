import React from "react"
import { styled } from "@mui/material"
import { Box, Stack, Typography, Divider } from '@mui/material'
import { useNavigate } from "react-router-dom"
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'

const embed_link_terms_of_use_html = "https://codevcnn.github.io/Storage/terms_of_use_vcn_shop_ecommerce.html"

const TermsOfUse = () => {
    const navigate = useNavigate()

    return (
        <div id="TermOfUse">

            <Stack
                height="100vh"
                bgcolor="#2C2C2C"
            >
                <Stack
                    position="relative"
                >
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        height="100%"
                        position="absolute"
                        left="0"
                        top="0"
                        paddingLeft="15px"
                    >
                        <GoBackWrapper onClick={() => navigate(-1)}>
                            <Box
                                display="flex"
                                alignItems="center"
                                style={{ cursor: 'pointer' }}
                            >
                                <GoBackIcon />
                                <Typography
                                    fontSize="1.5em"
                                    sx={{ transform: 'scaleX(0.9)' }}
                                    color="white"
                                >
                                    BACK
                                </Typography>
                            </Box>
                        </GoBackWrapper>
                    </Stack>

                    <Typography
                        component="h2"
                        color="white"
                        fontWeight="bold"
                        fontSize="2em"
                        padding="10px"
                        textAlign="center"
                    >
                        VCN Shop - FOX COR
                    </Typography>
                </Stack>

                <Divider flexItem sx={{ bgcolor: 'rgba(255,255,255,.3)' }} />

                <Box
                    height="100%"
                    overflow="hidden"
                >
                    <Box
                        component="object"
                        height="100%"
                        width="100%"
                        data={embed_link_terms_of_use_html}
                        type="text/html"
                    />
                </Box>
            </Stack>

        </div>
    )
}

export default TermsOfUse

const GoBackWrapper = styled('div')({
    position: 'relative',
    '&::after': {
        content: '""',
        height: '3px',
        width: '0',
        backgroundColor: 'white',
        position: 'absolute',
        top: '100%',
        right: '0',
        transition: 'width 0.2s',
    },
    '&:hover::after': {
        width: '100%',
    },
})

const GoBackIcon = styled(ExpandCircleDownIcon)({
    height: '100%',
    transform: 'rotate(90deg)',
    transition: 'transform 0.2s',
    margin: 'auto',
    color: 'white',
})