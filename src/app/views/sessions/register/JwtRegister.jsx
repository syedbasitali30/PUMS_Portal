import { useTheme } from '@emotion/react'
import { LoadingButton } from '@mui/lab'
import Button from '@mui/material/Button'
import {
    Card,
    Checkbox,
    Grid,
    TextField,
    Dialog,
    DialogContent,
    Alert,
    Snackbar,
} from '@mui/material'
import { Box, styled } from '@mui/material'
import useAuth from 'app/hooks/useAuth'
import { Formik } from 'formik'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import logo_login from '../../../components/MatxLogo/logo_login.png'
import loginBG from '../../../components/MatxLogo/loginBG.jpg'
import warningImg from '../../../components/MatxLogo/warning.png'
import checkImg from '../../../components/MatxLogo/check.png'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import ip from '../../DB/IP_Address'

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

// inital login credentials
const initialValues = {
    username: '',
    cnic: '',
    mobile: '',
    email: '',
    password: '',
    ConfirmPass: '',
}

// form field validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be 6 character length')
        .required('Password is required!'),
    username: Yup.string().required('username is required!'),
    email: Yup.string()
        .email('Invalid Email address')
        .required('Email is required!'),
    cnic: Yup.string().required('CNIC is required!').min(13).max(13),
    mobile: Yup.string().required('mobile is required!').min(10).max(10),
    ConfirmPass: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Pass is required!'),
})

const JwtRegister = () => {
    const theme = useTheme()
    const { register } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState({
        messageTitle: 'Ready to Countinue?',
        message:
            'Please review your information. Is everything correct? If so, click Continue to complete your registration.',
        image: warningImg,
        button: 'Yes, Continue',
    })
    const [SnackOpen, setSnackOpen] = useState(false)

    const [SnackMessage, setSnackMessage] = useState({
        type: '',
        message: '',
    })

    const [DataToSend, setDataToSend] = useState([])

    const GETALL_DEG = () => {
        const values = DataToSend
        axios
            .get(ip.admission + 'ADM_Registration/chkUser/' + values.cnic)
            .then((response) => {
                console.log(response)
                if (response.data == 'Record not Found') {
                    POSTDATA({
                        CANDIDATE_NAME: values.username,
                        CNIC: values.cnic,
                        CONTACT: values.mobile,
                        EMAIL: values.email,
                        PASSWORD: values.password,
                    })
                    setLoading(false)
                } else {
                    setSnackMessage({
                        type: 'error',
                        message:
                            'CNIC already registered. Please login to continue',
                    })
                    setSnackOpen(true)
                    setOpen(false)
                    setLoading(false)
                }
            })
            .catch(function (error) {
                console.log(error)
                setLoading(false)
            })
    }

    const POSTDATA = (value) => {
        axios
            .post(ip.admission + 'ADM_Registration/post/', value)
            .then((res) => {
                setSnackMessage({
                    type: 'success',
                    message: 'Registration successful! Head over to login now.',
                })
                setSnackOpen(true)
                setOpen(false)
                setLoading(false)
                setTimeout(() => {
                    navigate('/session/signin')
                }, 2000)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    //

    const handleFormSubmit = (values) => {
        setLoading(true)
        try {
            // register(values.email, values.username, values.password)
            // navigate('/')
            // setLoading(false)
            setOpen(true)
            setDataToSend(values)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

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
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="text"
                                            name={'username'}
                                            label="Username"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.username}
                                            onChange={handleChange}
                                            error={Boolean(
                                                errors.username &&
                                                    touched.username
                                            )}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="number"
                                            name="cnic"
                                            label="13-Digit CNIC (without dashes)"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.cnic}
                                            onChange={handleChange}
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
                                            name="mobile"
                                            type="number"
                                            label="10-Digit Mobile #"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.mobile}
                                            onChange={handleChange}
                                            error={Boolean(
                                                errors.mobile && touched.mobile
                                            )}
                                            sx={{ mb: 3 }}
                                            onInput={(e) => {
                                                e.target.value = Math.max(
                                                    0,
                                                    parseInt(e.target.value)
                                                )
                                                    .toString()
                                                    .slice(0, 10)
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="email"
                                            type="email"
                                            label="Email"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.email}
                                            onChange={handleChange}
                                            error={Boolean(
                                                errors.email && touched.email
                                            )}
                                            sx={{ mb: 3 }}
                                        />
                                        <Grid container spacing={2}>
                                            <Grid item sm={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    name="password"
                                                    type="password"
                                                    label="Password (6+ characters)"
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    error={Boolean(
                                                        errors.password &&
                                                            touched.password
                                                    )}
                                                    sx={{ mb: 2 }}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    name="ConfirmPass"
                                                    type="password"
                                                    label="Confirm Password"
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    value={values.ConfirmPass}
                                                    onChange={handleChange}
                                                    error={Boolean(
                                                        errors.ConfirmPass &&
                                                            touched.ConfirmPass
                                                    )}
                                                    sx={{ mb: 2 }}
                                                />
                                            </Grid>
                                        </Grid>

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
                                                Regiser
                                            </LoadingButton>

                                            <div
                                                style={{
                                                    fontSize: 13,
                                                }}
                                            >
                                                <b>Already have an account?</b>
                                                <a
                                                    style={{
                                                        color: 'blue',
                                                    }}
                                                    href="tel:+92-244-930507"
                                                >
                                                    <NavLink
                                                        to="/session/signin"
                                                        style={{
                                                            color: theme.palette
                                                                .primary.main,
                                                            marginLeft: 5,
                                                        }}
                                                    >
                                                        Login
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
            {/*  */}
            <Dialog
                fullWidth
                maxWidth={'xs'}
                open={open}
                onClose={() => {
                    setOpen(false)
                    setLoading(false)
                }}
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
                                    GETALL_DEG()
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
