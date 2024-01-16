import { Button, Grid, Snackbar, Alert, Table } from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import ip from '../DB/IP_Address'
import axios from 'axios'
import { loadError, loadProgress, authLogin } from 'app/redux/action'
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import CloseIcon from '@mui/icons-material/Close'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))
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

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: 'grey',
    fontSize: 14,
    marginTop: -20,
    textAlign: 'center',
}))

const Space = styled('div')(({ theme }) => ({
    marginTop: 10,
}))

const ProductTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: 'pre',
    '& small': {
        width: 50,
        height: 15,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': { borderBottom: 'none' },
    '& td:first-of-type': { paddingLeft: '16px !important' },
}))

const SimpleForm = () => {
    const userData = useSelector((data) => data.loginReducer.LoginData)
    const vendorData = useSelector((data) => data.loginReducer.VendorData)
    console.log(vendorData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //
    const [loading, setloading] = useState(false)
    const [ProfilePicture, setProfilePicture] = useState('')
    const [open, setOpen] = React.useState(false)
    //
    const [state, setState] = useState({})
    const [eduArray, seteduArray] = useState([])

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    useEffect(() => {
        setState({
            ...state,
            // CandidateContact: 0 + userData.CONTACT,
            // ADM_RegistraionID: userData._id,
            DOB: moment(new Date()).format('YYYY-MM-DD'),
            // CANDIDATE_NAME: userData.CANDIDATE_NAME,
            // CNIC: userData.CNIC,
        })
    }, [])

    const handleSubmit = (event) => {
        navigate('/Admission/EMP_JobInfo')
        //
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const {
        ADM_RegistraionID,
        DOB,
        Gender,
        CandidateContact,
        Relegion,
        Domicile,
        Marital,
        POB,
        Hafiz,
        FName,
        PerAddress,
        PostalAddress,
        Nationality,
        //
        EduDegree,
        EduBoard,
        EduPassingYear,
        EduGrade,
    } = state

    const ADD_EDUCATION_RECORD = () => {
        seteduArray((oldArray) => [
            ...oldArray,
            {
                id: eduArray.length,
                EduDegree: EduDegree,
                EduBoard: EduBoard,
                EduPassingYear: EduPassingYear,
                EduGrade: EduGrade,
            },
        ])
        setState({
            ...state,
            EduDegree: '',
            EduBoard: '',
            EduPassingYear: '',
            EduGrade: '',
        })
    }

    const removeItem = (item) => {
        seteduArray((current) =>
            current.filter((product) => {
                // 👇️ remove object that has id equal to 2
                return product.id !== item
            })
        )
    }

    return (
        <div>
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            {
                                name: 'Dashboard',
                                path: '/Admission/ADM_Dashboard',
                            },
                            { name: 'Basic Information' },
                        ]}
                    />
                </div>
                <ValidatorForm>
                    <Grid container spacing={4}>
                        {/* PICTURE */}
                        <Grid
                            item
                            lg={4}
                            md={4}
                            sm={12}
                            xs={12}
                            sx={{
                                mt: 2,
                                // height: '50%',
                            }}
                        >
                            <SimpleCard>
                                <div
                                    style={{
                                        height: '100%',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <H4 sx={{ paddingTop: 0 }}>COMPANY LOGO</H4>
                                    <div
                                        style={{
                                            justifyContent: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <img
                                            style={{
                                                borderRadius: 100,
                                                objectFit: 'cover',
                                                justifyContent: 'center',
                                                display: 'flex',
                                            }}
                                            src={
                                                ProfilePicture == ''
                                                    ? 'https://sapnaenterprises.co.in/wp-content/themes/srgroup/images/noimg.png'
                                                    : URL.createObjectURL(
                                                          ProfilePicture
                                                      )
                                            }
                                            width="150"
                                            height="150"
                                        />
                                    </div>
                                    <div
                                        style={{
                                            justifyContent: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            component="label"
                                            sx={{
                                                fontSize: 12,
                                                marginTop: '20px',
                                            }}
                                        >
                                            SELECT PICTURE
                                            <form
                                                method="POST"
                                                action="/profile-upload-single"
                                                encType="multipart/form-data"
                                            >
                                                <input
                                                    hidden
                                                    accept="image/*"
                                                    type="file"
                                                    onChange={(e) =>
                                                        setProfilePicture(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                />
                                            </form>
                                        </Button>
                                    </div>
                                    <H4
                                        style={{
                                            marginTop: 0,
                                            color: 'black',
                                            paddingTop: 20,
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {/* {userData.CANDIDATE_NAME} */}
                                    </H4>
                                    <H4
                                        style={{
                                            fontWeight: 'normal',
                                            color: 'grey',
                                            paddingTop: 8,
                                            textTransform: 'lowercase',
                                        }}
                                    >
                                        abdulbasit.sep30@gmail.com
                                    </H4>
                                </div>
                            </SimpleCard>
                        </Grid>
                        {/* FORM */}
                        <Grid item lg={8} md={8} sm={12} xs={12} sx={{ mt: 2 }}>
                            <SimpleCard>
                                <h6 style={{ marginTop: -60 }}>-</h6>
                                {/* <ValidatorForm
                                onSubmit={handleSubmit}
                                onError={() => null}
                            > */}
                                <Grid container spacing={6}>
                                    <Grid
                                        item
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 2 }}
                                    >
                                        <TextField
                                            style={{
                                                backgroundColor: '#f0f0f0',
                                            }}
                                            size={'small'}
                                            type="text"
                                            name="username"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            // value={userData.CANDIDATE_NAME}
                                            validators={['required']}
                                            label="Business Legal Name *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                            disabled
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                <Grid container spacing={6}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="username"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            // value={userData.CANDIDATE_NAME}
                                            validators={['required']}
                                            label="Business Nature *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                {/* 3 IN LINE */}

                                <Grid container>
                                    <Grid lg={5.75} md={5.75} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="number"
                                            name="CandidateContact"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            // value={CandidateContact || ''}
                                            validators={['required']}
                                            label="Registration Type *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={5.75} md={5.75} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="POB"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={POB || ''}
                                            validators={['required']}
                                            label="Business Legal Type *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                {/*  */}

                                <Grid container>
                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="Domicile"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Domicile || ''}
                                            validators={['required']}
                                            label="NTN *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.8} md={3.8} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="Gender"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Gender || ''}
                                            validators={['required']}
                                            label="STRN *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="Marital"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Marital || ''}
                                            validators={['required']}
                                            label="Mobile Number *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                {/*  */}

                                <Grid container>
                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="Domicile"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Domicile || ''}
                                            validators={['required']}
                                            label="Landline Number *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.8} md={3.8} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="Gender"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Gender || ''}
                                            validators={['required']}
                                            label="Country *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="Marital"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Marital || ''}
                                            validators={['required']}
                                            label="District *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                <Grid container spacing={6}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="username"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            // value={userData.CANDIDATE_NAME}
                                            validators={['required']}
                                            label="Address *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>
                            </SimpleCard>
                        </Grid>
                    </Grid>
                </ValidatorForm>
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
                        Well Done!.. Basic info saved successfully.
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default SimpleForm
