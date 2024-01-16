import { useTheme } from '@emotion/react'
import { LoadingButton } from '@mui/lab'
import {
    Card,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    styled,
    Box,
    Snackbar,
    Alert,
} from '@mui/material'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import React from 'react'
import moment from 'moment/moment'
import { Breadcrumb } from 'app/components'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ip from '../DB/IP_Address'
import axios from 'axios'

//

const styles = {
    box_border: {
        borderWidth: 3,
        borderStyle: 'solid',
        padding: 30,
        paddingBottom: 10,
        borderTopWidth: 0,
        borderColor: '#9fa6b7',
    },
    box_bg: {
        backgroundColor: '#345c92',
        padding: 20,
        marginTop: 30,
    },
    box_title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBox_Margin: {
        marginBottom: 25,
    },
}

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const MBBS_APLForm = () => {
    //
    const navigate = useNavigate()
    const userData = useSelector((data) => data.loginReducer.FN_MBBS_Data)
    const [open, setOpen] = useState(false)
    //
    const initialValues = {
        MBBS_ADM_RegID: userData._id,
        APPLICANT_NAME: '',
        FATHER_NAME: '',
        EMAIL: '',
        DOB: moment(new Date()).format('YYYY-MM-DD'),
        BIRTH_CITY: '',
        BIRTH_COUNTRY: '',
        RELEGION: '',
        MOBILE: '',
        PHONE: '',
        PRE_HOME_ADDRESS: '',
        PER_HOME_ADDRESS: '',
        NATIONALITY: '',
        PASSPORT_NO: '',
        PASSPORT_ISSUE_DATE: moment(new Date()).format('YYYY-MM-DD'),
        PASSPORT_PLACE_OF_ISSUE: '',
        PASSPORT_DATE_OF_EXPIRY: moment(new Date()).format('YYYY-MM-DD'),
        FATHER_NAME: '',
        FATHER_CNIC: '',
        FATHER_MOBILE: '',
        FATHER_TELEPHONE: '',
        FATHER_NATIONALITY: '',
        FATHER_PASSPORT: '',
        FATHER_PASSPORT_PLACE: '',
        FATHER_PASSPORT_DATE_EXPIRY: moment(new Date()).format('YYYY-MM-DD'),
        FATHER_OCCUPATION: '',
        FATHER_DESIGNATION: '',
        FATHER_COMPANY: '',
        FATHER_EMAIL: '',
        GUA_NAME: '',
        GUA_CNIC: '',
        GUA_MOBILE: '',
        GUA_TELEPHONE: '',
        GUA_EMAIL: '',
        GUA_ADDRESS: '',
        MATRIC_YEAR: '',
        MATRIC_INSTITUTE: '',
        MATRIC_OBTAINED: '',
        MATRIC_TOTAL: '',
        INTER_YEAR: '',
        INTER_INSTITUTE: '',
        INTER_OBTAINED: '',
        INTER_TOTAL: '',
        SAT_1: '',
        SAT_2: '',
        SAT_3: '',
        MDCAT_YEAR: '',
        MDCAT_SCORE: '',
        MDCAT_CENTER: '',
        RECIPT_DATE: '',
        RECEIPT_NUMBER: '',
    }
    //
    useEffect(() => {}, [])

    const handleFormSubmit = (values) => {
        // navigate('/MBBS_Admission/MBBS_DocUpload')
        //
        // const SAVE_BASIC_INFO = () => {
        axios
            .post(ip.admission + 'MBBS_ADM_Info/post/', values)
            .then((res) => {
                //
                setOpen(true)
                navigate('/MBBS_Admission/MBBS_DocUpload')
            })
            .catch(function (error) {
                alert('Error! Please Try again Later')
            })
        // }
    }

    const validationSchema = Yup.object().shape({
        APPLICANT_NAME: Yup.string().required(
            '[ APPLICANT NAME ] is required field.'
        ),
        FATHER_NAME: Yup.string().required(
            '[ FATHER NAME ] is required field.'
        ),
        EMAIL: Yup.string()
            .required('[ EMAIL ] is required field.')
            .email('Please enter valid email'),
        DOB: Yup.string().required('[ DATE OF BIRTH ] is required field.'),
        BIRTH_CITY: Yup.string().required('[ BIRTH_CITY ] is required field.'),
        BIRTH_COUNTRY: Yup.string().required(
            '[ BIRTH COUNTRY ] is required field.'
        ),
        RELEGION: Yup.string().required('[ RELEGION ] is required field.'),
        MOBILE: Yup.string().required('[ MOBILE ] is required field.'),
        PHONE: Yup.string().required('[ PHONE ] is required field.'),
        PRE_HOME_ADDRESS: Yup.string().required(
            '[ PRESENT HOME ADDRESS ] is required field.'
        ),
        PER_HOME_ADDRESS: Yup.string().required(
            '[ PERMANENT HOME ADDRESS ] is required field.'
        ),
        NATIONALITY: Yup.string().required(
            '[ NATIONALITY ] is required field.'
        ),
        PASSPORT_NO: Yup.string().required(
            '[ PASSPORT NO ] is required field.'
        ),
        PASSPORT_ISSUE_DATE: Yup.string().required(
            '[ DATE OF ISSUE ] is required field.'
        ),
        PASSPORT_PLACE_OF_ISSUE: Yup.string().required(
            '[ PLACE OF ISSUE ] is required field.'
        ),
        PASSPORT_DATE_OF_EXPIRY: Yup.string().required(
            '[ DATE OF EXPIRY ] is required field.'
        ),
        FATHER_NAME: Yup.string().required('[ NAME ] is required field.'),
        FATHER_CNIC: Yup.string().required(
            '[ CNIC/NICOP No ] is required field.'
        ),
        FATHER_MOBILE: Yup.string().required(
            '[ MOBILE NO ] is required field.'
        ),
        FATHER_TELEPHONE: Yup.string().required(
            '[ TELEPHONE ] is required field.'
        ),
        FATHER_NATIONALITY: Yup.string().required(
            '[ NATIONALITY/CITIZENSHIP ] is required field.'
        ),
        FATHER_PASSPORT: Yup.string().required(
            '[ PASSPORT NO ] is required field.'
        ),
        FATHER_PASSPORT_PLACE: Yup.string().required(
            '[ PLACE OF ISSUE ] is required field.'
        ),
        FATHER_PASSPORT_DATE_EXPIRY: Yup.string().required(
            '[ DATE OF EXPIRY ] is required field.'
        ),
        FATHER_OCCUPATION: Yup.string().required(
            '[ OCCUPATION ] is required field.'
        ),
        FATHER_DESIGNATION: Yup.string().required(
            '[ DESIGNATION ] is required field.'
        ),
        FATHER_COMPANY: Yup.string().required(
            '[ EMPLOYER/COMPANY ] is required field.'
        ),
        FATHER_EMAIL: Yup.string()
            .required('[ FATHER / MOTHER EMAIL ] is required field.')
            .email('Please enter valid email'),
        GUA_NAME: Yup.string().required('[ NAME ] is required field.'),
        GUA_CNIC: Yup.string().required('[ CNIC/NICOP No ] is required field.'),
        GUA_MOBILE: Yup.string().required('[ MOBILE NO ] is required field.'),
        GUA_TELEPHONE: Yup.string().required(
            '[  TELEPHONE ] is required field.'
        ),
        GUA_EMAIL: Yup.string()
            .required('[ EMAIL ] is required field.')
            .email('Please enter valid email'),
        GUA_ADDRESS: Yup.string().required(
            '[ HOME ADDRESS ] is required field.'
        ),
        MATRIC_YEAR: Yup.string()
            .required('[ MATRIC / O LEVEL PASSING YEAR ] is required field.')
            .min(4, 'Must be exactly 4 digits')
            .max(4, 'Must be exactly 4 digits'),
        MATRIC_INSTITUTE: Yup.string().required(
            '[ COUNTRY OF INSTITUTION ] is required field.'
        ),
        MATRIC_OBTAINED: Yup.string().required(
            '[ TOTAL MARKS OBTAINED ] is required field.'
        ),
        MATRIC_TOTAL: Yup.string().required(
            '[ TOTAL OUT OF MARKS ] is required field.'
        ),
        INTER_YEAR: Yup.string()
            .required('[ INTER / A LEVEL PASSING YEAR ] is required field.')
            .min(4, 'Must be exactly 4 digits')
            .max(4, 'Must be exactly 4 digits'),
        INTER_INSTITUTE: Yup.string().required(
            '[ COUNTRY OF INSTITUTION ] is required field.'
        ),
        INTER_OBTAINED: Yup.string().required(
            '[ TOTAL MARKS OBTAINED ] is required field.'
        ),
        INTER_TOTAL: Yup.string().required(
            '[ TOTAL OUT OF MARKS ] is required field.'
        ),

        SAT_1: Yup.string().required('This is required field.'),
        SAT_2: Yup.string().required('This is required field.'),
        SAT_3: Yup.string().required('This is required field.'),
        MDCAT_YEAR: Yup.string().required('[ MDCAT YEAR ] is required field.'),
        MDCAT_SCORE: Yup.string().required(
            '[ MDCAT SCORE ] is required field.'
        ),
        MDCAT_CENTER: Yup.string().required(
            '[ MDCAT_CENTER ] is required field.'
        ),

        RECIPT_DATE: Yup.string().required(
            '[ RECIPT DATE ] is required field.'
        ),
        RECEIPT_NUMBER: Yup.string().required(
            '[ RECEIPT NUMBER ] is required field.'
        ),
    })

    return (
        <div>
            {/*  */}
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            {
                                name: 'Home',
                                path: '/MBBS_Admission/MBBS_Home',
                            },
                            { name: 'Application Form' },
                        ]}
                    />
                </div>
                <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                    <Box width="100%">
                        <div style={{ margin: 30, marginTop: 10 }}>
                            <div style={{ marginTop: 0 }}>
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
                                            <div
                                                style={{
                                                    backgroundColor: '#345c92',
                                                    padding: 20,
                                                    marginBottom: 40,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 28,
                                                    }}
                                                >
                                                    APPLICATION FORM
                                                </div>
                                                <div
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 17,
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    FOR ADMISSION IN MBBS COURSE
                                                    UNDER FOREIGN NATIONAL SELF
                                                    FINANCE CATEGORY FOR THE
                                                    ACADEMIC SESSION 2023-24 AT
                                                    PEOPLES UNIVERSITY OF
                                                    MEDICAL & HEALTH SCIENCES
                                                    FOR WOMEN SBA
                                                </div>
                                            </div>
                                            {/*  */}
                                            <div style={styles.box_bg}>
                                                <div style={styles.box_title}>
                                                    PERSONAL DETAILS
                                                </div>
                                            </div>

                                            <div style={styles.box_border}>
                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="APPLICANT_NAME"
                                                            label="APPLICANT NAME"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.APPLICANT_NAME
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.APPLICANT_NAME &&
                                                                errors.APPLICANT_NAME
                                                            }
                                                            error={Boolean(
                                                                errors.APPLICANT_NAME &&
                                                                    touched.APPLICANT_NAME
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="FATHER_NAME"
                                                            label="FATHER'S NAME"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_NAME
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_NAME &&
                                                                errors.FATHER_NAME
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_NAME &&
                                                                    touched.FATHER_NAME
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    {/* PASTER NEW TEXTBOX ABOVE */}
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="EMAIL"
                                                            label="EMAIL *"
                                                            onBlur={handleBlur}
                                                            value={values.EMAIL}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.EMAIL &&
                                                                errors.EMAIL
                                                            }
                                                            error={Boolean(
                                                                errors.EMAIL &&
                                                                    touched.EMAIL
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="date"
                                                            name="DOB"
                                                            label="DATE OF BIRTH *"
                                                            onBlur={handleBlur}
                                                            value={values.DOB}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.DOB &&
                                                                errors.DOB
                                                            }
                                                            error={Boolean(
                                                                errors.DOB &&
                                                                    touched.DOB
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    {/* PASTER NEW TEXTBOX ABOVE */}
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="BIRTH_CITY"
                                                            label="BIRTH CITY *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.BIRTH_CITY
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.BIRTH_CITY &&
                                                                errors.BIRTH_CITY
                                                            }
                                                            error={Boolean(
                                                                errors.BIRTH_CITY &&
                                                                    touched.BIRTH_CITY
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="BIRTH_COUNTRY"
                                                            label="BIRTH COUNTRY *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.BIRTH_COUNTRY
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.BIRTH_COUNTRY &&
                                                                errors.BIRTH_COUNTRY
                                                            }
                                                            error={Boolean(
                                                                errors.BIRTH_COUNTRY &&
                                                                    touched.BIRTH_COUNTRY
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    {/* PASTER NEW TEXTBOX ABOVE */}
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="RELEGION"
                                                            label="RELEGION *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.RELEGION
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.RELEGION &&
                                                                errors.RELEGION
                                                            }
                                                            error={Boolean(
                                                                errors.RELEGION &&
                                                                    touched.RELEGION
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    {/* PASTER NEW TEXTBOX ABOVE */}
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="MOBILE"
                                                            label="MOBILE NO *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.MOBILE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.MOBILE &&
                                                                errors.MOBILE
                                                            }
                                                            error={Boolean(
                                                                errors.MOBILE &&
                                                                    touched.MOBILE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="PHONE"
                                                            label="PHONE *"
                                                            onBlur={handleBlur}
                                                            value={values.PHONE}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.PHONE &&
                                                                errors.PHONE
                                                            }
                                                            error={Boolean(
                                                                errors.PHONE &&
                                                                    touched.PHONE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    {/* PASTER NEW TEXTBOX ABOVE */}
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="PRE_HOME_ADDRESS"
                                                            label="PRESENT HOME ADDRESS *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.PRE_HOME_ADDRESS
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.PRE_HOME_ADDRESS &&
                                                                errors.PRE_HOME_ADDRESS
                                                            }
                                                            error={Boolean(
                                                                errors.PRE_HOME_ADDRESS &&
                                                                    touched.PRE_HOME_ADDRESS
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    {/* PASTER NEW TEXTBOX ABOVE */}
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="PER_HOME_ADDRESS"
                                                            label="PERMANENT HOME ADDRESS *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.PER_HOME_ADDRESS
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.PER_HOME_ADDRESS &&
                                                                errors.PER_HOME_ADDRESS
                                                            }
                                                            error={Boolean(
                                                                errors.PER_HOME_ADDRESS &&
                                                                    touched.PER_HOME_ADDRESS
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    {/* PASTER NEW TEXTBOX ABOVE */}
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="NATIONALITY"
                                                            label="NATIONALITY *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.NATIONALITY
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.NATIONALITY &&
                                                                errors.NATIONALITY
                                                            }
                                                            error={Boolean(
                                                                errors.NATIONALITY &&
                                                                    touched.NATIONALITY
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="PASSPORT_NO"
                                                            label="PASSPORT NO. *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.PASSPORT_NO
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.PASSPORT_NO &&
                                                                errors.PASSPORT_NO
                                                            }
                                                            error={Boolean(
                                                                errors.PASSPORT_NO &&
                                                                    touched.PASSPORT_NO
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    {/* PASTER NEW TEXTBOX ABOVE */}
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={4}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="DATE"
                                                            name="PASSPORT_ISSUE_DATE"
                                                            label="DATE OF ISSUE *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.PASSPORT_ISSUE_DATE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.PASSPORT_ISSUE_DATE &&
                                                                errors.PASSPORT_ISSUE_DATE
                                                            }
                                                            error={Boolean(
                                                                errors.PASSPORT_ISSUE_DATE &&
                                                                    touched.PASSPORT_ISSUE_DATE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="PASSPORT_PLACE_OF_ISSUE"
                                                            label="PLACE OF ISSUE *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.PASSPORT_PLACE_OF_ISSUE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.PASSPORT_PLACE_OF_ISSUE &&
                                                                errors.PASSPORT_PLACE_OF_ISSUE
                                                            }
                                                            error={Boolean(
                                                                errors.PASSPORT_PLACE_OF_ISSUE &&
                                                                    touched.PASSPORT_PLACE_OF_ISSUE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="date"
                                                            name="PASSPORT_DATE_OF_EXPIRY"
                                                            label="DATE OF EXPIRY *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.PASSPORT_DATE_OF_EXPIRY
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.PASSPORT_DATE_OF_EXPIRY &&
                                                                errors.PASSPORT_DATE_OF_EXPIRY
                                                            }
                                                            error={Boolean(
                                                                errors.PASSPORT_DATE_OF_EXPIRY &&
                                                                    touched.PASSPORT_DATE_OF_EXPIRY
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    {/* PASTER NEW TEXTBOX ABOVE */}
                                                </Grid>
                                            </div>

                                            {/* ==========***** FATHER MOTHER INFORMATION *****========== */}

                                            <div style={styles.box_bg}>
                                                <div style={styles.box_title}>
                                                    PARTICULARS OF FATHER /
                                                    MOTHER
                                                </div>
                                            </div>

                                            <div style={styles.box_border}>
                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="FATHER_NAME"
                                                            label="NAME *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_NAME
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_NAME &&
                                                                errors.FATHER_NAME
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_NAME &&
                                                                    touched.FATHER_NAME
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="FATHER_CNIC"
                                                            label="CNIC/NICOP No. *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_CNIC
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_CNIC &&
                                                                errors.FATHER_CNIC
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_CNIC &&
                                                                    touched.FATHER_CNIC
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="FATHER_MOBILE"
                                                            label="MOBILE NO. *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_MOBILE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_MOBILE &&
                                                                errors.FATHER_MOBILE
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_MOBILE &&
                                                                    touched.FATHER_MOBILE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="FATHER_TELEPHONE"
                                                            label="TELEPHONE *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_TELEPHONE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_TELEPHONE &&
                                                                errors.FATHER_TELEPHONE
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_TELEPHONE &&
                                                                    touched.FATHER_TELEPHONE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="FATHER_NATIONALITY"
                                                            label="NATIONALITY/CITIZENSHIP *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_NATIONALITY
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_NATIONALITY &&
                                                                errors.FATHER_NATIONALITY
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_NATIONALITY &&
                                                                    touched.FATHER_NATIONALITY
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="FATHER_PASSPORT"
                                                            label="PASSPORT NO. *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_PASSPORT
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_PASSPORT &&
                                                                errors.FATHER_PASSPORT
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_PASSPORT &&
                                                                    touched.FATHER_PASSPORT
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="FATHER_PASSPORT_PLACE"
                                                            label="PLACE OF ISSUE *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_PASSPORT_PLACE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_PASSPORT_PLACE &&
                                                                errors.FATHER_PASSPORT_PLACE
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_PASSPORT_PLACE &&
                                                                    touched.FATHER_PASSPORT_PLACE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="date"
                                                            name="FATHER_PASSPORT_DATE_EXPIRY"
                                                            label="DATE OF EXPIRY *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_PASSPORT_DATE_EXPIRY
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_PASSPORT_DATE_EXPIRY &&
                                                                errors.FATHER_PASSPORT_DATE_EXPIRY
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_PASSPORT_DATE_EXPIRY &&
                                                                    touched.FATHER_PASSPORT_DATE_EXPIRY
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="FATHER_OCCUPATION"
                                                            label="OCCUPATION *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_OCCUPATION
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_OCCUPATION &&
                                                                errors.FATHER_OCCUPATION
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_OCCUPATION &&
                                                                    touched.FATHER_OCCUPATION
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="FATHER_DESIGNATION"
                                                            label="DESIGNATION *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_DESIGNATION
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_DESIGNATION &&
                                                                errors.FATHER_DESIGNATION
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_DESIGNATION &&
                                                                    touched.FATHER_DESIGNATION
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="FATHER_COMPANY"
                                                            label="EMPLOYER/COMPANY *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_COMPANY
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_COMPANY &&
                                                                errors.FATHER_COMPANY
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_COMPANY &&
                                                                    touched.FATHER_COMPANY
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="FATHER_EMAIL"
                                                            label="FATHER / MOTHER EMAIL *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.FATHER_EMAIL
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.FATHER_EMAIL &&
                                                                errors.FATHER_EMAIL
                                                            }
                                                            error={Boolean(
                                                                errors.FATHER_EMAIL &&
                                                                    touched.FATHER_EMAIL
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>

                                            {/* ==========***** GUARDIAN IN PAKISTAN *****========== */}

                                            <div style={styles.box_bg}>
                                                <div style={styles.box_title}>
                                                    PARTICULARS OF GUARDIAN IN
                                                    PAKISTAN
                                                </div>
                                            </div>

                                            <div style={styles.box_border}>
                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="GUA_NAME"
                                                            label="NAME *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.GUA_NAME
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.GUA_NAME &&
                                                                errors.GUA_NAME
                                                            }
                                                            error={Boolean(
                                                                errors.GUA_NAME &&
                                                                    touched.GUA_NAME
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="GUA_CNIC"
                                                            label="CNIC/NICOP No. *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.GUA_CNIC
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.GUA_CNIC &&
                                                                errors.GUA_CNIC
                                                            }
                                                            error={Boolean(
                                                                errors.GUA_CNIC &&
                                                                    touched.GUA_CNIC
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="GUA_MOBILE"
                                                            label="MOBILE NO. *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.GUA_MOBILE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.GUA_MOBILE &&
                                                                errors.GUA_MOBILE
                                                            }
                                                            error={Boolean(
                                                                errors.GUA_MOBILE &&
                                                                    touched.GUA_MOBILE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="GUA_TELEPHONE"
                                                            label="TELEPHONE *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.GUA_TELEPHONE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.GUA_TELEPHONE &&
                                                                errors.GUA_TELEPHONE
                                                            }
                                                            error={Boolean(
                                                                errors.GUA_TELEPHONE &&
                                                                    touched.GUA_TELEPHONE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="GUA_EMAIL"
                                                            label="EMAIL *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.GUA_EMAIL
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.GUA_EMAIL &&
                                                                errors.GUA_EMAIL
                                                            }
                                                            error={Boolean(
                                                                errors.GUA_EMAIL &&
                                                                    touched.GUA_EMAIL
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="GUA_ADDRESS"
                                                            label="HOME ADDRESS *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.GUA_ADDRESS
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.GUA_ADDRESS &&
                                                                errors.GUA_ADDRESS
                                                            }
                                                            error={Boolean(
                                                                errors.GUA_ADDRESS &&
                                                                    touched.GUA_ADDRESS
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>

                                            {/* ==========***** ACADEMIC RECORD OF CANDIDATE MATRIC /INTER *****========== */}

                                            <div style={styles.box_bg}>
                                                <div style={styles.box_title}>
                                                    ACADEMIC RECORD OF CANDIDATE
                                                </div>
                                            </div>
                                            <div style={styles.box_border}>
                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <div
                                                            style={{
                                                                color: '#b23838',
                                                                fontWeight:
                                                                    'bold',
                                                            }}
                                                        >
                                                            SCHOOL SYSTEM
                                                        </div>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-form-control-label-placement"
                                                            name="position"
                                                        >
                                                            <FormControlLabel
                                                                value="Grade"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="10th Grade"
                                                            />
                                                            <FormControlLabel
                                                                value="SSC"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="SSC"
                                                            />
                                                            <FormControlLabel
                                                                value="O_LEVEL"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="O LEVEL"
                                                            />
                                                        </RadioGroup>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="MATRIC_YEAR"
                                                            label="MATRIC / O LEVEL PASSING YEAR *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.MATRIC_YEAR
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.MATRIC_YEAR &&
                                                                errors.MATRIC_YEAR
                                                            }
                                                            error={Boolean(
                                                                errors.MATRIC_YEAR &&
                                                                    touched.MATRIC_YEAR
                                                            )}
                                                            sx={{ mb: 3 }}
                                                            onInput={(e) => {
                                                                e.target.value =
                                                                    Math.max(
                                                                        0,
                                                                        parseInt(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    )
                                                                        .toString()
                                                                        .slice(
                                                                            0,
                                                                            4
                                                                        )
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="MATRIC_INSTITUTE"
                                                            label="COUNTRY OF INSTITUTION *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.MATRIC_INSTITUTE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.MATRIC_INSTITUTE &&
                                                                errors.MATRIC_INSTITUTE
                                                            }
                                                            error={Boolean(
                                                                errors.MATRIC_INSTITUTE &&
                                                                    touched.MATRIC_INSTITUTE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="MATRIC_OBTAINED"
                                                            label="TOTAL MARKS OBTAINED IN 10th GRADE/ MATRIC / O LEVEL *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.MATRIC_OBTAINED
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.MATRIC_OBTAINED &&
                                                                errors.MATRIC_OBTAINED
                                                            }
                                                            error={Boolean(
                                                                errors.MATRIC_OBTAINED &&
                                                                    touched.MATRIC_OBTAINED
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="MATRIC_TOTAL"
                                                            label="TOTAL OUT OF MARKS (MAXIMUM MARKS) E.G 850/900/1050/1100 etc. *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.MATRIC_TOTAL
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.MATRIC_TOTAL &&
                                                                errors.MATRIC_TOTAL
                                                            }
                                                            error={Boolean(
                                                                errors.MATRIC_TOTAL &&
                                                                    touched.MATRIC_TOTAL
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <div
                                                            style={{
                                                                color: '#b23838',
                                                                fontWeight:
                                                                    'bold',
                                                            }}
                                                        >
                                                            COLLEGE SYSTEM
                                                        </div>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-form-control-label-placement"
                                                            name="position"
                                                        >
                                                            <FormControlLabel
                                                                value="Grade"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="10th Grade"
                                                            />
                                                            <FormControlLabel
                                                                value="SSC"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="SSC"
                                                            />
                                                            <FormControlLabel
                                                                value="O_LEVEL"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="O LEVEL"
                                                            />
                                                        </RadioGroup>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="INTER_YEAR"
                                                            label="INTER / A LEVEL PASSING YEAR *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.INTER_YEAR
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.INTER_YEAR &&
                                                                errors.INTER_YEAR
                                                            }
                                                            error={Boolean(
                                                                errors.INTER_YEAR &&
                                                                    touched.INTER_YEAR
                                                            )}
                                                            sx={{ mb: 3 }}
                                                            onInput={(e) => {
                                                                e.target.value =
                                                                    Math.max(
                                                                        0,
                                                                        parseInt(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    )
                                                                        .toString()
                                                                        .slice(
                                                                            0,
                                                                            4
                                                                        )
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="INTER_INSTITUTE"
                                                            label="COUNTRY OF INSTITUTION *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.INTER_INSTITUTE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.INTER_INSTITUTE &&
                                                                errors.INTER_INSTITUTE
                                                            }
                                                            error={Boolean(
                                                                errors.INTER_INSTITUTE &&
                                                                    touched.INTER_INSTITUTE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="INTER_OBTAINED"
                                                            label="TOTAL MARKS OBTAINED IN 12th GRADE/ INTER / A LEVEL *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.INTER_OBTAINED
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.INTER_OBTAINED &&
                                                                errors.INTER_OBTAINED
                                                            }
                                                            error={Boolean(
                                                                errors.INTER_OBTAINED &&
                                                                    touched.INTER_OBTAINED
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            name="INTER_TOTAL"
                                                            label="TOTAL OUT OF MARKS (MAXIMUM MARKS) E.G 1100 etc. *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.INTER_TOTAL
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.INTER_TOTAL &&
                                                                errors.INTER_TOTAL
                                                            }
                                                            error={Boolean(
                                                                errors.INTER_TOTAL &&
                                                                    touched.MATRIC_TOTAL
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>

                                            {/* ==========***** MDCAT *****========== */}

                                            <div style={styles.box_bg}>
                                                <div style={styles.box_title}>
                                                    MDCAT 2023/SAT-II/MCAT/UCAT
                                                    TEST DETAILS
                                                </div>
                                            </div>

                                            <div style={styles.box_border}>
                                                <Grid container spacing={4}>
                                                    <Grid item md={6}>
                                                        <Select
                                                            style={
                                                                styles.textBox_Margin
                                                            }
                                                            size="small"
                                                            displayEmpty
                                                            fullWidth
                                                            // value={Gender || ''}
                                                            value={''}
                                                            name="Gender"
                                                            onChange={
                                                                handleChange
                                                            }
                                                        >
                                                            <MenuItem value="">
                                                                <em>
                                                                    Please
                                                                    Select
                                                                    Medical Test
                                                                </em>
                                                            </MenuItem>
                                                            <MenuItem
                                                                value={'SAT-II'}
                                                            >
                                                                SAT-II
                                                            </MenuItem>
                                                            <MenuItem
                                                                value={'UCAT'}
                                                            >
                                                                UCAT
                                                            </MenuItem>
                                                            <MenuItem
                                                                value={'MCAT'}
                                                            >
                                                                MCAT
                                                            </MenuItem>
                                                        </Select>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="SAT_1"
                                                            label=""
                                                            onBlur={handleBlur}
                                                            value={values.SAT_1}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.SAT_1 &&
                                                                errors.SAT_1
                                                            }
                                                            error={Boolean(
                                                                errors.SAT_1 &&
                                                                    touched.SAT_1
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />

                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="SAT_2"
                                                            label=""
                                                            onBlur={handleBlur}
                                                            value={values.SAT_2}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.SAT_2 &&
                                                                errors.SAT_2
                                                            }
                                                            error={Boolean(
                                                                errors.SAT_2 &&
                                                                    touched.SAT_2
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />

                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="SAT_3"
                                                            label=""
                                                            onBlur={handleBlur}
                                                            value={values.SAT_3}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.SAT_3 &&
                                                                errors.SAT_3
                                                            }
                                                            error={Boolean(
                                                                errors.SAT_3 &&
                                                                    touched.SAT_3
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="MDCAT_YEAR"
                                                            label="MDCAT PASSING YEAR *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.MDCAT_YEAR
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.MDCAT_YEAR &&
                                                                errors.MDCAT_YEAR
                                                            }
                                                            error={Boolean(
                                                                errors.MDCAT_YEAR &&
                                                                    touched.MDCAT_YEAR
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="MDCAT_SCORE"
                                                            label="MDCAT SCORE *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.MDCAT_SCORE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.MDCAT_SCORE &&
                                                                errors.MDCAT_SCORE
                                                            }
                                                            error={Boolean(
                                                                errors.MDCAT_SCORE &&
                                                                    touched.MDCAT_SCORE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="MDCAT_CENTER"
                                                            label="MDCAT TEST CENTER *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.MDCAT_CENTER
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.MDCAT_CENTER &&
                                                                errors.MDCAT_CENTER
                                                            }
                                                            error={Boolean(
                                                                errors.MDCAT_CENTER &&
                                                                    touched.MDCAT_CENTER
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>

                                            {/* ==========***** PAYMENT RECORD *****========== */}

                                            <div style={styles.box_bg}>
                                                <div style={styles.box_title}>
                                                    PAYMENT RECEIPT INFORMATION
                                                </div>
                                            </div>

                                            <div style={styles.box_border}>
                                                <Grid container spacing={4}>
                                                    <Grid item md={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="RECIPT_DATE"
                                                            label="DATE OF PAYMENT RECIPT *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.RECIPT_DATE
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.RECIPT_DATE &&
                                                                errors.RECIPT_DATE
                                                            }
                                                            error={Boolean(
                                                                errors.RECIPT_DATE &&
                                                                    touched.RECIPT_DATE
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={4}>
                                                    <Grid item md={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="text"
                                                            name="RECEIPT_NUMBER"
                                                            label="RECEIPT NUMBER *"
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.RECEIPT_NUMBER
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            helperText={
                                                                touched.RECEIPT_NUMBER &&
                                                                errors.RECEIPT_NUMBER
                                                            }
                                                            error={Boolean(
                                                                errors.RECEIPT_NUMBER &&
                                                                    touched.RECEIPT_NUMBER
                                                            )}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>

                                            <LoadingButton
                                                type="submit"
                                                color="success"
                                                variant="contained"
                                                sx={{
                                                    mb: 2,
                                                    mt: 3,
                                                    width: '100%',
                                                }}
                                            >
                                                {
                                                    ' << SUBMIT AND PROCEED TO NEXT STEP >> '
                                                }
                                            </LoadingButton>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </Box>
                </Card>
            </Container>
            {/*  */}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={() => setOpen(false)}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    sx={{ width: '100%' }}
                    severity={'success'}
                    variant="filled"
                >
                    Data Successfully Saved
                </Alert>
            </Snackbar>
        </div>
    )
}

export default MBBS_APLForm
