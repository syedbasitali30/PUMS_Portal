import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import warningImg from '../../../components/MatxLogo/warning.png'
import cancelImg from '../../../components/MatxLogo/cancel.png'
import {
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogContent,
} from '@mui/material'
import ip from '../../DB/IP_Address'
import axios from 'axios'
import { authLogin, authLoginVendor } from 'app/redux/action'
import { useDispatch } from 'react-redux'
import useAuth from 'app/hooks/useAuth'
import { NavLink, useNavigate } from 'react-router-dom'
import { Paragraph } from 'app/components/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { CompInfo } from '../../DB/CompanyInfo'
import { capitalize } from 'lodash'

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <NavLink to="/session/Home">{CompInfo.ShortName}</NavLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme()

export default function SignInSide() {
    const styles = {
        model_button: {
            color: '#1976d2',
            borderWidth: 3,
            borderStyle: 'solid',
            width: '50%',
            borderRadius: 50,
            marginTop: 25,
            marginBottom: 10,
        },

        txtAttach: {
            fontSize: 12,
            fontWeight: 'bold',
            marginTop: -10,
            paddingBottom: 3,
            paddingLeft: 2,
            color: 'grey',
        },
    }
    const navigate = useNavigate()
    const { login } = useAuth()
    const dispatch = useDispatch()
    //
    const [userInfo, setUserInfo] = React.useState({
        email: 'info@aqmsolutions.com.pk',
        password: 'dummyPass',
    })
    const [txtlogin, settxtlogin] = React.useState('')
    const [txtpassword, settxtpassword] = React.useState('')
    const [loading, setloading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState({
        messageTitle: 'Error!',
        message:
            'Your login is not matching our records. Please check your email and password.',
        image: cancelImg,
        button: 'Okay',
    })
    //

    const CHECK_LOGIN = async (value) => {
        setloading(true)
        return await fetch(
            ip.Address + 'vpanel.asmx/VENDOR_LOGIN',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'id=' + txtlogin + '&pwd=' + txtpassword,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setloading(false)

                //
                const authData = response[0]
                //
                if (authData.MSG == 'SUCCESS') {
                    AuthSuccess()
                    dispatch(authLoginVendor(authData))
                    localStorage.setItem(
                        'authDataVendor',
                        JSON.stringify(authData)
                    )
                    //
                    localStorage.setItem('loginType', 'Vendor')
                    window.sessionStorage.setItem('checkLogin', 'Login')
                    // For Candidate Name
                    const arr = [authData.SupplierTitle, '']
                    localStorage.setItem('TopBarDetails', JSON.stringify(arr))
                } else if (authData.MSG == 'PENDING') {
                    setMessage({
                        messageTitle:
                            'Your Account is Currently Being Reviewed!',
                        message:
                            'We will notify you soon as your account is approved or if we need any additional information from you.',
                        image: warningImg,
                        button: 'yes, continue',
                    })
                    setOpen(true)
                } else {
                    setMessage({
                        messageTitle: 'Error!',
                        message:
                            'Your login is not matching our records. Please check your email and password.',
                        image: cancelImg,
                        button: 'Okay',
                    })
                    setOpen(true)
                }
            })
            .catch((error) => {
                console.log(error)
                setloading(false)
            })
    }

    const AuthSuccess = async (event) => {
        try {
            await login(userInfo.email, userInfo.password)
            navigate('/Vendor/Vendor_Dashboard')
        } catch (e) {
            console.log(e)
        }
    }
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
                            'url(https://www.jaggaer.com/app/uploads/2021/11/What-is-procurement.jpg)',
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Vendor Sign in
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                onChange={(event) => {
                                    settxtlogin(event.target.value)
                                }}
                                value={txtlogin}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address & Cell No"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={(event) => {
                                    settxtpassword(event.target.value)
                                }}
                                value={txtpassword}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => CHECK_LOGIN()}
                                loading={loading}
                                loadingIndicator="Loading…"
                            >
                                Sign In
                            </LoadingButton>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <NavLink
                                        to="/session/vendor_signup"
                                        style={{
                                            color: theme.palette.primary.main,
                                            marginLeft: 5,
                                            fontSize: 14,
                                        }}
                                    >
                                        Don't have an account? Sign Up
                                    </NavLink>
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
            <Dialog
                fullWidth
                maxWidth={'xs'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogContent>
                    <div>
                        <div
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                display: 'flex',
                                paddingTop: 30,
                                paddingBottom: 10,
                            }}
                        >
                            <img src={message.image} width="90px"></img>
                        </div>
                        <Typography
                            variant="h6"
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                paddingTop: 25,
                                paddingBottom: 10,
                            }}
                        >
                            {message.messageTitle}
                        </Typography>
                        <Typography
                            style={{
                                color: 'grey',
                                textAlign: 'center',
                                fontSize: 18,
                            }}
                        >
                            {message.message}
                        </Typography>
                        <div
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                        ></div>
                        <div
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                        >
                            <Button
                                onClick={() => setOpen(false)}
                                style={{
                                    color: '#1976d2',
                                    marginTop: 20,
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}

// https://source.unsplash.com/random
