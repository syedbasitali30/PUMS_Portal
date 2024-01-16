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
import { useDispatch } from 'react-redux'
import useAuth from 'app/hooks/useAuth'
import { NavLink, useNavigate } from 'react-router-dom'
import { authLogin, authLoginEmp } from 'app/redux/action'
import LoadingButton from '@mui/lab/LoadingButton'
import { CompInfo } from '../../DB/CompanyInfo'

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
    //
    const CHECK_LOGIN = async (value) => {
        setloading(true)
        return await fetch(
            ip.Address + 'erec.asmx/REC_LOGIN',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'cnic=' + txtlogin + '&pwd=' + txtpassword,
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
                    dispatch(authLoginEmp(authData))
                    localStorage.setItem(
                        'authDataEmp',
                        JSON.stringify(authData)
                    )
                    //
                    localStorage.setItem('loginType', 'Employee')
                    window.sessionStorage.setItem('checkLogin', 'Login')
                    // For Candidate Name
                    const arr = [authData.NAME, authData.PROFILE_PIC1]
                    localStorage.setItem('TopBarDetails', JSON.stringify(arr))
                } else {
                    alert('Invalid User')
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
            navigate('/Admission/Emp_Dashboard')
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
                            'url(https://media.istockphoto.com/id/611292146/photo/office-building.jpg?s=612x612&w=0&k=20&c=UYk8fhCZ_RBJn6KY88fg3bZ7xrueg14ZkCpTI5Rb23M=)',
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
                            Employee Sign in
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
                                label="Enter CNIC"
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
                            {/* <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => CHECK_LOGIN()}
                            >
                                Sign In
                            </Button> */}
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
                                        to="/session/EMP_signup"
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
        </ThemeProvider>
    )
}

// https://source.unsplash.com/random
