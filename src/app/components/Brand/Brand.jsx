import React from 'react'
import { MatxLogo } from 'app/components'
import { Span } from '../../components/Typography'
import { styled, Box } from '@mui/system'
import useSettings from 'app/hooks/useSettings'
import { Alert, Snackbar } from '@mui/material'
import Slide from '@mui/material/Slide'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { loadError } from 'app/redux/action'
import { CompInfo } from '../../../app/views/DB/CompanyInfo'

const BrandRoot = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 18px 20px 29px',
}))

const StyledSpan = styled(Span)(({ theme, mode }) => ({
    fontSize: 18,
    marginLeft: '.5rem',
    display: mode === 'compact' ? 'none' : 'block',
}))

const Brand = ({ children }) => {
    const errorData = useSelector((data) => data.focusReducer.Error)
    const dispatch = useDispatch()
    //
    const { settings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode } = leftSidebar

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide {...props} direction="right" />
    })

    return (
        <BrandRoot>
            <Box display="flex" alignItems="center">
                <MatxLogo />
                <StyledSpan mode={mode} className="sidenavHoverShow">
                    {CompInfo.ShortName}
                </StyledSpan>
            </Box>
            <Box
                className="sidenavHoverShow"
                sx={{ display: mode === 'compact' ? 'none' : 'block' }}
            >
                {children || null}
            </Box>
            <Snackbar
                open={errorData || undefined}
                autoHideDuration={3000}
                ContentProps={{
                    sx: {
                        background: '#323232',
                        color: '#ffffff',
                        fontWeight: 'normal',
                        maxWidth: 600,
                        paddingRight: 5,
                        fontSize: 13,
                    },
                }}
                TransitionComponent={Transition}
                message="Sorry, something went wrong there. Try again."
                action={
                    <React.Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{ p: 0.5 }}
                            onClick={() => dispatch(loadError(false))}
                        >
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </BrandRoot>
    )
}

export default Brand
