import React, { memo } from "react"
import { styled } from '@mui/material/styles'
import ErrorIcon from '@mui/icons-material/Error'
import { createShop } from "../../store/actions/shop_actions"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress } from "@mui/material"

const max_fields_length = {
    StoreName: 50,
    Greeting: 500,
    Phone: 15,
}

const field_labels = {
    StoreName: 'Store Name',
    Greeting: 'Greeting',
    Phone: 'Phone Number',
}

const min_field_length = 3

const RegisterStore = () => {
    const { createShopProccessing } = useSelector(({ shop }) => shop)
    const { register, formState: { errors }, handleSubmit, setError } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const checkAndSubmit = (data, e) => {
        e.preventDefault()

        if (data[field_labels.Phone] && data[field_labels.Phone][0] !== '+')
            return setError(field_labels.Phone, 'pattern')

        dispatch(createShop(
            data[field_labels.StoreName],
            data[field_labels.Greeting],
            data[field_labels.Phone],
        ))
    }

    const RenderField = (label, is_multiline, error, min_length, max_length, helper_text) => {
        let error_text

        if (error) {
            if (error.type === 'required')
                error_text = 'Please don\'t empty this field'
            else if (error.type === 'maxLength' || error.type === 'minLength')
                error_text = `The store name must be between ${min_length} and ${max_length} characters`
            else if (error.type === 'pattern')
                error_text = 'Please check format of the content you typed'
        }

        error = !!error

        return (
            <StyledTextField
                inputProps={{
                    ...register(label, {
                        maxLength: max_length,
                        minLength: min_length,
                        required: true,
                    }),
                    maxLength: max_length,
                }}
                rows={4}
                label={label}
                fullWidth
                helperText={error ? error_text : helper_text}
                error={error}
                multiline={is_multiline}
                color="success"
            />
        )
    }
    return (
        <RegisterSection
            onSubmit={handleSubmit(checkAndSubmit)}
            action=""
        >
            <Note>
                <ErrorIcon sx={{ fontSize: '1.2em', color: 'gray' }} />
                <span>
                    This part is only for users with a store account. And since you don't have any store account, let's create one
                </span>
            </Note>
            <RegisterTitle>Register</RegisterTitle>
            <div style={{ padding: '0 30px' }}>
                {RenderField(
                    field_labels.StoreName,
                    false,
                    errors[field_labels.StoreName],
                    min_field_length,
                    max_fields_length.StoreName,
                    "Please enter your store name"
                )}
                {RenderField(
                    field_labels.Greeting,
                    true,
                    errors[field_labels.Greeting],
                    min_field_length,
                    max_fields_length.Greeting,
                    "Please enter your greeting, greet your customer when they visit your store"
                )}
                {RenderField(
                    field_labels.Phone,
                    false,
                    errors[field_labels.Phone],
                    min_field_length,
                    max_fields_length.Phone,
                    "Add the phone number of you store, the customers'll use this one to contact to the vender. Example: +84123456789"
                )}
            </div>
            <SubmitBtnContainer>
                {
                    createShopProccessing ?
                        <NavBtn type="button" sx={{ pointerEvents: 'none' }}>
                            <CircularProgress
                                sx={{ color: 'white' }}
                                size={20}
                                thickness={6}
                            />
                        </NavBtn>
                        :
                        <>
                            <NavBtn type="button" onClick={() => navigate(-1)}>
                                Cancel
                            </NavBtn>
                            <NavBtn type="submit">
                                <CheckCircleOutlineIcon />
                                <span>Submit</span>
                            </NavBtn>
                        </>
                }
            </SubmitBtnContainer>
        </RegisterSection>
    )
}

export default memo(RegisterStore)

const RegisterSection = styled('form')({
    padding: '20px',
})

const RegisterTitle = styled('h2')({
    color: 'white',
    width: '100%',
    padding: '10px',
    textAlign: 'center',
    boxSizing: 'border-box',
    backgroundColor: 'black',
    borderRadius: '5px',
    margin: '20px 0',
})

const Note = styled('p')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    fontSize: '0.8em',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 30px',
    margin: '0',
})

const StyledTextField = styled(TextField)({
    marginTop: '20px',
})

const SubmitBtnContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    columnGap: '30px',
    width: '100%',
    marginTop: '30px',
})

const NavBtn = styled('button')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    fontSize: '1.2em',
    borderRadius: '5px',
    padding: '10px 30px',
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: '2px black solid',
    '&:hover': {
        color: 'black',
        backgroundColor: 'white',
    },
    '&:active': {
        color: 'white',
        backgroundColor: 'black',
    }
})