import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import Select from '@mui/material/Select'
import { getCodeList } from 'country-list'

const DropdownCountry = ({ setCountryValue, register, label, required }) => {

    const changePickCountry = (e) => {
        setCountryValue(e.target.value)
    }

    const countries = useMemo(() => getCodeList(), [])

    return (
        <FormGroup>
            <StyledSelect
                native
                onChange={changePickCountry}
                fullWidth
                {...register(label, { required })}
            >
                <option value=""></option>
                {
                    Object.keys(countries).map((key) => (
                        <option
                            key={key}
                            value={countries[key]}
                        >
                            {countries[key]}
                        </option>
                    ))
                }
            </StyledSelect>
        </FormGroup>
    )
}

export default DropdownCountry

const FormGroup = styled('div')({
    width: '100%',
})

const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: 'unset',
    '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'unset',
        }
    },
    '&.MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderRightWidth: '8px',
        borderColor: 'unset',
    },
    '& fieldset': {
        border: '1px black solid',
    },
    '& select': {
        display: 'block',
        padding: '10px 15px',
        '& option': {
            color: 'black',
        }
    },
    '& svg': {
        color: 'black',
        fontSize: '2em',
    }
}))