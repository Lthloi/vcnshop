import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import WarningIcon from '@mui/icons-material/Warning'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'

const problems = [
    { option: 'Not receive OTP message' },
    { option: 'OTP code is not exist in message' },
    { option: 'Can\'t send OTP' },
    { option: 'Not receive recover password code in my email' },
    { option: 'Not receive recover password code in my phone number' },
]

const ProblemSection = ({ open, handleOpen }) => {
    const [problemValue, setProblemValue] = useState('')
    const [openDescibeProblem, setOpenDescibeProblem] = useState(false)
    const [submitReportInProgress, setSubmitReportInProgress] = useState(false)

    const pickProblem = event => {
        setProblemValue(event.target.value)
    }

    const submitReport = (e) => {
        try {
            e.preventDefault()
            setSubmitReportInProgress(true)
            setTimeout(() => {
                setSubmitReportInProgress(false)
                handleOpen(false)
                toast.success('The report was submitted. Thanks for your help!')
            }, 1000)
        } catch (err) {
            toast.error('Can\'t submit the report. Please try again in minutes later!')
        }
    }

    const ShowDescribeProblemSection = event => {
        if (event.target.checked)
            setOpenDescibeProblem(true)
        else setOpenDescibeProblem(false)
    }

    return (
        <>
            <StyledDialog
                open={open}
                id="Problems Dialog"
                onClose={() => handleOpen(false)}
            >
                <DialogTitle sx={{ padding: 0, margin: 0, fontSize: '1.5em', }}>
                    Report problems.
                </DialogTitle>
                <DialogContentText sx={{ marginTop: '5px', fontStyle: 'italic', }}>
                    <span>
                        - Pick a problem in dropdown list or tick on "Other problem"
                        tickbox and describe the problem.
                    </span>
                    <br />
                    <span>
                        - Clearly describe the problem you're having.
                        We will try to fix it as soon as possible. Thanks!
                    </span>
                </DialogContentText>
                <DialogForm action="#" method="post" id="Report_Form"
                    onSubmit={submitReport}
                >
                    <DialogContent sx={{ padding: 0, margin: 0, }}>
                        <FormControl fullWidth>
                            <InputLabel id="problems-list-label">
                                Pick a problem you're having...
                            </InputLabel>
                            <Select
                                disabled={openDescibeProblem}
                                defaultOpen={!openDescibeProblem}
                                labelId="problems-list-label"
                                value={problemValue}
                                label="Pick a problem you're having..."
                                onChange={pickProblem}
                                autoWidth
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    <i>None</i>
                                </MenuItem>
                                {
                                    problems.map(({ option }) => (
                                        <MenuItem value={option} key={option}>
                                            <WarningIcon />&nbsp;<span>{option}</span>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <OtherProblemBtnWrapper>
                            <FormControlLabel label="Other problem"
                                control={
                                    <Checkbox color="default" sx={{ color: '#b73333' }}
                                        checked={openDescibeProblem}
                                    />
                                }
                                onChange={ShowDescribeProblemSection}
                            />
                        </OtherProblemBtnWrapper>
                        {
                            openDescibeProblem &&
                            <DescibeProblem id="other-problem" variant="outlined"
                                label="Describe the problem here..." multiline required
                            />
                        }
                    </DialogContent>
                    <CssDialogActions sx={{ padding: 0, margin: 0, marginTop: '10px', }} >
                        <SubmitReportBtn
                            type="button"
                            sx={{ marginRight: '10px', }}
                            onClick={() => handleOpen(false)}
                        >
                            Cancel
                        </SubmitReportBtn>
                        <SubmitReportBtn>
                            {
                                submitReportInProgress ?
                                    <CircularProgress sx={{ color: 'black', }}
                                        size={18} thickness={6}
                                    />
                                    : 'Submit'
                            }
                        </SubmitReportBtn>
                    </CssDialogActions>
                </DialogForm>
            </StyledDialog>
        </>
    )
}

export default ProblemSection

const StyledDialog = styled(Dialog)({
    '& .MuiPaper-root': {
        backgroundColor: '#ff9393',
        margin: 0,
        position: 'absolute',
        top: 50,
        padding: '15px 20px',
        overflowY: 'unset',
        border: '3px white solid',
    },
    '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper': {
        backgroundColor: 'black',
        '& li': {
            color: 'white',
        }
    }
})

const DialogForm = styled('form')({
    marginTop: '20px',
    '& .MuiDialogContent-root': {
        overflowY: 'unset',
        '& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
            color: 'black',
        }
    },
    '& fieldset': {
        border: '2px pink solid',
    },
    '& .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '2px black solid',
    },
    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
        display: 'flex',
    }
})

const DescibeProblem = styled(TextField)({
    marginTop: '5px',
    width: '100%',

    '& textarea#other-problem:focus ~ fieldset': {
        borderLeftWidth: 6,
        borderColor: 'red',
    },
    '& label': {
        marginLeft: '3px',
    }
})

const CssDialogActions = styled(DialogActions)({
    '& button': {
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: 'pink',
        }
    }
})

const OtherProblemBtnWrapper = styled('div')({
    paddingLeft: '10px',
})

const SubmitReportBtn = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: '1.1em',
    fontWeight: 'bold',
    padding: '5px 10px',
    borderRadius: '10px',
    border: 'unset',
    backgroundColor: 'transparent',
    cursor: 'pointer',
})