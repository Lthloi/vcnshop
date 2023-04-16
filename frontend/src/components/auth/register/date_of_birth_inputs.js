import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const RenderOptions = (items) => (
    <option value={items} key={items}>
        {items}
    </option>
)

const DateOfBirth = () => {

    const days = useMemo(() => {
        let values = []
        for (let i = 1; i < 32; i++) {
            values.push(i)
        }
        return values
    }, [])

    const months = useMemo(() => {
        let values = []
        for (let i = 1; i < 13; i++) {
            values.push(i)
        }
        return values
    }, [])

    const years = useMemo(() => {
        let values = []
        for (let i = 1990; i < 2022; i++) {
            values.push(i)
        }
        return values
    }, [])

    return (
        <DateOfBirthContainer id="DateOfBirthContainer">
            <DateOfBirthLabel htmlFor="DatePicker">
                Date Of Birth
            </DateOfBirthLabel>
            <DateOfBirthInputs>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    columnGap: '15px',
                }}
                >
                    {
                        ['Day', 'Month', 'Year'].map((items) => (
                            <FormControl key={items} sx={{ flex: '1', }}>
                                <SelectLabel htmlFor={items}>
                                    {items}
                                </SelectLabel>
                                <StyledSelect className="Select Date Of Birth"
                                    defaultValue=""
                                    inputProps={{
                                        name: items,
                                    }}
                                    variant="outlined"
                                    native id={items}
                                >
                                    <option value=""></option>
                                    {
                                        items === 'Year' ?
                                            years.map((items) => (
                                                RenderOptions(items)
                                            ))
                                            : items === 'Month' ?
                                                months.map((items) => (
                                                    RenderOptions(items)
                                                ))
                                                :
                                                days.map((items) => (
                                                    RenderOptions(items)
                                                ))
                                    }
                                </StyledSelect>
                            </FormControl>
                        ))
                    }
                </div>
                <HelperText>
                    You should be 16 or over to be member.
                </HelperText>
            </DateOfBirthInputs>
        </DateOfBirthContainer>
    )
}

export default DateOfBirth

const DateOfBirthContainer = styled('div')({
    marginTop: '20px',
})

const DateOfBirthLabel = styled('label')({
    display: 'block',
    width: 'fit-content',
    color: 'white',
    margin: '0px 5px 3px',
    fontWeight: 'bold',
    fontFamily: 'arial',
})

const DateOfBirthInputs = styled('div')({
    
})

const SelectLabel = styled('label')({
    fontFamily: 'nunito',
    fontSize: '0.8em',
    color: 'grey',
    textAlign: 'center',
})

const StyledSelect = styled(Select)({
    borderRadius: 'unset',
    '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00faff',
        }
    },
    '&.MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'red',
    },
    '& fieldset': {
        border: '1.5px #00faff solid',
    },
    '& select': {
        display: 'block',
        padding: '5px 10px',
        color: 'white',
        '& option': {
            color: 'black',
        }
    },
    '& svg': {
        color: 'white',
    }
})

const HelperText = styled('div')({
    color: 'white',
    fontSize: '0.8em',
    fontStyle: 'italic',
    fontFamily: 'nunito',
    marginTop: '5px',
    marginLeft: '3px',
})