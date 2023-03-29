import React from "react"
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CancelIcon from '@mui/icons-material/Cancel'

const embed_link_terms_of_use_html =
    "https://htmlpreview.github.io/?https://github.com/codevcnn/Storage/blob/main/terms_of_use_vcn_shop_ecommerce.html"

const TermsOfUse = ({ openDialog, handleOpenDialog }) => {

    return (
        <TermsOfUseDialog
            open={openDialog}
            onClose={() => handleOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
        >
            <StyledDialogTitle id="alert-dialog-title">
                Terms Of Use - VCN Shop
            </StyledDialogTitle>
            <StyledDialogContent>
                <TermsOfUseSection src={embed_link_terms_of_use_html}
                    height="95%" width="100%"
                    data="https://codevcnn.github.io/Storage/terms_of_use_vcn_shop_ecommerce.html"
                    type="text/html"
                >
                </TermsOfUseSection>
            </StyledDialogContent>
            <StyledDialogActions>
                <CloseIcon onClick={() => handleOpenDialog(false)} />
            </StyledDialogActions>
        </TermsOfUseDialog>
    )
}

export default TermsOfUse

const TermsOfUseDialog = styled(Dialog)({
    '& .MuiPaper-root.MuiDialog-paper': {
        boxSizing: 'border-box',
        padding: '15px 25px 0px',
        height: '80vh',
        width: '70vw',
        backgroundColor: '#00bcb8',
        border: '2px white solid',
        position: 'relative',
        overflowY: 'unset',
    }
})

const StyledDialogTitle = styled(DialogTitle)({
    padding: '3px 10px',
    borderRadius: '5px',
    border: '2px white solid',
    fontWeight: 'bold',
    fontSize: '1.3em',
    marginBottom: '10px',
    backgroundColor: '#2c2c2c',
    color: 'white',
    textAlign: 'center',
})

const StyledDialogContent = styled(DialogContent)({
    padding: '0',
    overflowY: 'auto',
    overflowX: 'hidden',
})

const TermsOfUseSection = styled('object')({
    border: '2px white solid',
    boxSizing: 'border-box',
})

const StyledDialogActions = styled(DialogActions)({
    padding: '0',
    position: 'absolute',
    right: '-50px',
    top: '-30px',
})

const CloseIcon = styled(CancelIcon)({
    width: '1.8em',
    height: '1.8em',
    color: 'white',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.2)',
    }
})