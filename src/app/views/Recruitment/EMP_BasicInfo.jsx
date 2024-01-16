import {
    Button,
    Grid,
    Snackbar,
    Alert,
    Table,
    Autocomplete,
} from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import ip from '../DB/IP_Address'
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import Resizer from 'react-image-file-resizer'
import { Country } from 'country-state-city'
import { UpdateEmpInfo } from './EMP_UpdateStatus'

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
    marginTop: 30,
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
    const empData = useSelector((data) => data.loginReducer.EmpData)
    //
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //
    const [loading, setloading] = useState(false)
    const [ProfilePicture, setProfilePicture] = useState('')
    const [open, setOpen] = React.useState(false)
    //
    const [RelegionList, setRelegionList] = React.useState([])
    const [CountryList, setCountryList] = React.useState([])
    const [Relegion, setRelegion] = useState({
        RELIGIONID: '0',
        RELIGION_TITLE: '',
    })
    //
    const [state, setState] = useState({})
    const [txtCountry, settxtCountry] = useState({
        name: '',
    })

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

    const handleSubmit = (event) => {
        setloading(true)
        UPDATE_PROFILE()
        // navigate('/Admission/EMP_JobInfo')
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

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
        DOB,
        CandidateContact,
        // Relegion,
        POB,
        email,
        PMC_Regno,
        RegnoExpDate,
        FName,
        PerAddress,
        PostalAddress,
        // txtCountry,
        Picture_Attach,
        //
        EduDegree,
        EduBoard,
        EduPassingYear,
        EduGrade,
    } = state

    const SET_INITIAL_VALUE = () => {
        setRelegion({
            RELIGIONID: empData.RELIGIONID,
            RELIGION_TITLE: empData.RELIGION_TITLE,
        })
        settxtCountry({ name: empData.NATIONALITY })
        setState({
            ...state,
            DOB: moment(empData.DOB == '' ? new Date() : empData.DOB).format(
                'YYYY-MM-DD'
            ),
            RegnoExpDate: moment(
                empData.REGISTRATION_EXP_DATE == ''
                    ? new Date()
                    : empData.REGISTRATION_EXP_DATE
            ).format('YYYY-MM-DD'),
            email: empData.EMAIL,
            CandidateContact: empData.CELL,

            POB: empData.PLACEBIRTH,
            PMC_Regno: empData.PMC_REGISTRATION_NO,
            FName: empData.FNAME,
            PerAddress: empData.PERMANENT_ADDRESS,
            PostalAddress: empData.POSTAL_ADDRESS,
            Picture_Attach: '0',
            // txtCountry: { name: empData.NATIONALITY },
        })
    }

    useEffect(() => {
        GETALL_RELIGION()
        SET_INITIAL_VALUE()
        setCountryList(Country.getAllCountries())
    }, [])

    const UPDATE_PROFILE = async (value) => {
        setloading(true)
        return await fetch(
            ip.Address + 'erec.asmx/REC_PROFILE_UPDATE',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    'systemID=' +
                    empData.T_EMP_ID +
                    '&name=' +
                    empData.NAME +
                    '&fname=' +
                    FName +
                    '&cnic=' +
                    empData.CNIC +
                    '&cell=' +
                    CandidateContact +
                    '&email=' +
                    email +
                    '&dob=' +
                    moment(DOB).format('MM/DD/YYYY') +
                    '&placeBirth=' +
                    POB +
                    '&religionID=' +
                    Relegion.RELIGIONID +
                    '&country=' +
                    txtCountry.name +
                    '&pmcRegNo=' +
                    PMC_Regno +
                    '&RegnoExpDate=' +
                    moment(RegnoExpDate).format('MM/DD/YYYY') +
                    '&postalAddress=' +
                    PostalAddress +
                    '&permanentAddress=' +
                    PerAddress +
                    '&profileImage=' +
                    Picture_Attach,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setOpen(true)
                //
                setloading(false)
                dispatch(UpdateEmpInfo(empData.T_EMP_ID))
            })
            .catch((error) => {
                console.log(error)
                setloading(false)
            })
    }

    const GETALL_RELIGION = async (value) => {
        return await fetch(
            ip.Address + 'erec.asmx/loadRELIGION',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'comp=0',
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setRelegionList(response)
            })
            .catch((error) => {
                console.log(error)
            })
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
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
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
                                    <H4 sx={{ paddingTop: 0 }}>PROFILE</H4>
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
                                            // https://raw.githubusercontent.com/syedbasitali30/images/main/emptyImage.png
                                            // PROFILE_PIC1
                                            src={
                                                ProfilePicture == ''
                                                    ? empData.PROFILE_PIC1
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
                                                    onChange={(e) => {
                                                        setProfilePicture(
                                                            e.target.files[0]
                                                        )
                                                        compressImageFunction(
                                                            e,
                                                            'Picture_Attach'
                                                        )
                                                    }}
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
                                        {empData.NAME}
                                    </H4>
                                    <H4
                                        style={{
                                            fontWeight: 'normal',
                                            color: 'grey',
                                            paddingTop: 8,
                                            textTransform: 'lowercase',
                                        }}
                                    >
                                        {empData.EMAIL}
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
                                        <TextValidator
                                            style={{
                                                backgroundColor: '#f0f0f0',
                                            }}
                                            size={'small'}
                                            required
                                            name="username"
                                            onChange={handleChange}
                                            value={empData.NAME}
                                            label="Name"
                                            disabled
                                            autoFocus
                                            fullWidth
                                        />
                                        <Space />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid lg={5.7} md={3.6} sm={12} xs={12}>
                                        <TextValidator
                                            size={'small'}
                                            required
                                            name="FName"
                                            onChange={handleChange}
                                            value={FName || ''}
                                            label="Father's Name"
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={5.8} md={3.8} sm={12} xs={12}>
                                        <TextValidator
                                            size={'small'}
                                            required
                                            name="Email"
                                            onChange={handleChange}
                                            value={email || ''}
                                            label="Email"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                {/* 3 IN LINE */}

                                <Grid container>
                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        <TextValidator
                                            size={'small'}
                                            required
                                            name="CandidateContact"
                                            onChange={handleChange}
                                            value={CandidateContact || ''}
                                            label="Cell No"
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.8} md={3.8} sm={12} xs={12}>
                                        <TextValidator
                                            size={'small'}
                                            required
                                            type="date"
                                            name="DOB"
                                            onChange={handleChange}
                                            value={DOB || ''}
                                            label="Date of Birth"
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        <TextValidator
                                            size={'small'}
                                            required
                                            name="POB"
                                            onChange={handleChange}
                                            value={POB || ''}
                                            label="Place of Birth"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                {/*  */}

                                <Grid container>
                                    <Grid lg={5.75} md={5.75} sm={12} xs={12}>
                                        <Autocomplete
                                            value={Relegion}
                                            options={RelegionList}
                                            getOptionLabel={(option) =>
                                                option.RELIGION_TITLE
                                            }
                                            onChange={(event, value) => {
                                                setRelegion(value)
                                            }}
                                            renderInput={(params) => (
                                                <TextValidator
                                                    {...params}
                                                    variant="outlined"
                                                    label="Relegion"
                                                    fullWidth
                                                    size="small"
                                                    required
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={5.75} md={5.75} sm={12} xs={12}>
                                        <Autocomplete
                                            value={txtCountry}
                                            options={CountryList}
                                            getOptionLabel={(option) =>
                                                option.name
                                            }
                                            filterSelectedOptions
                                            onChange={(event, value) => {
                                                settxtCountry(value)
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
                                </Grid>

                                <Space />

                                {/*  */}

                                <Grid container>
                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        <TextValidator
                                            style={{
                                                backgroundColor: '#f0f0f0',
                                            }}
                                            size={'small'}
                                            required
                                            name="username"
                                            onChange={handleChange}
                                            value={empData.CNIC}
                                            label="CNIC No"
                                            disabled
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.8} md={3.8} sm={12} xs={12}>
                                        <TextValidator
                                            size={'small'}
                                            name="PMC_Regno"
                                            required
                                            onChange={handleChange}
                                            value={PMC_Regno || ''}
                                            label="Registration No"
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        <TextValidator
                                            size={'small'}
                                            name="RegnoExpDate"
                                            required
                                            type="date"
                                            onChange={handleChange}
                                            value={RegnoExpDate || ''}
                                            label="Registration Expiry Date"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                {/* </ValidatorForm> */}
                                <H4
                                    style={{
                                        color: 'grey',
                                        marginTop: 10,
                                        textAlign: 'left',
                                    }}
                                >
                                    Address Information
                                </H4>
                                <Grid container>
                                    <Grid lg={5.75} md={5.75} sm={12} xs={12}>
                                        <TextValidator
                                            size={'small'}
                                            required
                                            name="PostalAddress"
                                            onChange={handleChange}
                                            value={PostalAddress || ''}
                                            label="Postal Address *"
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={5.75} md={5.75} sm={12} xs={12}>
                                        <TextValidator
                                            size={'small'}
                                            name="PerAddress"
                                            onChange={handleChange}
                                            value={PerAddress || ''}
                                            required
                                            label="Permanent Address *"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <LoadingButton
                                            type="submit"
                                            loading={loading}
                                            loadingIndicator="Loading…"
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            UPDATE PROFILE
                                        </LoadingButton>
                                        <Button
                                            onClick={() => SET_INITIAL_VALUE()}
                                            color="secondary"
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2, ml: 1 }}
                                        >
                                            CANCEL
                                        </Button>
                                    </Grid>
                                </Grid>
                            </SimpleCard>
                        </Grid>
                    </Grid>
                    {/* EDUCATION CARD */}
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
                        Record updated successfully.
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default SimpleForm
