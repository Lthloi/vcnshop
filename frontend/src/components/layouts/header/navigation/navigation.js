import React, { useEffect, useState } from "react"
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import foxLogoWhite from '../../../../assets/images/logo_app_white.svg'
import SearchIcon from '@mui/icons-material/Search'
import MenuBar from "./menu_bar"
import SearchDialog from "./search_dialog"
import { useSelector } from "react-redux"
import AccountButton from "./account_button"

const Navigation = () => {
    const numberOfCartItems = useSelector(({ cart }) => cart.cartItems.length)
    
    const [openSearchDialog, setOpenSearchDialog] = useState(false)

    useEffect(() => {
        if (openSearchDialog) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [openSearchDialog])

    const handleOpenSearchDialog = open => {
        setOpenSearchDialog(open)
    }

    return (
        <NavigationArea>

            {
                openSearchDialog &&
                <SearchDialog
                    handleOpenSearchDialog={handleOpenSearchDialog}
                />
            }

            <NavigationBar id="NavigationBar" >
                <LeftSection className="LeftSection" >
                    <Language>EN</Language>
                    <SearchContainer
                        id="SearchContainerNavigation"
                        onClick={() => handleOpenSearchDialog(true)}
                    >
                        <SearchIcon />
                        <SearchText>Enter Brands, Names...</SearchText>
                    </SearchContainer>
                </LeftSection>

                <CenterSection className="CenterSection" href="/">
                    <Logo src={foxLogoWhite} alt="Can't load logo" sx={{ fill: 'white' }} />
                    <TitleArea>
                        <Title>VCN SHOP - FOX COR</Title>
                        <Subtitle>Kingdom of fashion</Subtitle>
                    </TitleArea>
                </CenterSection>

                <RightSection className="RightSection" >
                    <span></span>
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                        <AccountButton />
                        
                        <a href="/cart">
                            <StyledBadge
                                badgeContent={numberOfCartItems}
                                color="default"
                                showZero
                            >
                                <StyledShoppingCartIcon titleAccess="Cart" />
                            </StyledBadge>
                        </a>
                    </div>
                </RightSection>
            </NavigationBar>

            <MenuBar />

        </NavigationArea>
    )
}

export default Navigation

const text_style = {
    color: 'white',
    fontFamily: 'nunito',
    fontSize: '1em',
    fontWeight: 'bold',
    textDecoration: 'unset',
}

const NavigationArea = styled('div')({
    width: '100%',
})

const NavigationBar = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 20px',
    backgroundColor: 'black',
})

const LeftSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    columnGap: '15px',
    minHeight: '100%',
})

const Language = styled('div')({
    ...text_style,
    cursor: 'pointer',
    '&:hover': {
        color: '#51fff6',
    },
})

const SearchContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    padding: '5px 8px',
    columnGap: '10px',
    cursor: 'pointer',
    border: '2px black solid',
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: 'white',
    '&:hover': {
        outline: '3px #51fff6 solid',
    }
})

const SearchText = styled('div')({
    fontSize: '0.9em',
    color: 'rgba(0,0,0,0.8)',
    fontFamily: '"Roboto", "sans-serif"',
})

const CenterSection = styled('a')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '5px',
    textDecoration: 'unset',
    color: 'black',
})

const TitleArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})

const Title = styled('h2')({
    ...text_style,
    margin: '0',
    lineHeight: '1em',
    fontSize: '1.3em',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: '"Roboto", "sans-serif"',
})

const Subtitle = styled('div')({
    ...text_style,
    wordSpacing: '3px',
    letterSpacing: '1px',
    cursor: 'pointer',
})

const Logo = styled('img')({
    height: '5em',
    cursor: 'pointer',
})

const RightSection = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '1',
})

const StyledBadge = styled(Badge)({
    marginRight: '10px',
    cursor: 'pointer',
    color: 'black',
    ' span.MuiBadge-anchorOriginTopRight': {
        backgroundColor: '#3FACB1'
    },
    '& svg': {
        transition: 'transform 0.2s',
    },
    '&:hover svg': {
        transform: 'scale(1.2)',
    },
})

const StyledShoppingCartIcon = styled(ShoppingCartIcon)({
    fill: 'white',
})