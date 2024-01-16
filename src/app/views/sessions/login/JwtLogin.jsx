import { useTheme } from '@emotion/react'
import { LoadingButton } from '@mui/lab'
import { Card, Checkbox, Grid, TextField } from '@mui/material'
import { Box, styled } from '@mui/material'
import useAuth from 'app/hooks/useAuth'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import logo_login from '../../../components/MatxLogo/logo_login.png'
import loginBG from '../../../components/MatxLogo/loginBG.jpg'
import moment from 'moment/moment'
import { authLogin } from 'app/redux/action'
import axios from 'axios'
import ip from '../../DB/IP_Address'
import { useDispatch } from 'react-redux'
import { Alert, Snackbar } from '@mui/material'

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }))

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }))

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.02)',
}))

const JWTRegister = styled(JustifyBox)(() => ({
    background: '#f2f2f2',
    backgroundImage: `url(${loginBG})`,
    backgroundRepeat: 'no-repeat',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}))

// inital login credentials
const initialValues = {
    cnic: '',
    password: '',
}

// form field validation schema
const validationSchema = Yup.object().shape({
    cnic: Yup.string().required('CNIC is required!').min(13).max(13),
    password: Yup.string()
        .min(6, 'Password must be 6 character length')
        .required('Password is required!'),
})

const JwtRegister = () => {
    //
    const { login } = useAuth()
    const dispatch = useDispatch()
    //
    const theme = useTheme()
    const { register } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: 'info@aqmsolutions.com.pk',
        password: 'dummyPass',
    })
    const [SnackOpen, setSnackOpen] = useState(false)

    const [SnackMessage, setSnackMessage] = useState({
        type: '',
        message: '',
    })

    const GETALL_DEG = (v) => {
        console.log(v)
        const value = {
            id: v.cnic.toString(),
            pin: v.password,
        }
        axios
            .post(ip.admission + 'ADM_Registration/Login_new/', value)
            .then((response) => {
                if (response.data === undefined || response.data.length == 0) {
                    setSnackMessage({
                        type: 'error',
                        message:
                            'Invalid Login. Please check your [ CNIC ] and [ Password ]',
                    })
                    setSnackOpen(true)
                    setLoading(false)
                } else {
                    const aData = response.data[0]
                    // CANDIDATE_NAME
                    setSnackMessage({
                        type: 'success',
                        message:
                            'Hi ' + aData.CANDIDATE_NAME + ' , Access granted.',
                    })
                    setSnackOpen(true)
                    setLoading(false)
                    //
                    const authData = aData
                    dispatch(authLogin(authData))
                    localStorage.setItem('authData', JSON.stringify(authData))
                    //
                    localStorage.setItem('loginType', 'Student')
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
                    setTimeout(() => {
                        AuthSuccess()
                    }, 1000)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const AuthSuccess = async (event) => {
        try {
            await login(userInfo.email, userInfo.password)
            navigate('/Admission/ADM_Dashboard')
        } catch (e) {
            console.log(e)
        }
    }

    const handleFormSubmit = (values) => {
        setLoading(true)

        try {
            // register(values.email, values.username, values.password)
            // navigate('/')
            // setLoading(false)
            GETALL_DEG(values)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    // useEffect(() => {
    //     const intervalID = setInterval(() => {
    //         setToggle((toggle) => !toggle)
    //     }, 1000)

    //     return () => clearInterval(intervalID)
    // }, [])

    return (
        <JWTRegister>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <ContentBox>
                            <div>
                                <div
                                    style={{
                                        flexDirection: 'block',
                                        textAlign: 'center',
                                    }}
                                >
                                    <img width="40%" src={logo_login} />
                                    <div>
                                        <div
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            ADMISSION PORTAL
                                        </div>
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                fontWeight: 500,
                                            }}
                                        >
                                            PUMHSW Admission Protal for DPT,{' '}
                                            <br />
                                            PHARM-D, BSPH, BS NURSING
                                        </div>
                                    </div>
                                </div>
                                <div style={{ paddingTop: '15%' }}></div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Admission Criteria:
                                    </div>
                                    <a
                                        style={{
                                            color: 'blue',
                                            fontSize: 12,
                                            textDecoration: 'underline',
                                        }}
                                        href="https://pumhs.edu.pk/files/adv-allied-depts-session-23-2024.pdf"
                                        target="_blank"
                                    >
                                        View Admission Criteria
                                    </a>
                                    <br />
                                    <a
                                        style={{
                                            color: 'blue',
                                            fontSize: 12,
                                            textDecoration: 'underline',
                                        }}
                                        href="https://pumhs.edu.pk/files/prospectus-allied-depts-23-2024.pdf"
                                        target="_blank"
                                    >
                                        View Prospectus
                                    </a>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            paddingTop: 10,
                                            paddingBottom: 5,
                                        }}
                                    >
                                        For any query Feel Free to Contact Us:
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                        }}
                                    >
                                        <b>Email us at:</b>{' '}
                                        <a
                                            style={{
                                                color: 'blue',
                                            }}
                                            href="mailto:admissions@pumhs.edu.pk?subject=Admission Query"
                                        >
                                            admissions@pumhs.edu.pk
                                        </a>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                        }}
                                    >
                                        <b>Call us at:</b>{' '}
                                        <a
                                            style={{
                                                color: 'blue',
                                            }}
                                            href="tel:+92-244-930507"
                                        >
                                            +92-244-930507
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </ContentBox>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <Box p={4} height="100%" style={{ paddingTop: 50 }}>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                }) => (
                                    <form
                                        onSubmit={handleSubmit}
                                        style={{
                                            alignItems: 'center',
                                            height: '100%',
                                            // paddingTop: '20%',
                                        }}
                                    >
                                        {/* <div
                                            style={{
                                                // textAlign: 'right',
                                                color: 'gray',
                                            }}
                                        >
                                            {moment().format(
                                                'DD/MM/YYYY hh:mm:ss'
                                            )}
                                        </div> */}
                                        <div
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                // textAlign: 'center',
                                                paddingBottom: 30,
                                                paddingTop: '15%',
                                            }}
                                        >
                                            Welcome back! Login to your account.
                                        </div>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="number"
                                            name="cnic"
                                            label="CNIC"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.cnic}
                                            onChange={handleChange}
                                            helperText={
                                                touched.cnic && errors.cnic
                                            }
                                            error={Boolean(
                                                errors.cnic && touched.cnic
                                            )}
                                            sx={{ mb: 3 }}
                                            onInput={(e) => {
                                                e.target.value = Math.max(
                                                    0,
                                                    parseInt(e.target.value)
                                                )
                                                    .toString()
                                                    .slice(0, 13)
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.password}
                                            onChange={handleChange}
                                            helperText={
                                                touched.password &&
                                                errors.password
                                            }
                                            error={Boolean(
                                                errors.password &&
                                                    touched.password
                                            )}
                                            sx={{ mb: 2 }}
                                        />

                                        <div
                                            style={{
                                                flexDirection: 'row',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <LoadingButton
                                                type="submit"
                                                color="primary"
                                                loading={loading}
                                                variant="contained"
                                                sx={{ mb: 2, mt: 1 }}
                                            >
                                                Login
                                            </LoadingButton>

                                            <div
                                                style={{
                                                    fontSize: 13,
                                                }}
                                            >
                                                <b>Dont't have an account?</b>
                                                <a
                                                    style={{
                                                        color: 'blue',
                                                    }}
                                                    href="tel:+92-244-930507"
                                                >
                                                    <NavLink
                                                        to="/session/signup"
                                                        style={{
                                                            color: theme.palette
                                                                .primary.main,
                                                            marginLeft: 5,
                                                        }}
                                                    >
                                                        Sign Up
                                                    </NavLink>
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            {/*  */}
            <Snackbar
                open={SnackOpen}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={() => setSnackOpen(false)}
            >
                <Alert
                    onClose={() => setSnackOpen(false)}
                    sx={{ width: '100%' }}
                    severity={SnackMessage.type}
                    variant="filled"
                >
                    {SnackMessage.message}
                </Alert>
            </Snackbar>
        </JWTRegister>
    )
}

export default JwtRegister
