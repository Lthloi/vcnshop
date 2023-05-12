import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import footer_background_image from '../../../assets/images/footer_background_image.jpg'
import foxLogoWhite from '../../../assets/images/logo_app_white.svg'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import MailIcon from '@mui/icons-material/Mail'
import TelegramIcon from '@mui/icons-material/Telegram'
import TermsOfUse from "../../terms_of_use"
import cash from '../../../assets/images/payment_methods/cash.png'
import visa from '../../../assets/images/payment_methods/visa.png'
import mastercard from '../../../assets/images/payment_methods/mastercard.png'
import Short from "./short"

const social_icon_style = {
    color: 'white',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.2)',
    }
}

const desc_hover_style = {
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
        color: 'pink',
    },
}

const information = [
    {
        type: 'About us',
        content: [
            { desc: 'Terms of use', action: 1 },
            { desc: 'Return policy', },
            { desc: 'Blogs', },
            { desc: 'News', },
        ]
    }, {
        type: 'Partner',
        content: [
            { desc: 'VCN Travel Look', },
            { desc: 'VCN E-Net', },
            { desc: 'VCN VLy', },
        ]
    }, {
        type: 'Fast Menu',
        content: [
            { desc: 'Men\'s clothing', },
            { desc: 'Women\'s clothing', },
            { desc: 'Sneaker', },
            { desc: 'Suit', },
            { desc: 'Unisex', },
        ]
    }, {
        type: 'Contact',
        content: [
            {
                icon: <LocationOnIcon sx={{ color: 'white' }} />,
                desc: '9th floor of FoxLand Building, 106 Nguyen Van Tien, Bien Hoa - Dong Nai',
            }, {
                icon: <PhoneIcon sx={{ color: 'white' }} />,
                desc: '(0838) 686 886 986',
            }, {
                icon: <MailIcon sx={{ color: 'white' }} />,
                desc: 'vcnshop@foxcor.com',
            }, {
                icon: <TelegramIcon sx={{ color: 'white' }} />,
                desc: '+84 338-988-338',
            }
        ]
    },
]

const payment_methods = [
    { name: 'Visa', img: visa },
    { name: 'Mastercard', img: mastercard },
    { name: 'Cash', img: cash },
]

const Footer = () => {
    const [openTermsOfUse, setTermsOfUse] = useState(false)

    const handleOpenTermsOfUse = (open) => {
        setTermsOfUse(open)
    }

    const handleActions = (action) => {
        if (!action) return
        if (action === 1)
            handleOpenTermsOfUse(true)
    }

    return (
        <FooterArea id="FooterArea">

            <TermsOfUse
                openDialog={openTermsOfUse}
                handleOpenDialog={handleOpenTermsOfUse}
            />

            <SocialsContainer>
                <SocialText>Contact us on social networks!</SocialText>
                <Socials>
                    <FacebookIcon sx={social_icon_style} titleAccess="Facebook" />
                    <YouTubeIcon sx={social_icon_style} titleAccess="Youtube" />
                    <InstagramIcon sx={social_icon_style} titleAccess="Instagram" />
                    <TwitterIcon sx={social_icon_style} titleAccess="Twitter" />
                    <LinkedInIcon sx={social_icon_style} titleAccess="LinkedIn" />
                </Socials>
            </SocialsContainer>
            <InformationsArea>
                <Modalbase />
                <InformationsContainer>
                    <LogoContainer>
                        <LogoWrapper>
                            <LogoImg src={foxLogoWhite} />
                            <LogoTextContainer>
                                <LogoName>VCN Shop</LogoName>
                                <SmallText>Shopping anywhere</SmallText>
                                <SmallText>Shopping too easy</SmallText>
                            </LogoTextContainer>
                        </LogoWrapper>
                        <LogoDescription>
                            <div>
                                VCN Shop is an online clothing store and a branch in
                                Dong Nai of the international e-commerce group Fox COR
                                based in HCM City.
                            </div>
                            <div>Thank for VCN VLy distribution center of goods and services.</div>
                        </LogoDescription>
                    </LogoContainer>
                    {
                        information.map(({ type, content }) => (
                            <Infos key={type}>
                                <InfoTitle>{type}</InfoTitle>
                                {
                                    content.map(({ icon, desc, action }) => (
                                        <Content key={desc}>
                                            {icon && <InfoIconWrapper>{icon}</InfoIconWrapper>}
                                            <Desc
                                                sx={action ? desc_hover_style : {}}
                                                onClick={() => handleActions(action)}
                                            >
                                                {desc}
                                            </Desc>
                                        </Content>
                                    ))
                                }
                            </Infos>
                        ))
                    }
                </InformationsContainer>

                <PaymentMethods id="PaymentMethods">
                    <PaymentMethodsContainer>
                        <TitleWrapper>
                            <Title>Accept payment via</Title>
                        </TitleWrapper>
                        <Methods>
                            {
                                payment_methods.map(({ name, img }) => (
                                    <Method src={img} key={name}
                                        title={name}
                                    />
                                ))
                            }
                        </Methods>
                    </PaymentMethodsContainer>
                </PaymentMethods>

            </InformationsArea>

            <Short />
        </FooterArea>
    )
}

export default Footer

const FooterArea = styled('div')({
    marginTop: '30px',
})

const SocialsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#3facb1',
})

const SocialText = styled('p')({
    color: 'white',
    fontSize: '1.3em',
    fontFamily: '"Chakra Petch", "sans-serif"',
    fontWeight: 'bold',
    margin: '0',
})

const Socials = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '200px',
})

const InformationsArea = styled('div')({
    backgroundColor: 'black',
    backgroundImage: `url(${footer_background_image})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    position: 'relative',
    height: 'auto',
    minHeight: '350px'
})

const Modalbase = styled('div')({
    position: 'absolute',
    zIndex: '1',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: '#00000087',
})

const InformationsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: '3',
    padding: '20px',
})

const LogoContainer = styled('div')({
    width: '22vw',
})

const LogoWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'fit-content',
    width: 'fit-content',
    marginLeft: '10px',
})

const LogoImg = styled('img')({
    height: '100px',
    cursor: 'pointer',
})

const LogoTextContainer = styled('div')({
    marginLeft: '10px',
    cursor: 'pointer',
})

const LogoName = styled('h3')({
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    color: 'white',
})

const SmallText = styled('p')({
    margin: '0',
    width: 'fit-content',
    fontSize: '0.8em',
    fontFamily: '"Nunito", "sans-serif"',
    color: 'white',
})

const LogoDescription = styled('div')({
    marginTop: '20px',
    color: 'white',
    fontSize: '1.2rem',
    fontFamily: '"Nunito", "sans-serif"',
})

const Infos = styled('div')({
    width: '12vw',
    marginLeft: '10px',
    '&:last-child': {
        width: '22vw',
        '& h2': {
            marginLeft: '32px',
        }
    }
})

const InfoTitle = styled('h2')({
    margin: '0',
    width: 'fit-content',
    color: 'white',
    fontFamily: '"Chakra Petch", "sans-serif"',
    paddingBottom: '7px',
    borderBottom: '3px #3FACB1 solid',
})

const Content = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
})

const InfoIconWrapper = styled('div')({
    marginRight: '10px',
    cursor: 'pointer',
})

const Desc = styled('div')({
    color: 'white',
    fontFamily: '"Nunito", "sans-serif"',
})

const PaymentMethods = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    zIndex: '2',
    marginTop: '20px',
}))

const PaymentMethodsContainer = styled('div')({

})

const TitleWrapper = styled('div')({
    display: 'flex',
    width: '100%',
})

const Title = styled('h2')({
    margin: 'auto',
    color: 'white',
    fontFamily: '"Chakra Petch", "sans-serif"',
    fontSize: '1.6em',
    paddingBottom: '10px',
    borderBottom: '3px #3FACB1 solid',
    width: 'fit-content',
})

const Methods = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    columnGap: '20px',
    marginTop: '15px',
})

const Method = styled('img')({
    height: '35px',
    width: '35px',
})