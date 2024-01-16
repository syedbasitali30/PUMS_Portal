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
            //
            Domicile: moment(new Date()).format('YYYY-MM-DD'),
            Gender: moment(new Date()).format('YYYY-MM-DD'),
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
                            { name: 'Projects' },
                        ]}
                    />
                </div>
                <ValidatorForm>
                    <Grid container spacing={4}>
                        {/* FORM */}
                        <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            sx={{ mt: 2 }}
                        >
                            <SimpleCard title="Add Projects">
                                {/* <Space /> */}
                                <Grid container spacing={6}>
                                    <Grid
                                        item
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        // sx={{ mt: 2 }}
                                    >
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="username"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            // value={userData.CANDIDATE_NAME}
                                            validators={['required']}
                                            label="Project Title *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                            disabled
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                {/*  */}

                                <Grid container>
                                    <Grid lg={3.8} md={3.8} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="date"
                                            name="Domicile"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Domicile || ''}
                                            validators={['required']}
                                            label="Starting Date *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid lg={0.2} md={0.2}></Grid>

                                    <Grid lg={4} md={4} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="date"
                                            name="Gender"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Gender || ''}
                                            validators={['required']}
                                            label="Ending Date *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid lg={0.2} md={0.2}></Grid>

                                    <Grid lg={3.8} md={3.8} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="Marital"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Marital || ''}
                                            validators={['required']}
                                            label="Duration *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                {/*  */}

                                <Grid container>
                                    <Grid lg={3.8} md={3.8} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="Domicile"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            // value={Domicile || ''}
                                            validators={['required']}
                                            label="Value *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid lg={0.2} md={0.2}></Grid>

                                    <Grid lg={4} md={4} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="Gender"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            // value={Gender || ''}
                                            validators={['required']}
                                            label="Country *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid lg={0.2} md={0.2}></Grid>

                                    <Grid lg={3.8} md={3.8} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="Marital"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            // value={Marital || ''}
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
                                            label="Nature *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                <Grid container spacing={6}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <div
                                            style={{
                                                borderWidth: 1,
                                                borderStyle: 'solid',
                                                padding: 7,
                                                // marginTop: 2.5,
                                                borderRadius: 5,
                                                borderColor: '#c9c9c9',
                                            }}
                                        >
                                            <form
                                                method="POST"
                                                action="/profile-upload-single"
                                                encType="multipart/form-data"
                                            >
                                                <input
                                                    // ref={ref}
                                                    accept="image/*"
                                                    type="file"
                                                    // onChange={(e) => {
                                                    //     setState({
                                                    //         ...state,
                                                    //         DocString:
                                                    //             e.target
                                                    //                 .files[0],
                                                    //     })
                                                    // }}
                                                />
                                            </form>
                                        </div>
                                    </Grid>
                                </Grid>
                            </SimpleCard>
                        </Grid>
                    </Grid>

                    <Space />

                    <Grid container spacing={4}>
                        {/* FORM */}
                        <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            sx={{ mt: 2 }}
                        >
                            <SimpleCard title="Projects List"></SimpleCard>
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
