import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import footer_background_image from '../../../assets/images/footer_background_image.jpg'
import logo from '../../../assets/images/logo_app.svg'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import MailIcon from '@mui/icons-material/Mail'
import TelegramIcon from '@mui/icons-material/Telegram'
import TermsOfUse from "../../terms_of_use"
import PaymentMethods from './payment_methods'

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
            { desc: 'Terms of use', action: true },
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

const Footer = () => {
    const [openTermsOfUse, setTermsOfUse] = useState(false)

    const handleOpenTermsOfUse = (open) => {
        setTermsOfUse(open)
    }

    const handleActions = (desc, action) => {
        if (!action) return
        if (desc === 'Terms of use')
            handleOpenTermsOfUse(true)
    }

    return (
        <>
            <FooterArea id="FooterArea">

                <TermsOfUse
                    openDialog={openTermsOfUse}
                    handleOpenDialog={handleOpenTermsOfUse}
                />

                <SocialsContainer id="SocialsContainer">
                    <SocialText>
                        Contact us on social networks!
                    </SocialText>
                    <Socials>
                        <FacebookIcon sx={social_icon_style} titleAccess="Facebook" />
                        <YouTubeIcon sx={social_icon_style} titleAccess="Youtube" />
                        <InstagramIcon sx={social_icon_style} titleAccess="Instagram" />
                        <TwitterIcon sx={social_icon_style} titleAccess="Twitter" />
                        <LinkedInIcon sx={social_icon_style} titleAccess="LinkedIn" />
                    </Socials>
                </SocialsContainer>
                <InformationsArea id="InformationsArea">
                    <Modalbase id="Modalbase" />
                    <InformationsContainer>
                        <LogoContainer id="LogoContainer">
                            <LogoWrapper>
                                <LogoImg src={logo} />
                                <LogoTextContainer>
                                    <LogoName>
                                        VCN Shop | Fox COR
                                    </LogoName>
                                    <SmallText>
                                        Shopping anywhere
                                    </SmallText>
                                    <SmallText>
                                        Shopping too easy
                                    </SmallText>
                                </LogoTextContainer>
                            </LogoWrapper>
                            <LogoDescription>
                                <div>
                                    VCN Shop is an online clothing store and a branch in
                                    Dong Nai of the international e-commerce group Fox COR
                                    based in HCM City.
                                </div>
                                <div>
                                    Thank for VCN VLy distribution center of goods and services.
                                </div>
                            </LogoDescription>
                        </LogoContainer>
                        {
                            information.map(({ type, content }) => (
                                <Infos key={type} className="Infos">
                                    <InfoTitle>
                                        {type}
                                    </InfoTitle>
                                    {
                                        content.map(({ icon, desc, action }) => (
                                            <Content key={desc}>
                                                {
                                                    icon &&
                                                    <InfoIconWrapper>
                                                        {icon}
                                                    </InfoIconWrapper>
                                                }
                                                <Desc
                                                    sx={action ? desc_hover_style : {}}
                                                    onClick={() => handleActions(desc, action)}
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

                    <PaymentMethods />

                </InformationsArea>
            </FooterArea>

            <LicenseBar id="LicenseBar">
                <Text>
                    &copy; 2022 Fox Operator Corporation Relational E-commerce
                </Text>
                <Website>
                    Website: https://www.vcnshop.new
                </Website>
            </LicenseBar>
        </>
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
    backgroundColor: '#9000ec',
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
    borderBottom: '3px #9000ec solid',
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

const Desc = styled('div')(({ theme, action }) => ({
    color: 'white',
    fontFamily: '"Nunito", "sans-serif"',
}))

const LicenseBar = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccbcb',
    padding: '3px',
})

const Text = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.8em',
})

const Website = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.8em',
    marginLeft: '65px',
})
