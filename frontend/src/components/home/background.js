import React from "react"
import { styled } from '@mui/material/styles'
import banner_item_1 from '../../assets/images/home_banner_item_1.jpg'
import banner_item_2 from '../../assets/images/home_banner_item_2.jpg'
import banner_background from '../../assets/images/home_banner_background.jpg'
import { Stack, Typography } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTheme } from "@emotion/react"

const Background = () => {
    const theme = useTheme()

    const shopNowAction = () => {
        window.scrollTo({
            top: 850,
            behavior: 'smooth',
        })
    }

    return (
        <Stack
            id="Home-Background"
            component="div"
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
            padding="30px 70px"
            boxSizing="border-box"
            sx={{ backgroundImage: `url(${banner_background})` }}
        >

            <Stack
                fontFamily={theme.fontFamily.kanit}
                justifyContent="center"
            >
                <Typography
                    fontFamily="inherit"
                    color="red"
                >
                    Winter Collection
                </Typography>
                <Typography
                    fontFamily="inherit"
                    fontSize="3em"
                    fontWeight="bold"
                >
                    New Trending <br />
                    Collection 2023
                </Typography>
                <Typography
                    fontFamily={theme.fontFamily.nunito}
                    fontStyle="italic"
                >
                    Make up your lifestyle
                </Typography>

                <ShopNowButton
                    onClick={shopNowAction}
                >
                    <span>Shop Now</span>
                    <ArrowForwardIcon sx={{ fontSize: '1.1em' }} />
                </ShopNowButton>
            </Stack>

            <BannerContainer>
                <img src={banner_item_1} alt="banner-1" />
                <img src={banner_item_2} alt="banner-2" />
            </BannerContainer>

        </Stack>
    )
}

export default Background

const BannerContainer = styled('div')({
    position: 'relative',
    zIndex: '0',
    width: '500px',
    height: '500px',
    overflow: 'visible',
    marginRight: '50px',
    '& img': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    '& img:nth-of-type(1)': {
        zIndex: '1',
        height: '400px',
        animation: 'auto_change_image_1 5s infinite ease-in-out alternate',
        '@keyframes auto_change_image_1': {
            '0%': {
                opacity: '1',
            },
            '40%': {
                opacity: '1',
            },
            '60%': {
                opacity: '0',
            },
            '100%': {
                opacity: '0',
            }
        }
    },
    '& img:nth-of-type(2)': {
        zIndex: '2',
        height: '400px',
        animation: 'auto_change_image_2 5s infinite linear alternate',
        '@keyframes auto_change_image_2': {
            '0%': {
                opacity: '0',
            },
            '40%': {
                opacity: '0',
            },
            '60%': {
                opacity: '1',
            },
            '100%': {
                opacity: '1',
            }
        }
    },
})

const ShopNowButton = styled('button')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    padding: '10px 25px',
    fontFamily: theme.fontFamily.nunito,
    fontSize: '0.9em',
    width: 'fit-content',
    marginTop: '15px',
    border: '2px black solid',
    borderRadius: '0',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white',
    }
}))