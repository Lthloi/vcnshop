import React from "react"
import NewsLetter from "../components/home/new_letter"
import ScrollToTopBtn from "../components/scroll_top_top_btn"
import Background from "../components/home/background"
import SecBanners from "../components/home/sec_banners"
import WomenSProducts from "../components/home/women's_products"
import MenSProducts from "../components/home/men's_products"
import { Box, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"
import Overview from "../components/home/overview"
import { useTranslation } from 'react-i18next'

const Home = () => {
    const theme = useTheme()
    const { t } = useTranslation('home_page')

    return (
        <Box
            id="Home"
            component="div"
            width="100%"
        >
            <Background />

            <SecBanners />

            <Typography
                fontFamily={theme.fontFamily.kanit}
                fontWeight="bold"
                fontSize="3em"
                paddingLeft="60px"
                marginTop="80px"
            >
                {t('Most Sold')}
            </Typography>

            <WomenSProducts />

            <MenSProducts />

            <Typography
                fontFamily={theme.fontFamily.kanit}
                fontWeight="bold"
                fontSize="3em"
                paddingLeft="60px"
                marginTop="80px"
            >
                {t('Overview')}
            </Typography>

            <Overview />

            <NewsLetter />

            <ScrollToTopBtn />
        </Box>
    )
}

export default Home