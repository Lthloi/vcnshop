import React from "react"
import { styled } from '@mui/material/styles'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import { useNavigate } from 'react-router-dom'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import PaymentIcon from '@mui/icons-material/Payment'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Box, StepConnector, Stack, Typography } from "@mui/material"
import { stepConnectorClasses } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTheme } from "@emotion/react"

const icon_style = { fontSize: '2em', color: 'white' }

const steps = [
    {
        label: 'Shipping Info',
        icon: <LocalShippingIcon sx={icon_style} />,
    }, {
        label: 'Confirm Order',
        icon: <LibraryAddCheckIcon sx={icon_style} />,
    }, {
        label: 'Payment',
        icon: <PaymentIcon sx={icon_style} />,
    }
]

const RenderStepIcon = ({ active, completed, error, icon, className }, icon_component) => {
    return (
        <StepIconWrapper theme={{ active, completed, error }}>
            {icon_component}
        </StepIconWrapper>
    )
}

const Navigation = () => {
    const navigate = useNavigate()
    const theme = useTheme()

    return (
        <Stack
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            padding="15px"
            position="relative"
        >
            <Stack
                flexDirection="row"
                alignItems="center"
                height="100%"
                position="absolute"
                top="0"
                left="0"
                paddingLeft="15px"
            >
                <Wrapper onClick={() => navigate(-1)}>
                    <Box
                        display="flex"
                        alignItems="center"
                        style={{ cursor: 'pointer' }}
                    >
                        <GoBackIcon />
                        <Typography
                            fontSize="1.5em"
                            sx={{ transform: 'scaleX(0.9)' }}
                            fontFamily={theme.fontFamily.kanit}
                        >
                            BACK
                        </Typography>
                    </Box>
                </Wrapper>
            </Stack>

            <Typography
                fontFamily={theme.fontFamily.kanit}
                fontSize="2.5em"
                fontWeight="bold"
                letterSpacing="3px"
            >
                CHECKOUT
            </Typography>
        </Stack>
    )
}

const CheckoutStep = ({ activeStep }) => {
    return (
        <Box
            margin="30px 0"
        >
            <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<ColorlibConnector />}
            >
                {
                    steps.map(({ label, icon }) => (
                        <Step key={label}>
                            <StyledStepLabel StepIconComponent={(state) => RenderStepIcon(state, icon)}>
                                <CheckoutStepIcon
                                    className="completed_icon"
                                    sx={{}}
                                />
                                <span title={label}>{label}</span>
                            </StyledStepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </Box>
    )
}

const Hr = () => (
    <Box
        height="1px"
        width="100%"
        bgcolor="#dddddd"
        margin="0 auto"
    />
)

const Header = ({ activeStep }) => {

    return (
        <div id="HeaderSection">
            {
                activeStep < 3 &&
                <>
                    <Navigation />

                    <Hr />
                </>
            }

            <CheckoutStep activeStep={activeStep} />

            <Hr />
        </div>
    )
}

export default Header

const Wrapper = styled('div')({
    position: 'relative',
    '&::after': {
        content: '""',
        height: '3px',
        width: '0',
        backgroundColor: 'black',
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
})

const CheckoutStepIcon = styled(CheckCircleIcon)({
    display: 'none',
    marginRight: '5px',
    fontSize: '1.2em',
})

const state_color = {
    non_active: '#bbbbbb',
    active: 'black',
    completed: '#00805e',
    error: 'red',
}

const ColorlibConnector = styled(StepConnector)({
    display: 'flex',
    justifyContent: 'center',
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: '25px',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: state_color.active,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: state_color.completed,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: '5px',
        width: '90%',
        border: 'unset',
        backgroundColor: state_color.non_active,
    },
})

const StepIconWrapper = styled('div')(({ theme }) => ({
    padding: '12px 12px 7px',
    borderRadius: '50%',
    backgroundColor: (theme.completed && state_color.completed) || (theme.active && state_color.active) || state_color.non_active,
}))

const StyledStepLabel = styled(StepLabel)({
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
        marginTop: '10px',
        color: state_color.non_active,
        '&.Mui-completed': {
            color: state_color.completed,
            '& .completed_icon': {
                display: 'initial',
            }
        },
        '&.Mui-active': {
            color: state_color.active,
        },
    },
})