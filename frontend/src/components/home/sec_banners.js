import React from "react"
import { styled } from '@mui/material/styles'
import SecBanner_1 from '../../assets/images/sec_banner_1.webp'
import SecBanner_2 from '../../assets/images/sec_banner_2.webp'
import SecBanner_3 from '../../assets/images/sec_banner_3.webp'
import { useTheme } from "@emotion/react"
import { Stack, Typography, Box } from "@mui/material"

const SecBanner = ({ banner, title, subtitle }) => {
    const theme = useTheme()

    return (
        <Box
            width="100%"
            sx={{
                backgroundImage: `url(${banner})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <SecBannerSection>

                <Box
                    fontFamily={theme.fontFamily.kanit}
                    color="black"
                    className="title_container"
                >
                    <Typography
                        fontFamily="inherit"
                        fontWeight="bold"
                        fontSize="2em"
                        color="inherit"
                    >
                        {title}
                    </Typography>
                    <Typography
                        fontFamily="inherit"
                        marginTop="5px"
                        color="inherit"
                    >
                        {subtitle}
                    </Typography>
                </Box>

                <AnimationTextContainer
                    className="animation_text_container"
                >
                    <AnimationText
                        className="animation_text"
                    >
                        Shop Now
                    </AnimationText>
                </AnimationTextContainer>

            </SecBannerSection>
        </Box>
    )
}

const SecBanners = () => {
    return (
        <Stack
            flexDirection="row"
            columnGap="30px"
            width="100%"
            marginTop="50px"
            padding="0 50px"
            boxSizing="border-box"
        >
            <SecBanner banner={SecBanner_1} title="Woman" subtitle="Spring 2021" />
            <SecBanner banner={SecBanner_2} title="Man" subtitle="Spring 2022" />
            <SecBanner banner={SecBanner_3} title="Unisex" subtitle="New Trend" />
        </Stack>
    )
}

export default SecBanners

const SecBannerSection = styled('div')({
    width: '100%',
    height: '250px',
    border: '1px rgba(0,0,0,.1) solid',
    padding: '30px',
    boxSizing: 'border-box',
    position: 'relative',
    transition: 'background-color 0.5s',
    backgroundColor: 'transparent',
    cursor: 'pointer',

    '&:hover': {
        backgroundColor: 'rgb(63,172,177,0.78)',

        '& .title_container': {
            color: 'white',
        },
        '& .animation_text_container': {
            transform: 'scaleX(1)',

            '& .animation_text': {
                top: '0',
            }
        },
    },
})

const AnimationTextContainer = styled('div')({
    height: '1.5em',
    transform: 'scaleX(0)',
    transition: 'transform 0.5s',
    position: 'absolute',
    left: '30px',
    bottom: '30px',
    borderBottom: '3px white solid',
    paddingBottom: '2px',
    color: 'white',
    overflow: 'hidden',
})

const AnimationText = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.kanit,
    position: 'relative',
    top: '100%',
    left: '0',
    width: 'max-content',
    fontSize: '1em',
    transition: 'top 0.4s',
    transitionDelay: '0.3s',
}))