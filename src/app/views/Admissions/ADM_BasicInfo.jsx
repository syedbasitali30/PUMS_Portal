import {
    Button,
    Grid,
    Snackbar,
    Alert,
    Dialog,
    DialogContent,
} from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import ip from '../DB/IP_Address'
import axios from 'axios'
import { loadError, loadProgress, authLogin } from 'app/redux/action'
import { NavLink, useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import warningImg from '../../components/MatxLogo/warning.png'
import checkImg from '../../components/MatxLogo/check.png'
import cancelImg from '../../components/MatxLogo/cancel.png'
import Typography from '@mui/material/Typography'
import InputMask from 'react-input-mask'

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

const styles = {
    textBox_Margin: {
        marginBottom: -2,
    },
    model_button: {
        color: '#1976d2',
        borderWidth: 3,
        borderStyle: 'solid',
        width: '50%',
        borderRadius: 50,
        marginTop: 25,
        marginBottom: 10,
    },
}

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

const SimpleForm = () => {
    const userData = useSelector((data) => data.loginReducer.LoginData)
    const APLdata = JSON.parse(localStorage.getItem('checkUserAPL'))[0]
    console.log(APLdata)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    //
    const [loading, setloading] = useState(false)
    const [ProfilePicture, setProfilePicture] = useState('')
    const [InitialProfile, setInitialProfile] = useState('')
    const [ProfileColor, setProfileColor] = useState('#ea5a4f')
    const [open, setOpen] = React.useState(false)
    const [OpenError, setOpenError] = React.useState(false)
    const [openAlert, setopenAlert] = React.useState(false)
    const [messageError, setmessageError] = React.useState('')

    const [message, setMessage] = React.useState({
        messageTitle: 'Application Under Review!',
        message:
            'Please note that you are currently unable to edit your application information. This is because your application is undergoing review.',
        image: warningImg,
        button: 'OK, I Unserstand',
    })
    //
    const [state, setState] = useState({ Hafiz: '', Disabled: '' })
    const [DistrictArray, setDistrictArray] = useState([])
    const [ddlState, setddlState] = useState([])

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    useEffect(() => {
        GETALL_STATE()
        setState({
            ...state,
            CandidateContact: 0 + userData.CONTACT,
            ADM_RegistraionID: userData._id,
            DOB: moment(new Date()).format('YYYY-MM-DD'),
            CANDIDATE_NAME: userData.CANDIDATE_NAME,
            CNIC: userData.CNIC,
        })
    }, [])

    useEffect(() => {
        if (userData.BasicInfo == 0) {
            setInitialProfile(
                'https://raw.githubusercontent.com/syedbasitali30/images/main/initial_profile.jpg'
            )
        } else {
            setInitialProfile(
                ip.admission + 'uploads/ADM_Profile/' + userData.CNIC + '.jpg'
            )
            setProfileColor('#4cb050')
        }
    }, [])

    const isAllDigits = (e, fiels) => {
        // Regular expression that matches any sequence of digits
        const regex = /^\d+$/

        // Check if the phone number matches the regex
        const result = regex.test(e.target.value)
        //
        if (!result) {
            setmessageError('[ ' + fiels + ' ] must filled with all digits.')
            setOpenError(true)
            //
            setState({
                ...state,
                [e.target.name]: '',
            })
        }
    }

    const handleSubmit = (event) => {
        if (APLdata === undefined || APLdata.length == 0) {
            if (ProfilePicture == '' && userData.BasicInfo == 0) {
                setmessageError('Please select profile picture')
                setOpenError(true)
            } else {
                dispatch(loadProgress(true))
                setloading(true)
                SAVE_BASIC_INFO()
            }
        } else {
            setopenAlert(true)
        }
    }

    const handleChange = (event) => {
        // event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const GETALL_DISTRICT = (v, arr) => {
        const filteredData = arr.filter((item) => item.STATE_TITLE === v)

        axios
            .get(
                ip.admission + 'ADM_State/getDis_byState/' + filteredData[0]._id
            )
            .then((res) => {
                setDistrictArray(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const GETALL_STATE = () => {
        axios
            .get(ip.admission + 'ADM_State/getAll')
            .then((res) => {
                setddlState(res.data)
                if (userData.BasicInfo == 1) {
                    GET_BASIC_INFO(res.data)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const SAVE_BASIC_INFO = () => {
        axios
            .post(
                ip.admission +
                    'ADM_BasicInfo/postAndUpdate/' +
                    userData.BasicInfo,
                state
            )
            .then((res) => {
                //
                sendFile({ folder: 'ADM_Profile', file: ProfilePicture })
                if (userData.BasicInfo == 0) {
                    UPDATE_BASIC_INFO_USER()
                } else {
                    dispatch(loadProgress(false))
                    setOpen(true)
                    setloading(false)
                }
            })
            .catch(function (error) {
                dispatch(loadError(true))
                setTimeout(() => {
                    dispatch(loadError(false))
                    setloading(false)
                }, 3000)
                console.log(error)
            })
    }

    const GET_BASIC_INFO = (v) => {
        axios
            .get(
                ip.admission + 'ADM_BasicInfo/getOne_ForUpdate/' + userData._id
            )
            .then((res) => {
                //
                const dData = res.data[0]
                GETALL_DISTRICT(dData.State, v)
                setState(dData)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const UPDATE_BASIC_INFO_USER = () => {
        axios
            .get(ip.admission + 'ADM_Registration/updateImage/' + userData._id)
            .then((res) => {
                dispatch(authLogin(res.data))
                localStorage.setItem('authData', JSON.stringify(res.data))
                //
                dispatch(loadProgress(false))
                setOpen(true)
                setTimeout(() => {
                    navigate('/Admission/ADM_Education')
                    setloading(false)
                    window.location.reload()
                }, 2000)
                //
                setState({
                    ...state,
                    CandidateContact: 0 + userData.CONTACT,
                    ADM_RegistraionID: userData._id,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const sendFile = (val) => {
        const data = new FormData()
        const file = val.file
        data.append('image', file)

        axios({
            method: 'post',
            data: data,
            url:
                ip.admission +
                'applicantImg/upload?folder=' +
                val.folder +
                '&CNIC=' +
                userData.CNIC,
            headers: { 'content-type': 'multipart/form-data' },
        })
    }

    const {
        ADM_RegistraionID,
        Cast,
        DOB,
        Gender,
        CandidateContact,
        Relegion,
        State,
        District,
        Disabled,
        Hafiz,
        FName,
        F_CNIC,
        F_Mobile,
        Home_Contact,
        OfficeContact,
        Eme_Name,
        Eme_Relation,
        Eme_Contact,
        Eme_Address,
        PostalCity,
        PostalAddress,
    } = state

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
                            { name: 'Basic Info' },
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
                                height: '50%',
                            }}
                        >
                            <SimpleCard>
                                <H4>PROFILE</H4>
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
                                            borderWidth: 3,
                                            borderStyle: 'solid',
                                            borderColor: ProfileColor,
                                            padding: 3,
                                        }}
                                        // https://raw.githubusercontent.com/syedbasitali30/images/main/initial_profile.jpg
                                        src={
                                            ProfilePicture == ''
                                                ? InitialProfile
                                                : URL.createObjectURL(
                                                      ProfilePicture
                                                  )
                                        }
                                        width="140"
                                        height="140"
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
                                            marginTop: '12px',
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
                                                    setProfileColor('#4cb050')
                                                }}
                                                required
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
                                    {userData.CANDIDATE_NAME}
                                </H4>
                                <div
                                    style={{
                                        marginTop: -15,
                                        color: 'black',
                                        textAlign: 'center',
                                        fontSize: 12,
                                        color: '#808080',
                                    }}
                                >
                                    {userData.EMAIL}
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
                                            value={userData.CANDIDATE_NAME}
                                            validators={['required']}
                                            label="Candidate Name *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                            disabled
                                        />
                                        <Space />
                                        <TextField
                                            size={'small'}
                                            label="Cast *"
                                            onChange={handleChange}
                                            type="text"
                                            name="Cast"
                                            value={Cast || ''}
                                            validators={['required']}
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>
                                <Space />

                                {/* 3 IN LINE */}

                                <Grid container>
                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        <TextField
                                            style={{
                                                backgroundColor: '#f0f0f0',
                                            }}
                                            size={'small'}
                                            type="number"
                                            name="username"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={userData.CNIC}
                                            validators={['required']}
                                            label="CNIC No"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                            disabled
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.8} md={3.8} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="date"
                                            name="DOB"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={DOB || ''}
                                            validators={['required']}
                                            label="Date of Birth *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        {/* <TextField
                                            size={'small'}
                                            type="text"
                                            name="Gender"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Gender || ''}
                                            validators={['required']}
                                            label="Gender *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        /> */}
                                        <Select
                                            style={styles.textBox_Margin}
                                            size="small"
                                            displayEmpty
                                            fullWidth
                                            value={Gender || ''}
                                            name="Gender"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>Select Gender</em>
                                            </MenuItem>
                                            <MenuItem value={'Female'}>
                                                Female
                                            </MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>

                                <Space />

                                {/*  */}

                                <Grid container>
                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        <InputMask
                                            mask="99999999999"
                                            onChange={handleChange}
                                            value={CandidateContact || ''}
                                            onBlur={(e) =>
                                                isAllDigits(e, 'Contact No')
                                            }
                                        >
                                            {() => (
                                                <TextField
                                                    size={'small'}
                                                    name="CandidateContact"
                                                    id="standard-basic"
                                                    validators={['required']}
                                                    label="Contact No *"
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                />
                                            )}
                                        </InputMask>
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.8} md={3.8} sm={12} xs={12}>
                                        <TextField
                                            style={{
                                                backgroundColor: '#f0f0f0',
                                            }}
                                            size={'small'}
                                            type="text"
                                            name="username"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={userData.EMAIL}
                                            validators={['required']}
                                            label="Email *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                            disabled
                                        />
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={3.6} md={3.6} sm={12} xs={12}>
                                        {/* <TextField
                                            size={'small'}
                                            type="text"
                                            name="Relegion"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Relegion || ''}
                                            validators={['required']}
                                            label="Religion *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        /> */}
                                        <Select
                                            style={styles.textBox_Margin}
                                            size="small"
                                            displayEmpty
                                            fullWidth
                                            value={Relegion || ''}
                                            name="Relegion"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>Select Relegion</em>
                                            </MenuItem>
                                            <MenuItem value={'Islam'}>
                                                Islam
                                            </MenuItem>
                                            <MenuItem value={'Hinduism'}>
                                                Hinduism
                                            </MenuItem>
                                            <MenuItem value={'Christianity'}>
                                                Christianity
                                            </MenuItem>
                                            <MenuItem value={'Buddhism'}>
                                                Buddhism
                                            </MenuItem>
                                            <MenuItem value={'Atheism'}>
                                                Atheism
                                            </MenuItem>
                                            <MenuItem value={'Judaism'}>
                                                Judaism
                                            </MenuItem>
                                            <MenuItem value={'Monotheism'}>
                                                Monotheism
                                            </MenuItem>
                                            <MenuItem value={'Sikhism'}>
                                                Sikhism
                                            </MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>

                                <Space />

                                {/*  */}

                                <Grid container>
                                    <Grid lg={5.75} md={5.75} sm={12} xs={12}>
                                        {/* <TextField
                                            size={'small'}
                                            type="text"
                                            name="State"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={State || ''}
                                            validators={['required']}
                                            label="Domicile State *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        /> */}

                                        <Select
                                            style={styles.textBox_Margin}
                                            size="small"
                                            displayEmpty
                                            fullWidth
                                            value={State || ''}
                                            name={'State'}
                                            // onChange={(e, value) => {
                                            //     handleChange
                                            //     GETALL_DISTRICT(value)
                                            // }}
                                            onChange={(e) => {
                                                handleChange(e)
                                                GETALL_DISTRICT(
                                                    e.target.value,
                                                    ddlState
                                                )
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Select provence</em>
                                            </MenuItem>
                                            {ddlState.map((item) => {
                                                return (
                                                    <MenuItem
                                                        key={item.STATE_TITLE}
                                                        value={item.STATE_TITLE}
                                                    >
                                                        {item.STATE_TITLE}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </Grid>

                                    <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={5.75} md={5.75} sm={12} xs={12}>
                                        {/* <TextField
                                            size={'small'}
                                            type="text"
                                            name="District"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={District || ''}
                                            validators={['required']}
                                            label="Domicile District *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        /> */}
                                        <Select
                                            style={styles.textBox_Margin}
                                            size="small"
                                            displayEmpty
                                            fullWidth
                                            value={District || ''}
                                            name={'District'}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>Select District</em>
                                            </MenuItem>
                                            {DistrictArray.map((item) => {
                                                return (
                                                    <MenuItem
                                                        key={
                                                            item.DISTRICT_TITLE
                                                        }
                                                        value={
                                                            item.DISTRICT_TITLE
                                                        }
                                                    >
                                                        {item.DISTRICT_TITLE}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </Grid>
                                </Grid>

                                <Space />

                                {/*  */}

                                <Grid container style={{ display: 'none' }}>
                                    <Grid lg={12} md={12} sm={12} xs={12}>
                                        {/* <TextField
                                            size={'small'}
                                            type="text"
                                            name="Disabled"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={Disabled || ''}
                                            validators={['required']}
                                            label="Disabled"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        /> */}
                                        <Select
                                            style={styles.textBox_Margin}
                                            size="small"
                                            displayEmpty
                                            fullWidth
                                            value={Disabled || ''}
                                            name="Disabled"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>Select Disabled</em>
                                            </MenuItem>
                                            <MenuItem value={'Yes'}>
                                                Yes
                                            </MenuItem>
                                            <MenuItem value={'No'}>No</MenuItem>
                                        </Select>
                                    </Grid>

                                    {/* <Grid lg={0.5} md={0.5}></Grid>

                                    <Grid lg={5.75} md={5.75} sm={12} xs={12}>
                                        
                                        <Select
                                            style={styles.textBox_Margin}
                                            size="small"
                                            displayEmpty
                                            fullWidth
                                            value={Hafiz || ''}
                                            name="Hafiz"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>Select Hafiz Quran</em>
                                            </MenuItem>
                                            <MenuItem value={'Yes'}>
                                                Yes
                                            </MenuItem>
                                            <MenuItem value={'No'}>No</MenuItem>
                                        </Select>
                                    </Grid> */}
                                </Grid>
                                {/* </ValidatorForm> */}
                            </SimpleCard>
                        </Grid>
                    </Grid>
                    {/* SECOND INFORMATION GRID */}
                    <Grid container spacing={4} sx={{ mt: 0 }}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <SimpleCard title="Father Information">
                                <Grid lg={12} md={12} sm={12} xs={12}>
                                    <TextField
                                        size={'small'}
                                        type="text"
                                        name="FName"
                                        id="standard-basic"
                                        onChange={handleChange}
                                        value={FName || ''}
                                        validators={['required']}
                                        label="Father's Name *"
                                        errorMessages={[
                                            'This field is required',
                                        ]}
                                    />

                                    <Space />

                                    <InputMask
                                        mask="9999999999999"
                                        value={F_CNIC || ''}
                                        onChange={handleChange}
                                        onBlur={(e) =>
                                            isAllDigits(e, 'Father CNIC')
                                        }
                                    >
                                        {() => (
                                            <TextField
                                                size={'small'}
                                                name="F_CNIC"
                                                id="standard-basic"
                                                validators={['required']}
                                                label="CNIC No *"
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                                helperText="Without dashes Exp: 4540298765432"
                                            />
                                        )}
                                    </InputMask>

                                    {/* <Space /> */}

                                    <InputMask
                                        mask="99999999999"
                                        onChange={handleChange}
                                        value={F_Mobile || ''}
                                        onBlur={(e) =>
                                            isAllDigits(e, 'Father Mobile No')
                                        }
                                    >
                                        {() => (
                                            <TextField
                                                size={'small'}
                                                type="text"
                                                name="F_Mobile"
                                                id="standard-basic"
                                                validators={['required']}
                                                label="Mobile No *"
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                                helperText="Without dashes Exp: 03331234567"
                                            />
                                        )}
                                    </InputMask>

                                    {/* <Space /> */}

                                    <InputMask
                                        mask="99999999999"
                                        onChange={handleChange}
                                        value={Home_Contact || ''}
                                        onBlur={(e) =>
                                            isAllDigits(
                                                e,
                                                'Father Home Contact'
                                            )
                                        }
                                    >
                                        {() => (
                                            <TextField
                                                size={'small'}
                                                name="Home_Contact"
                                                id="standard-basic"
                                                label="Home Contact"
                                            />
                                        )}
                                    </InputMask>

                                    <Space />

                                    <InputMask
                                        mask="99999999999"
                                        onChange={handleChange}
                                        value={OfficeContact || ''}
                                        onBlur={(e) =>
                                            isAllDigits(
                                                e,
                                                'Father Office Contact'
                                            )
                                        }
                                    >
                                        {() => (
                                            <TextField
                                                size={'small'}
                                                name="OfficeContact"
                                                id="standard-basic"
                                                label="Office Contact"
                                            />
                                        )}
                                    </InputMask>

                                    <Space />
                                </Grid>
                            </SimpleCard>
                        </Grid>
                        {/*  */}
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <SimpleCard title="Emergency Contact Information">
                                <Grid lg={12} md={12} sm={12} xs={12}>
                                    <TextField
                                        size={'small'}
                                        type="text"
                                        name="Eme_Name"
                                        id="standard-basic"
                                        onChange={handleChange}
                                        value={Eme_Name || ''}
                                        validators={['required']}
                                        label="Name *"
                                        errorMessages={[
                                            'This field is required',
                                        ]}
                                    />

                                    <Space />

                                    <TextField
                                        size={'small'}
                                        type="text"
                                        name="Eme_Relation"
                                        id="standard-basic"
                                        onChange={handleChange}
                                        value={Eme_Relation || ''}
                                        validators={['required']}
                                        label="Relation *"
                                        errorMessages={[
                                            'This field is required',
                                        ]}
                                    />

                                    <Space />

                                    <InputMask
                                        mask="99999999999"
                                        onChange={handleChange}
                                        value={Eme_Contact || ''}
                                        onBlur={(e) =>
                                            isAllDigits(e, 'Emergency Contact')
                                        }
                                    >
                                        {() => (
                                            <TextField
                                                size={'small'}
                                                name="Eme_Contact"
                                                id="standard-basic"
                                                validators={['required']}
                                                label="Contact *"
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                                helperText="Without dashes Exp: 03331234567"
                                            />
                                        )}
                                    </InputMask>

                                    {/* <Space /> */}

                                    <TextField
                                        size={'small'}
                                        type="text"
                                        name="Eme_Address"
                                        id="standard-basic"
                                        onChange={handleChange}
                                        value={Eme_Address || ''}
                                        validators={['required']}
                                        label="Address *"
                                        errorMessages={[
                                            'This field is required',
                                        ]}
                                    />

                                    {/* <Space /> */}
                                </Grid>
                            </SimpleCard>
                        </Grid>
                    </Grid>
                    {/* THIRD INFO TAB */}
                    <Grid container spacing={4} sx={{ mt: 0 }}>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            sx={{ mt: 2 }}
                        >
                            <SimpleCard title="Postal Information">
                                <Grid container>
                                    <Grid lg={5.75} md={5.75} sm={12} xs={12}>
                                        <TextField
                                            size={'small'}
                                            type="text"
                                            name="PostalCity"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={PostalCity || ''}
                                            validators={['required']}
                                            label="City *"
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
                                            name="PostalAddress"
                                            id="standard-basic"
                                            onChange={handleChange}
                                            value={PostalAddress || ''}
                                            validators={['required']}
                                            label="Address *"
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>

                                <Space />

                                <LoadingButton
                                    type="submit"
                                    // onClick={() => setloading(true)}
                                    loading={loading}
                                    loadingIndicator="Loading…"
                                    variant="contained"
                                >
                                    Save and Next
                                </LoadingButton>

                                <LoadingButton
                                    onClick={() =>
                                        navigate('/Admission/ADM_Dashboard')
                                    }
                                    color="secondary"
                                    variant="contained"
                                    style={{ marginLeft: 10 }}
                                >
                                    Cancel
                                </LoadingButton>
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
                        information saved successfully.
                    </Alert>
                </Snackbar>
                {/*  */}
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
            </Container>
            {/*  */}
            <Dialog
                fullWidth
                maxWidth={'xs'}
                open={openAlert}
                onClose={() => setopenAlert(false)}
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
                                fontSize: 16,
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
                                    setopenAlert(false)
                                }}
                                style={styles.model_button}
                                color="primary"
                            >
                                {message.button}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SimpleForm
