import { Box, styled } from '@mui/system'
import { Autocomplete, Button } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

export const AutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

export const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

export const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

export const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))
