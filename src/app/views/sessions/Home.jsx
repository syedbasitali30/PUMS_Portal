import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import companyLogo from '../../components/MatxLogo/university-logo-transparent.png'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { useNavigate } from 'react-router-dom'
import { CompInfo } from '../DB/CompanyInfo'

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link href="https://pumhs.edu.pk/" target="_blank">
                {CompInfo.ShortName}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme()

export default function SignInSide() {
    const navigate = useNavigate()
    //
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=600)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light'
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src={CompInfo.CompanyLogo} width="150px"></img>
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                        <Typography
                            component="h1"
                            variant="h5"
                            style={{ textAlign: 'center', marginTop: 20 }}
                        >
                            {CompInfo.FullName}
                        </Typography>
                        <i
                            style={{
                                marginTop: 20,
                                marginBottom: 20,
                                fontSize: 14,
                                textAlign: 'center',
                                color: 'grey',
                            }}
                        >
                            {CompInfo.Message}
                        </i>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <Grid container>
                                <Grid item>
                                    <PopupState
                                        variant="popover"
                                        popupId="demo-popup-menu"
                                    >
                                        {(popupState) => (
                                            <React.Fragment>
                                                <Button
                                                    style={{
                                                        paddingRight: 20,
                                                        paddingLeft: 20,
                                                    }}
                                                    variant="contained"
                                                    onClick={() => {
                                                        popupState.close()
                                                        navigate(
                                                            '/session/tech-signin' // =============== CHANGE MAON PAGE HERE tech-
                                                        )
                                                    }}
                                                >
                                                    login
                                                </Button>
                                            </React.Fragment>
                                        )}
                                    </PopupState>
                                </Grid>
                                <div style={{ marginRight: 30 }}></div>
                                <Grid item>
                                    <PopupState
                                        variant="popover"
                                        popupId="demo-popup-menu"
                                    >
                                        {(popupState) => (
                                            <React.Fragment>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        popupState.close()
                                                        navigate(
                                                            '/session/tech-signup' // =============== CHANGE MAON PAGE HERE tech-
                                                        )
                                                    }}
                                                >
                                                    sign up
                                                </Button>
                                            </React.Fragment>
                                        )}
                                    </PopupState>
                                </Grid>
                            </Grid>
                        </Box>
                        <i style={{ marginTop: 40 }}>
                            University Management System (UMS)
                        </i>
                        <Copyright sx={{ mt: 1 }} />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}
