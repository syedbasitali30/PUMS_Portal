import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import companyLogo from '../../../components/MatxLogo/university-logo-transparent.png'
import warningImg from '../../../components/MatxLogo/warning.png'
import checkImg from '../../../components/MatxLogo/check.png'
import cancelImg from '../../../components/MatxLogo/cancel.png'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import ip from '../../DB/IP_Address'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    Alert,
    Autocomplete,
    Dialog,
    DialogContent,
    LinearProgress,
    Snackbar,
} from '@mui/material'
import Resizer from 'react-image-file-resizer'
import moment from 'moment'
import LoadingButton from '@mui/lab/LoadingButton'
import { Country } from 'country-state-city'
import { CompInfo } from '../../DB/CompanyInfo'

function Copyright(props) {
    return (
        <Typography
            style={{ fontWeight: 'bold', color: 'black' }}
            variant="body2"
            color="text.secondary"
            align="center"
            paddingBottom={2}
            {...props}
        >
            {'Copyright © '}
            <Link
                style={{ textTransform: 'uppercase', color: 'blue' }}
                href="#"
            >
                {CompInfo.FullName}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            <Typography style={{ fontSize: 12, color: 'grey' }}>
                {CompInfo.Address}
            </Typography>
        </Typography>
    )
}
const theme = createTheme()

export default function SignUp() {
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

    const [loading, setloading] = React.useState(false)
    const [state, setState] = React.useState({})
    const [LegalTypeList, setLegalTypeList] = React.useState([])
    const [RegTypeList, setRegTypeList] = React.useState([])
    const [DistrictList, setDistrictList] = React.useState([])
    const [CountryList, setCountryList] = React.useState([])
    //
    const [open, setOpen] = React.useState(false)
    const [openSnack, setOpenSnack] = React.useState(false)
    const [message, setMessage] = React.useState({
        messageTitle: 'Alert!',
        message: 'Are you sure you want to continue?',
        image: warningImg,
        button: 'yes, continue',
    })

    //
    const handleSubmit = (event) => {
        if (Pass == RePass) {
            setMessage({
                messageTitle: 'Alert!',
                message: 'Are you sure you want to continue?',
                image: warningImg,
                button: 'yes, continue',
            })
            setOpen(true)
        } else {
            setOpenSnack(true)
        }
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    React.useEffect(() => {
        GETALL_LEGAL_TYPE()
        GETALL_REGISTRATION_TYPE()
        GETALL_DISTRICT()
        //
        setState({
            ...state,
            RegistrationDate: moment(new Date()).format('YYYY-MM-DD'),
        })
        //
        setCountryList(Country.getAllCountries())
    }, [])

    const compressImageFunction = (event, stateName) => {
        try {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'PNG',
                50,
                0,
                (uri) => {
                    // console.log(uri)
                    var strImage = uri.replace(
                        /^data:image\/[a-z]+;base64,/,
                        ''
                    )
                    setState({
                        ...state,
                        [stateName]: strImage,
                    })
                },
                'base64',
                200,
                200
            )
        } catch (err) {
            console.log(err)
        }
    }

    const {
        BussinessName,
        LegalType,
        RegType,
        NTN,
        NTN_Attach,
        STRN,
        STRN_Attach,
        Landline,
        Mobile,
        Year,
        txtCountry,
        Address,
        CNIC,
        CNIC_Attach,
        sts,
        stsImage,
        District,
        RegistrationDate,
        Email,
        Pass,
        RePass,
    } = state

    // console.log(state)

    const CHECK_STATUS = (value) => {
        const result = value[0]
        // console.log(result)
        //
        setloading(false)
        if (result.MSG == 'SUCCESS') {
            setMessage({
                // messageTitle: 'Success!',
                // message: 'Everything went well, Congratulations!',
                // image: checkImg,
                // button: 'Go Ahead',
                messageTitle: 'Thank You For Registration!',
                message:
                    'We will review your registration soon and notify you by email once your account has been approved.',
                image: checkImg,
                button: 'Got it!',
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
            ip.Address + 'vpanel.asmx/VENDOR_SIGNUP',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    'businessName=' +
                    BussinessName +
                    '&cellno=' +
                    Landline +
                    '&email=' +
                    Email +
                    '&password=' +
                    Pass +
                    '&RegistrationType=' +
                    RegType +
                    '&LegalType=' +
                    LegalType +
                    '&cnic=' +
                    CNIC +
                    '&cnicImage=' +
                    CNIC_Attach +
                    '&ntn=' +
                    NTN +
                    '&ntnImage=' +
                    NTN_Attach +
                    '&strn=' +
                    STRN +
                    '&strnImage=' +
                    STRN_Attach +
                    '&sts=' +
                    sts +
                    '&stsImage=' +
                    stsImage +
                    '&phone=' +
                    Mobile +
                    '&country=' +
                    txtCountry.name +
                    '&districtID=' +
                    District +
                    '&address=' +
                    Address +
                    '&RegistrationDate=' +
                    moment(RegistrationDate).format('MM/DD/YYYY'),
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

    const GETALL_LEGAL_TYPE = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_PRC_LEGAL_TYPE_GET',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'compID=0',
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setLegalTypeList(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const GETALL_REGISTRATION_TYPE = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_REGISTRATION_TYPE',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'compID=0',
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setRegTypeList(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const GETALL_DISTRICT = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_DISTRICT',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'compID=0',
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setDistrictList(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div
            style={{
                // backgroundColor: '#f9fafc',
                //
                backgroundImage:
                    'url(https://github.com/syedbasitali30/images/blob/main/proc_bg.jpg?raw=true)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light'
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
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

            <ThemeProvider theme={theme}>
                <div>
                    <Typography
                        variant="h6"
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingTop: 25,
                            paddingBottom: 25,
                        }}
                    >
                        {CompInfo.FullName}
                    </Typography>
                </div>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Container component="main">
                        <CssBaseline />
                        <Box
                            sx={{
                                borderRadius: 2,
                                paddingTop: 2,
                                paddingBottom: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                boxShadow: '1px 2px 9px #c5c6c8',
                                pl: 5,
                                pr: 5,
                            }}
                        >
                            <img src={CompInfo.CompanyLogo} width="100px"></img>
                            <Typography component="h1" variant="h5">
                                Vendor Registration Form
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <Typography
                                    style={{
                                        fontWeight: 'bold',
                                        paddingBottom: 10,
                                    }}
                                >
                                    Business Details
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <TextValidator
                                            size="small"
                                            name="BussinessName"
                                            required
                                            fullWidth
                                            label="Business Legal Name"
                                            autoFocus
                                            onChange={handleChange}
                                            value={BussinessName || ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Autocomplete
                                            options={LegalTypeList}
                                            getOptionLabel={(option) =>
                                                option.LegalTypeTitle
                                            }
                                            filterSelectedOptions
                                            onChange={(event, value) => {
                                                setState({
                                                    ...state,
                                                    LegalType:
                                                        value.LegalTypeID,
                                                })
                                            }}
                                            renderInput={(params) => (
                                                <TextValidator
                                                    {...params}
                                                    variant="outlined"
                                                    label="Business Legal Type"
                                                    fullWidth
                                                    size="small"
                                                    required
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Autocomplete
                                            options={RegTypeList}
                                            getOptionLabel={(option) =>
                                                option.RegistrationTypeTitle
                                            }
                                            filterSelectedOptions
                                            onChange={(event, value) => {
                                                setState({
                                                    ...state,
                                                    RegType:
                                                        value.RegistrationTypeID,
                                                })
                                            }}
                                            renderInput={(params) => (
                                                <TextValidator
                                                    {...params}
                                                    variant="outlined"
                                                    label="Registration Type"
                                                    fullWidth
                                                    size="small"
                                                    required
                                                />
                                            )}
                                        />
                                    </Grid>
                                    {/*  */} <Grid item xs={12}></Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="Registration Date"
                                            name="RegistrationDate"
                                            onChange={handleChange}
                                            value={RegistrationDate || ''}
                                            type="date"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="Cell No"
                                            name="Landline"
                                            onChange={handleChange}
                                            value={Landline || ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="Mobile No"
                                            name="Mobile"
                                            onChange={handleChange}
                                            value={Mobile || ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="Years in Business"
                                            name="Year"
                                            onChange={handleChange}
                                            value={Year || ''}
                                        />
                                    </Grid>
                                    {/*  */} <Grid item xs={12}></Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Autocomplete
                                            options={DistrictList}
                                            getOptionLabel={(option) =>
                                                option.DistrictTitle
                                            }
                                            filterSelectedOptions
                                            onChange={(event, value) => {
                                                setState({
                                                    ...state,
                                                    District: value.DistrictID,
                                                })
                                            }}
                                            renderInput={(params) => (
                                                <TextValidator
                                                    {...params}
                                                    variant="outlined"
                                                    label="District"
                                                    fullWidth
                                                    size="small"
                                                    required
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        {/* <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="txtCountry"
                                            name="Country"
                                            onChange={handleChange}
                                            value={txtCountry || ''}
                                        /> */}
                                        <Autocomplete
                                            value={txtCountry}
                                            options={CountryList}
                                            getOptionLabel={(option) =>
                                                option.name
                                            }
                                            filterSelectedOptions
                                            onChange={(event, value) => {
                                                setState({
                                                    ...state,
                                                    txtCountry: value,
                                                })
                                            }}
                                            renderInput={(params) => (
                                                <TextValidator
                                                    {...params}
                                                    variant="outlined"
                                                    label="Country"
                                                    fullWidth
                                                    size="small"
                                                    required
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="Address"
                                            name="Address"
                                            onChange={handleChange}
                                            value={Address || ''}
                                        />
                                    </Grid>
                                    {/*  */} <Grid item xs={12}></Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="NTN"
                                            name="NTN"
                                            onChange={handleChange}
                                            value={NTN || ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="STRN"
                                            name="STRN"
                                            onChange={handleChange}
                                            value={STRN || ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="CNIC"
                                            name="CNIC"
                                            onChange={handleChange}
                                            value={CNIC || ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="STS"
                                            name="sts"
                                            onChange={handleChange}
                                            value={sts || ''}
                                        />
                                    </Grid>
                                    {/*  */} <Grid item xs={12}></Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            style={{
                                                fontWeight: 'bold',
                                                marginTop: -10,
                                            }}
                                        >
                                            Attatchments
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Typography style={styles.txtAttach}>
                                            NTN Attatchment
                                        </Typography>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            name="NTN_Attach"
                                            onChange={(e) =>
                                                compressImageFunction(
                                                    e,
                                                    'NTN_Attach'
                                                )
                                            }
                                            type="file"
                                            accept="image/*"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Typography style={styles.txtAttach}>
                                            STRN Attatchment
                                        </Typography>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            name="STRN_Attach"
                                            onChange={(e) =>
                                                compressImageFunction(
                                                    e,
                                                    'STRN_Attach'
                                                )
                                            }
                                            type="file"
                                            accept="image/*"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Typography style={styles.txtAttach}>
                                            CNIC Attatchment
                                        </Typography>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            name="CNIC_Attach"
                                            onChange={(e) =>
                                                compressImageFunction(
                                                    e,
                                                    'CNIC_Attach'
                                                )
                                            }
                                            type="file"
                                            accept="image/*"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Typography style={styles.txtAttach}>
                                            STS Attatchment
                                        </Typography>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            name="stsImage"
                                            onChange={(e) =>
                                                compressImageFunction(
                                                    e,
                                                    'stsImage'
                                                )
                                            }
                                            type="file"
                                            accept="image/*"
                                        />
                                    </Grid>
                                    {/*  */}
                                    {/*  */} <Grid item xs={12}></Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            style={{
                                                fontWeight: 'bold',
                                                marginTop: -10,
                                            }}
                                        >
                                            Login Details
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="Email"
                                            name="Email"
                                            onChange={handleChange}
                                            value={Email || ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="Password"
                                            name="Pass"
                                            onChange={handleChange}
                                            value={Pass || ''}
                                            type="password"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextValidator
                                            size="small"
                                            required
                                            fullWidth
                                            label="Re-Password"
                                            name="RePass"
                                            onChange={handleChange}
                                            value={RePass || ''}
                                            type="password"
                                        />
                                    </Grid>
                                    {/*  */}
                                </Grid>

                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        {/* <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            register
                                        </Button> */}
                                        <LoadingButton
                                            type="submit"
                                            loading={loading}
                                            loadingIndicator="Loading…"
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            register
                                        </LoadingButton>
                                    </Grid>
                                </Grid>

                                <Grid container justifyContent="flex-start">
                                    <Grid item>
                                        <NavLink
                                            to="/session/vendor_signin"
                                            style={{
                                                color: theme.palette.primary
                                                    .main,
                                                fontSize: 14,
                                            }}
                                        >
                                            Already have an account? Sign in
                                        </NavLink>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="flex-start">
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            Public Portal
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />

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
                                        <img
                                            src={message.image}
                                            width="90px"
                                        ></img>
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
                                                    message.messageTitle ==
                                                    'Alert!'
                                                ) {
                                                    REGISTRATION()
                                                }
                                                if (
                                                    message.messageTitle ==
                                                    'Success!'
                                                ) {
                                                    navigate(
                                                        '/session/vendor_signin'
                                                    )
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
                <Snackbar
                    open={openSnack}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    onClose={() => setOpenSnack(false)}
                >
                    <Alert
                        onClose={() => setOpenSnack(false)}
                        sx={{ width: '100%' }}
                        severity={'error'}
                        variant="filled"
                    >
                        Please make sure your passwords match.
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        </div>
    )
}
