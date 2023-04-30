import React, { useEffect, useMemo, useState } from "react"
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const RenderOptions = (items) => (
    <option
        value={items}
        key={items}
    >
        {items}
    </option>
)

const DateOfBirth = ({ required, dateOfBirthRef, dateOfBirthDefault }) => {
    const [dateOfBirth, setDateOfBirth] = useState(['00', '00', '0000']) //dd-mm-yyyy

    useEffect(() => {
        dateOfBirthRef.current = dateOfBirth.join('-')
    }, [dateOfBirth])

    const days = useMemo(() => {
        let values = []
        for (let i = 1; i < 32; i++) values.push(i)
        return values
    }, [])

    const months = useMemo(() => {
        let values = []
        for (let i = 1; i < 13; i++) values.push(i)
        return values
    }, [])

    const years = useMemo(() => {
        let values = []
        for (let i = 1990; i < 2022; i++) values.push(i)
        return values
    }, [])

    const handlePickDate = (e, label) => {
        let value = e.target.value
        value = value * 1 > 9 ? value : '0' + value
        if (label === 'Day') setDateOfBirth(pre => [value, pre[1], pre[2]])
        else if (label === 'Month') setDateOfBirth(pre => [pre[0], value, pre[2]])
        else if (label === 'Year') setDateOfBirth(pre => [pre[0], pre[1], value])
    }

    return (
        <DateOfBirthFormGroup id="DateOfBirthFormGroup">
            <Label>
                <span>Date Of Birth</span>
                {required && <span className="required">*</span>}
            </Label>
            <DateOfBirthInputs>
                {
                    ['Day', 'Month', 'Year'].map((label, index) => (
                        <FormControl
                            key={label}
                            sx={{ flex: '1', width: '25%' }}
                        >
                            <SelectLabel>{label}</SelectLabel>
                            <StyledSelect
                                autoWidth
                                defaultValue={dateOfBirthDefault && dateOfBirthDefault.split('-')[index] * 1}
                                inputProps={{ name: label }}
                                variant="outlined"
                                native
                                onChange={(e) => handlePickDate(e, label)}
                            >
                                <option value=""></option>
                                {label === 'Year' && years.map((label) => (RenderOptions(label)))}
                                {label === 'Month' && months.map((label) => (RenderOptions(label)))}
                                {label === 'Day' && days.map((label) => (RenderOptions(label)))}
                            </StyledSelect>
                        </FormControl>
                    ))
                }
            </DateOfBirthInputs>
        </DateOfBirthFormGroup>
    )
}

export default DateOfBirth

const DateOfBirthFormGroup = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    columnGap: '5px',
    padding: '5px',
    width: '100%',
    boxSizing: 'border-box',
})

const Label = styled('label')({
    display: 'flex',
    columnGap: '5px',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1.4em',
    fontWeight: 'bold',
    marginLeft: '5px',
    width: '55%',
    '& span.required': {
        color: 'red',
    },
})

const DateOfBirthInputs = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '15px',
    width: '100%',
})

const SelectLabel = styled('label')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.8em',
    color: 'grey',
    textAlign: 'center',
})

const StyledSelect = styled(Select)({
    borderRadius: 'unset',
    '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9000EC',
        }
    },
    '&.MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#9000EC',
    },
    '& fieldset': {
        border: '1.5px black solid',
    },
    '& select': {
        display: 'block',
        padding: '5px 10px',
        '& option': {
            color: 'black',
        }
    },
    '& svg': {
        color: 'black',
    }
})