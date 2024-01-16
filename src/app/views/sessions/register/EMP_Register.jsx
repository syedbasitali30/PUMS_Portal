import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import ip from '../../DB/IP_Address'
import warningImg from '../../../components/MatxLogo/warning.png'
import checkImg from '../../../components/MatxLogo/check.png'
import cancelImg from '../../../components/MatxLogo/cancel.png'
import {
    Alert,
    Autocomplete,
    Dialog,
    DialogContent,
    LinearProgress,
    Snackbar,
} from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
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

export default function SignUp() {
    //
    const navigate = useNavigate()

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
    //
    const [txtName, settxtName] = React.useState('')
    const [txtCnic, settxtCnic] = React.useState('')
    const [txtPwd, settxtPwd] = React.useState('')
    const [txtCell, settxtCell] = React.useState('')
    const [txtEmail, settxtEmail] = React.useState('')
    //
    const [loading, setloading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState({
        messageTitle: 'Alert!',
        message: 'Are you sure you want to continue?',
        image: warningImg,
        button: 'yes, continue',
    })

    //
    const handleSubmit = (event) => {
        setMessage({
            messageTitle: 'Alert!',
            message: 'Are you sure you want to continue?',
            image: warningImg,
            button: 'yes, continue',
        })
        setOpen(true)
    }

    const CHECK_STATUS = (value) => {
        const result = value[0]
        console.log(result)
        //
        setloading(false)
        if (result.MSG == 'SUCCESS') {
            setMessage({
                messageTitle: 'Success!',
                message: 'Everything went well, Congratulations!',
                image: checkImg,
                button: 'Go Ahead',
            })
            setOpen(true)
        } else if (result.MSG == '') {
            setMessage({
                messageTitle: 'Error!',
                message: 'Something went wrong, Please try again later',
                image: cancelImg,
                button: 'Try Again',
            })
            setOpen(true)
        } else {
            setMessage({
                messageTitle: 'Error!',
                message: result.MSG,
                image: cancelImg,
                button: 'Okay',
            })
            setOpen(true)
        }
    }

    const REGISTRATION = async (value) => {
        setOpen(false)
        setloading(true)
        return await fetch(
            ip.Address + 'erec.asmx/REC_SIGNUP',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    'name=' +
                    txtName +
                    '&cnic=' +
                    txtCnic +
                    '&pwd=' +
                    txtPwd +
                    '&cell=' +
                    txtCell +
                    '&email=' +
                    txtEmail,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                // console.log(response)
                CHECK_STATUS(response)
            })
            .catch((error) => {
                console.log(error)
                setloading(false)
            })
    }

    return (
        <ThemeProvider theme={theme}>
            {loading ? (
                <LinearProgress
                    style={{
                        position: 'fixed',
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        // backgroundColor: '#a7caed',
                    }}
                />
            ) : null}
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextValidator
                                        onChange={(event) => {
                                            settxtName(event.target.value)
                                        }}
                                        value={txtName || ''}
                                        required
                                        fullWidth
                                        autoFocus
                                        label="Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        onChange={(event) => {
                                            settxtEmail(event.target.value)
                                        }}
                                        value={txtEmail || ''}
                                        required
                                        fullWidth
                                        label="Email Address"
                                        type={'email'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextValidator
                                        onChange={(event) => {
                                            settxtCnic(event.target.value)
                                        }}
                                        value={txtCnic || ''}
                                        required
                                        fullWidth
                                        label="CNIC"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextValidator
                                        onChange={(event) => {
                                            settxtCell(event.target.value)
                                        }}
                                        value={txtCell || ''}
                                        required
                                        fullWidth
                                        label="Cell No"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        onChange={(event) => {
                                            settxtPwd(event.target.value)
                                        }}
                                        value={txtPwd || ''}
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                        />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <NavLink
                                        to="/session/Emp_signin"
                                        style={{
                                            color: theme.palette.primary.main,
                                            fontSize: 14,
                                        }}
                                    >
                                        Already have an account? Sign in
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />

                    {/*  */}
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
                                    variant="h5"
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
                                >
                                    <Button
                                        onClick={() => {
                                            if (
                                                message.messageTitle == 'Alert!'
                                            ) {
                                                REGISTRATION()
                                            }
                                            if (
                                                message.messageTitle ==
                                                'Success!'
                                            ) {
                                                navigate('/session/EMP_signin')
                                            } else {
                                                setOpen(false)
                                            }
                                        }}
                                        style={styles.model_button}
                                        color="primary"
                                    >
                                        {message.button}
                                    </Button>
                                </div>
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
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </Container>
            </ValidatorForm>
        </ThemeProvider>
    )
}
