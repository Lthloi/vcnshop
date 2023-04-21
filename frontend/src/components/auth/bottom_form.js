import React from "react"
import { styled } from '@mui/material/styles'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

const socials = [
    {
        name: 'Facebook',
        icon: () => <FacebookIcon sx={{ color: 'white', }} />,
        background_color: '#1877F2',
    }, {
        name: 'Twitter',
        icon: () => <TwitterIcon sx={{ color: 'white', }} />,
        background_color: '#1DA1F2',
    }, {
        name: 'Instagram',
        icon: () => <InstagramIcon sx={{ color: 'white', }} />,
        background_color: '#E4405F',
    },
]

const BottomForm = () => {
    return (
        <BottomFormArea id="BottomFormArea">
            <UsingSocialAccount>
                <SocialAccountTitle>
                    OR USING YOUR SOCIAL ACCOUNTS
                </SocialAccountTitle>
                <SocialsContainer>
                    {
                        socials.map((items) => (
                            <Socials
                                sx={{ backgroundColor: items.background_color }}
                                key={items.name}
                            >
                                <>
                                    {items.icon()}
                                </>
                                <Name>
                                    {items.name}
                                </Name>
                            </Socials>
                        ))
                    }
                </SocialsContainer>
            </UsingSocialAccount>
        </BottomFormArea>
    )
}

export default BottomForm

const BottomFormArea = styled('div')({
    marginTop: '15px',
})

const UsingSocialAccount = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
})

const SocialAccountTitle = styled('p')({
    color: 'white',
    margin: '0',
    fontSize: '0.9em',
    fontFamily: '"Nunito","sans-serif"',
})

const SocialsContainer = styled('div')({
    display: 'flex',
    width: '100%',
    marginTop: '3px',
})

const Socials = styled('div')({
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0px',
    cursor: 'pointer',
})

const Name = styled('div')({
    marginLeft: '10px',
    color: 'white',
    fontFamily: '"Nunito","sans-serif"',
})