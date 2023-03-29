import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { styled } from '@mui/material/styles'
import InformationInputs from "./Information_inputs"
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import "react-toastify/dist/ReactToastify.css"
import { toast } from 'react-toastify'

const ProvideInfoSection = () => {
    const [checkboxChecked, setCheckboxChecked] = useState(false)
    const [showWarningCheckbox, setShowWarning] = useState(false)
    const [shakeWarningCheckbox, setShakeWarning] = useState(false)
    const [submitChecking, setSubmitChecking] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const handleChangeCheckbox = (e) => {
        setCheckboxChecked(!checkboxChecked)
        if (e.target.checked) {
            setShowWarning(false)
        }
    }

    const checkProvideInfo = (data, e) => {
        if (!checkboxChecked) setShowWarning(true)
        setShakeWarning(true)
        if (!checkboxChecked) return
        setSubmitChecking(true)
        try {
            toast.success('Updated your profile!')
            e.target.submit()
        } catch (err) {
            toast.error('Something went wrong!')
        }
    }

    return (
        <ProvideInfoForm id="ProvideInfoSection" action="#" method="post"
            onSubmit={handleSubmit(checkProvideInfo)}
        >
            <Title>We need more information...</Title>
            <Desc>
                The information below may serve to improve user experience
                in the future, we assure you that the information you
                provide is completely confidential and will be protected
                in accordance with our privacy policy. Thank you!
            </Desc>

            <Divider sx={{ backgroundColor: '#999999', marginTop: '10px' }} />

            <InformationInputs register={register} reset={reset} errors={errors} />

            <Divider sx={{ backgroundColor: '#999999', marginTop: '10px', }} />

            <TermOfUseContainer>
                <Checkbox color="default" size="small"
                    sx={{
                        color: 'red',
                        width: '1em',
                        height: '1em',
                    }}
                    id="TermOfUseCheckbox"
                    onChange={handleChangeCheckbox}
                />
                <CheckboxLabel htmlFor="TermOfUseCheckbox">
                    Accept our terms of use.
                </CheckboxLabel>
                <span className="star_char">*</span>
            </TermOfUseContainer>
            {
                showWarningCheckbox &&
                <CheckboxWarning className={shakeWarningCheckbox ? 'shake_warning' : ''}
                    onAnimationEnd={() => setShakeWarning(false)}
                >
                    You must acccept our terms of use. Please!
                </CheckboxWarning>
            }

            <SubmitBtnContainer>
                {
                    submitChecking ?
                        <CircularProgress
                            sx={{ color: 'black' }}
                            size={20}
                            thickness={6}
                        />
                        : <span>Start Shopping</span>
                }
            </SubmitBtnContainer>
        </ProvideInfoForm>
    )
}

export default ProvideInfoSection

const ProvideInfoForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '45%',
    height: '100%',
    position: 'absolute',
    zIndex: '2',
    right: '0',
    padding: '30px 40px 20px',
    boxSizing: 'border-box',
    backgroundColor: '#1c1c1c',
    overflowY: 'auto',
})

const Title = styled('h2')({
    color: 'white',
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.5em',
    fontWeight: 'bold',
    paddingBottom: '8px',
    width: 'fit-content',
    position: 'relative',
    '&::after': {
        content: '""',
        height: '5px',
        width: '100%',
        backgroundColor: '#893bff',
        position: 'absolute',
        bottom: '0',
        left: '15px',
    }
})

const Desc = styled('p')({
    margin: '0',
    marginTop: '10px',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
})

const TermOfUseContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    '& span.star_char': {
        display: 'inline-block',
        color: 'red',
        fontFamily: '"Nunito", "sans-serif"',
        fontSize: '1.5em',
        height: '22px',
        marginLeft: '5px',
    }
})

const CheckboxLabel = styled('label')({
    marginLeft: '5px',
    marginTop: '1px',
    fontSize: '0.9em',
    fontFamily: '"Nunito", "sans-serif"',
    color: 'white',
    cursor: 'pointer',
})

const CheckboxWarning = styled('span')({
    display: 'block',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
    color: 'red',
    marginTop: '5px',
    '&.shake_warning': {
        animation: 'shake_warning 0.5s 1',
    },
    '@keyframes shake_warning': {
        '0%': { 'transform': 'translate(1px, 1px) rotate(0deg)' },
        '10%': { 'transform': 'translate(-1px, -2px) rotate(1deg)' },
        '20%': { 'transform': 'translate(-3px, 0px) rotate(-1deg)' },
        '30%': { 'transform': 'translate(3px, 2px) rotate(0deg)' },
        '40%': { 'transform': 'translate(1px, -1px) rotate(-1deg)' },
        '50%': { 'transform': 'translate(-1px, 2px) rotate(1deg)' },
        '60%': { 'transform': 'translate(-3px, 1px) rotate(0deg) ' },
        '70%': { 'transform': 'translate(3px, 1px) rotate(1deg)' },
        '80%': { 'transform': 'translate(-1px, -1px) rotate(-1deg)' },
        '90%': { 'transform': 'translate(1px, 2px) rotate(0deg)' },
        '100%': { 'transform': 'translate(1px, -2px) rotate(1deg)' },
    }
})

const SubmitBtnContainer = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    padding: '7px',
    fontSize: '1em',
    fontWeight: 'bold',
    fontFamily: '"Nunito", "sans-serif"',
    cursor: 'pointer',
    backgroundColor: 'white',
    border: 'unset',
    borderRadius: '3px',
    position: 'relative',
})