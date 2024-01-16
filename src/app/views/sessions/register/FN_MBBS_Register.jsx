import { useTheme } from '@emotion/react'
import { LoadingButton } from '@mui/lab'
import { Card, Checkbox, Grid, TextField } from '@mui/material'
import { Box, styled } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import useAuth from 'app/hooks/useAuth'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import PersonIcon from '@mui/icons-material/Person'
import Payment from '@mui/icons-material/Payment'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PasswordIcon from '@mui/icons-material/Password'
import InputMask from 'react-input-mask'
import axios from 'axios'
import { Alert, Button, Snackbar } from '@mui/material'
import Divider from '@mui/material/Divider'
import React from 'react'
import companyLogo from '../../../components/MatxLogo/university-logo-transparent.png'
// import bgimg from '../../../components/MatxLogo/2592039.jpg'
import ip from '../../DB/IP_Address'
import { CompInfo } from '../../DB/CompanyInfo'

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }))

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }))

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const JWTRegister = styled(JustifyBox)(() => ({
    // background: '#1A2038',
    // backgroundImage: `url(${bgimg})`,
    backgroundImage:
        'url(https://github.com/syedbasitali30/images/blob/main/adm_bg.jpg?raw=true)',
    minHeight: '100% !important',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '& .card': {
        width: '65%',
        borderRadius: 12,
        margin: '1rem',
    },
}))

// inital login credentials
const initialValues = {
    email: '',
    password: '',
    confirmPass: '',
    username: '',
    cnic: '',
    mobile: '',
    remember: true,
}

const IMG = styled('img')(() => ({
    width: '100%',
}))

const H1 = styled('h1')(({ theme }) => ({
    // margin: 0,
    // flexGrow: 1,
    color: theme.palette.text.secondary,
}))
// form field validation schema
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Name is required!'),
    mobile: Yup.string().required('Mobile # is required!'),
    cnic: Yup.string().required('CNIC is required!'),
    password: Yup.string()
        .min(4, 'Pin must be 4 character length')
        .required('Password is required!'),

    confirmPass: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Pass is required!'),
    email: Yup.string()
        .email('Invalid Email address')
        .required('Email is required!'),
})

const JwtRegister = () => {
    const [open, setOpen] = React.useState(false)
    const [infoData, setinfoData] = React.useState({
        REGISTRATION: '',
        MESSAGE_REGISTER: false,
    })

    useEffect(() => {
        axios
            .get(ip.admission + 'UniAdmission/getAll')
            .then((response) => {
                // setinfoData(response.data[0])
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    const GETALL_DEG = (values) => {
        axios
            .get(ip.admission + 'MBBS_ADM_Registration/chkUser/' + values.cnic)
            .then((response) => {
                console.log(response)
                if (response.data == 'Record not Found') {
                    // alert(response.data)
                    POSTDATA({
                        CANDIDATE_NAME: values.username,
                        CNIC: values.cnic,
                        CONTACT: values.mobile,
                        EMAIL: values.email,
                        PASSWORD: values.password,
                    })
                    setLoading(false)
                } else {
                    setOpen(true)
                    setLoading(false)
                }
            })
            .catch(function (error) {
                console.log(error)
                setLoading(false)
            })
    }
    //
    const POSTDATA = (value) => {
        axios
            .post(ip.admission + 'MBBS_ADM_Registration/post/', value)
            .then((res) => {
                navigate('/session/fnmbbs_signin')
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    //
    const theme = useTheme()
    const { register } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [OpenError, setOpenError] = React.useState(false)
    const [messageError, setmessageError] = React.useState('')

    const handleFormSubmit = (values) => {
        setLoading(true)
        try {
            GETALL_DEG(values)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const isAllDigits = (e, fiels) => {
        // Regular expression that matches any sequence of digits
        const regex = /^\d+$/

        // Check if the phone number matches the regex
        const result = regex.test(e.target.value)
        //
        if (!result) {
            // setmessageError('[ ' + fiels + ' ] must filled with all digits.')
            // setOpenError(true)
            alert('[ ' + fiels + ' ] must filled with all digits.')
        }
    }
    const Banner = 'https://www.airforshare.com/files/YIDrwr.png'
    return (
        <JWTRegister
        // style={{
        //     // backgroundImage: `url(${Banner})`,
        //     // backgroundPosition: 'center',
        //     // backgroundSize: 'cover',
        //     // backgroundRepeat: 'no-repeat',
        // }}
        >
            <Card className="card">
                <Grid container>
                    {/* <Grid item sm={6} xs={12}>
                        <ContentBox>
                            <img src="/assets/images/illustrations/Group_112.png" width="100%" alt="" />
                        </ContentBox>
                    </Grid> */}
                    {/* <Grid item sm={6} xs={12}>
                        <JustifyBox p={4} >
                            <IMG width='100px'
                                //src="/assets/images/illustrations/dreamer.svg"
                                style={{ width: 300, height: 300, marginTop: 50 }}

                                src={companyLogo}
                                //src={SignInImage}
                                alt=""
                            />
                        </JustifyBox>
                    </Grid> */}

                    <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        style={{ backgroundColor: '#325774' }}
                    >
                        <JustifyBox p={4} height="100px">
                            {/* <IMG width='100px'
                                //src="/assets/images/illustrations/dreamer.svg"

                                src={process.env.PUBLIC_URL + sessilogo} 
                                //src={SignInImage}
                                alt=""
                            />
                             */}
                            <img src={CompInfo.CompanyLogo} width="90px"></img>
                            <H1
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bolder',
                                    color: 'white',
                                    paddingLeft: 20,
                                }}
                            >
                                {CompInfo.FullName} (Foreign National MBBS)
                            </H1>
                        </JustifyBox>
                        <Divider></Divider>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box p={4} height="100%">
                            {/*  */}
                            {infoData.MESSAGE_REGISTER ? (
                                <Alert
                                    style={{
                                        marginTop: -10,
                                        backgroundColor: '#ff7369',
                                    }}
                                    variant="filled"
                                    severity="warning"
                                >
                                    The admissions is closed - So the new
                                    account can not be created at this time!
                                </Alert>
                            ) : null}

                            <Formik
                                width="100%"
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
                                        <Grid container spacing={4}>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                                sx={{ mt: 0 }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    type="text"
                                                    name="username"
                                                    label="Name"
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    helperText={
                                                        touched.username &&
                                                        errors.username
                                                    }
                                                    error={Boolean(
                                                        errors.username &&
                                                            touched.username
                                                    )}
                                                    sx={{ mb: 3 }}
                                                    //
                                                    InputProps={{
                                                        endAdornment: (
                                                            <PersonIcon
                                                                color="disabled"
                                                                fontSize="small"
                                                            />
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                                sx={{ mt: 0 }}
                                            >
                                                <InputMask
                                                    mask="9999999999999"
                                                    value={values.cnic}
                                                    onChange={handleChange}
                                                    onBlur={(e) =>
                                                        isAllDigits(e, 'CNIC')
                                                    }
                                                >
                                                    {() => (
                                                        <TextField
                                                            // value={values.cnic} onChange={handleChange}
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="cnic"
                                                            label="CNIC"
                                                            variant="outlined"
                                                            helperText={
                                                                touched.cnic &&
                                                                errors.cnic
                                                            }
                                                            error={Boolean(
                                                                errors.cnic &&
                                                                    touched.cnic
                                                            )}
                                                            sx={{ mb: 3 }}
                                                            //
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <Payment
                                                                        color="disabled"
                                                                        fontSize="small"
                                                                    />
                                                                ),
                                                            }}
                                                        />
                                                    )}
                                                </InputMask>
                                            </Grid>
                                        </Grid>

                                        {/* <Grid container spacing={4}>
                                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                                
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                              
                                            </Grid>
                                        </Grid> */}

                                        <Grid container spacing={4}>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                                sx={{ mt: 0 }}
                                            >
                                                <InputMask
                                                    mask="99999999999"
                                                    value={values.mobile}
                                                    onChange={handleChange}
                                                    onBlur={(e) =>
                                                        isAllDigits(
                                                            e,
                                                            'Mobile No'
                                                        )
                                                    }
                                                >
                                                    {() => (
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            name="mobile"
                                                            label="Mobile"
                                                            variant="outlined"
                                                            // onBlur={handleBlur}
                                                            // value={values.mobile}
                                                            // onChange={handleChange}
                                                            helperText={
                                                                touched.mobile &&
                                                                errors.mobile
                                                            }
                                                            error={Boolean(
                                                                errors.mobile &&
                                                                    touched.mobile
                                                            )}
                                                            sx={{ mb: 3 }}
                                                            //
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <SmartphoneIcon
                                                                        color="disabled"
                                                                        fontSize="small"
                                                                    />
                                                                ),
                                                            }}
                                                        />
                                                    )}
                                                </InputMask>
                                            </Grid>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                                sx={{ mt: 0 }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    type="email"
                                                    name="email"
                                                    label="Email"
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    helperText={
                                                        touched.email &&
                                                        errors.email
                                                    }
                                                    error={Boolean(
                                                        errors.email &&
                                                            touched.email
                                                    )}
                                                    sx={{ mb: 3 }}
                                                    //
                                                    InputProps={{
                                                        endAdornment: (
                                                            <AlternateEmailIcon
                                                                color="disabled"
                                                                fontSize="small"
                                                            />
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={4}>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                                sx={{ mt: 0 }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    length
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
                                                    //
                                                    InputProps={{
                                                        endAdornment: (
                                                            <PasswordIcon
                                                                color="disabled"
                                                                fontSize="small"
                                                            />
                                                        ),
                                                    }}
                                                    inputProps={{
                                                        maxLength: 11,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                                sx={{ mt: 0 }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    length
                                                    size="small"
                                                    name="confirmPass"
                                                    type="password"
                                                    label="Confirm Pass"
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    value={values.confirmPass}
                                                    onChange={handleChange}
                                                    helperText={
                                                        touched.confirmPass &&
                                                        errors.confirmPass
                                                    }
                                                    error={Boolean(
                                                        errors.confirmPass &&
                                                            touched.confirmPass
                                                    )}
                                                    sx={{ mb: 2 }}
                                                    //
                                                    InputProps={{
                                                        endAdornment: (
                                                            <PasswordIcon
                                                                color="disabled"
                                                                fontSize="small"
                                                            />
                                                        ),
                                                    }}
                                                    inputProps={{
                                                        maxLength: 11,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        <FlexBox gap={1} alignItems="center">
                                            <Checkbox
                                                size="small"
                                                name="remember"
                                                onChange={handleChange}
                                                checked={values.remember}
                                                sx={{ padding: 0 }}
                                            />

                                            <Paragraph fontSize={13}>
                                                I have read and agree to the
                                                terms of service.
                                            </Paragraph>
                                        </FlexBox>

                                        <LoadingButton
                                            type="submit"
                                            color="success"
                                            loading={loading}
                                            variant="contained"
                                            sx={{ mb: 2, mt: 3 }}
                                            disabled={
                                                infoData.REGISTRATION ===
                                                'CLOSED'
                                                    ? true
                                                    : false
                                            }
                                        >
                                            Create Account
                                        </LoadingButton>

                                        <Paragraph>
                                            Already have an account?
                                            <NavLink
                                                to="/session/fnmbbs_signin"
                                                style={{
                                                    color: theme.palette.primary
                                                        .main,
                                                    marginLeft: 5,
                                                }}
                                            >
                                                Login
                                            </NavLink>
                                        </Paragraph>
                                    </form>
                                )}
                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            <Snackbar open={open} autoHideDuration={3000}>
                <Alert
                    severity="warning"
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    Alert !.. CNIC already exist in our records
                </Alert>
            </Snackbar>

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
        </JWTRegister>
    )
}

export default JwtRegister
