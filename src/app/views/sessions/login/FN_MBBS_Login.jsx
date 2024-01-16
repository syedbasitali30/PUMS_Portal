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
import { Grid, Button, Checkbox, FormControlLabel } from '@mui/material'
import ip from '../../DB/IP_Address'
import axios from 'axios'
import { authLoginFN_MBBS } from 'app/redux/action'
import { useDispatch } from 'react-redux'
import useAuth from 'app/hooks/useAuth'
import { NavLink, useNavigate } from 'react-router-dom'
import { CompInfo } from '../../DB/CompanyInfo'
import InputMask from 'react-input-mask'
import { Alert, Snackbar } from '@mui/material'

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link href="http://121.52.155.34/pums_portal/#/session/Home">
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
    const { login } = useAuth()
    const dispatch = useDispatch()
    //
    const [userInfo, setUserInfo] = React.useState({
        email: 'info@aqmsolutions.com.pk',
        password: 'dummyPass',
    })
    const [txtlogin, settxtlogin] = React.useState('')
    const [txtpassword, settxtpassword] = React.useState('')

    const [OpenError, setOpenError] = React.useState(false)
    const [messageError, setmessageError] = React.useState('')
    //
    const isAllDigits = (e, fiels) => {
        // Regular expression that matches any sequence of digits
        const regex = /^\d+$/

        // Check if the phone number matches the regex
        return regex.test(e)
    }
    //
    const GETALL_DEG = () => {
        if (isAllDigits(txtlogin)) {
        } else {
            // alert('Invalid CNIC')
            setmessageError('Please enter valid [ CNIC ]')
            setOpenError(true)
            return false
        }
        const value = {
            id: txtlogin,
            pin: txtpassword,
        }
        axios
            .post(ip.admission + 'MBBS_ADM_Registration/Login_new/', value)
            .then((response) => {
                // console.log(response.data)
                // return false
                if (response.data === undefined || response.data.length == 0) {
                    // alert('Invalid User')
                    setmessageError(
                        'Invalid User [ Check your CNIC & Password ]'
                    )
                    setOpenError(true)
                } else {
                    AuthSuccess()
                    const aData = response.data[0]
                    const authData = aData
                    // console.log(authData)
                    dispatch(authLoginFN_MBBS(authData))
                    localStorage.setItem(
                        'authDataFN_MBBS',
                        JSON.stringify(authData)
                    )
                    //
                    localStorage.setItem('loginType', 'FN_MBBS_Student')
                    window.sessionStorage.setItem('checkLogin', 'Login')
                    // For Candidate Name
                    const arr = [
                        authData.CANDIDATE_NAME,
                        ip.admission +
                            'uploads/ADM_Profile/' +
                            authData.CNIC +
                            '.jpg',
                    ]
                    localStorage.setItem('TopBarDetails', JSON.stringify(arr))
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const AuthSuccess = async (event) => {
        try {
            await login(userInfo.email, userInfo.password)
            navigate('/MBBS_Admission/MBBS_Home')
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
                    md={6}
                    sx={{
                        backgroundImage:
                            'url(https://media.istockphoto.com/id/1060184852/photo/admissions-office-sign.jpg?s=612x612&w=0&k=20&c=bS78sKlO1-B6wy523nzX9Ep4k4FaCgTJ4J6nRbgdCBA=)',
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
                    md={6}
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
                        <img src={CompInfo.CompanyLogo} width="90px"></img>
                        <Typography component="h1" variant="h5">
                            ADMISSION PORTAL
                        </Typography>
                        <div style={{ textAlign: 'center' }}>
                            PUMHSW Admission Portal for <br /> Foreign National
                            MBBS
                        </div>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            {/* <TextField
                                onChange={(event) => {
                                    settxtlogin(event.target.value)
                                }}
                                value={txtlogin}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="CNIC"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            /> */}
                            <InputMask
                                mask="9999999999999"
                                value={txtlogin}
                                onChange={(event) => {
                                    settxtlogin(event.target.value)
                                }}
                            >
                                {() => (
                                    <TextField
                                        // onChange={(event) => {
                                        //     settxtlogin(event.target.value)
                                        // }}
                                        // value={txtlogin}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Enter CNIC"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                )}
                            </InputMask>
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => GETALL_DEG()}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    {/* <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link> */}
                                    <NavLink
                                        to="/session/FN_MBBS_Register"
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

            <Snackbar
                open={OpenError}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={() => setOpenError(false)}
            >
                <Alert
                    onClose={() => setOpenError(false)}
                    sx={{ width: '100%' }}
                    severity={'error'}
                    variant="filled"
                >
                    {messageError}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    )
}

// https://source.unsplash.com/random
