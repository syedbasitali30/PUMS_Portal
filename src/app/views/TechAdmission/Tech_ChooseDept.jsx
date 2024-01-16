import React, { useState, useEffect } from 'react'
import {
    Alert,
    Card,
    Snackbar,
    styled,
    Dialog,
    DialogContent,
    Grid,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Box, Table } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import ip from '../DB/IP_Address'
import axios from 'axios'
import { loadError, loadProgress, authLogin } from 'app/redux/action'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import warningImg from '../../components/MatxLogo/warning.png'
import checkImg from '../../components/MatxLogo/correct.png'
import cancelImg from '../../components/MatxLogo/cancel.png'
//
const styles = {
    textBox_Margin: {
        marginBottom: -2,
    },
    span_font: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    div_space_5: {
        marginBottom: 8,
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

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const CardHeader = styled(Box)(() => ({
    display: 'flex',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
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

const StatCards2 = () => {
    const sessionData = useSelector((data) => data.userDataReducer.SessionData)
    const userData = useSelector((data) => data.loginReducer.LoginData)
    // console.log(userData)
    //
    useEffect(() => {
        GET_EDU_DATA()
        // GET_DOB_DATA()
        // GET_DEPT()
    }, [])
    //
    const [SelectDept, setSelectDept] = useState([])
    const [DeptList, setDeptList] = useState([])
    const [UserAge, setUserAge] = useState('')
    //
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //
    const SAVE_ELECTIVE_SUB = () => {
        dispatch(loadProgress(true))
        setdisableBtn(true)
        setOpenConfirm(false)
        // return false
        const dataTosend = {
            ADM_RegistraionID: userData._id,
            ADM_SessionID: sessionData._id,
            SelectedDept: SelectDept,
            RollNo: RollNo,
            TestCenter: TestCenter,
            Score: Score,
            ScoreOutof: ScoreOutof,
        }
        axios
            .post(ip.admission + 'ADM_ProgramApplied/post_tech/', dataTosend)
            .then((res) => {
                dispatch(loadProgress(false))
                setOpenBar(true)

                setTimeout(() => {
                    navigate('/Tech/Tech_Dashboard')
                    setloading(false)
                }, 2000)
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

    function GET_EDU_DATA() {
        axios
            .get(
                ip.admission + 'ADM_Education/getEducationData/' + userData._id
            )
            .then((res) => {
                var iData = res.data.Inter_Info[0].I_Percentage
                GET_DOB_DATA(iData)
            })
            .catch(function (error) {
                console.log(error)
                alert('error')
            })
    }

    function GET_DOB_DATA(v) {
        axios
            .get(ip.admission + 'ADM_BasicInfo/getDOBdata/' + userData._id)
            .then((res) => {
                var iData = res.data
                // alert(iData.DOB)
                setUserAge(iData.DOB)
                GET_DEPT(parseInt(v), iData.DOB)
            })
            .catch(function (error) {
                console.log(error)
                alert('error')
            })
    }

    function calculateAgeYears(birthDate) {
        // Ensure birthDate is a valid Date object:
        if (!(birthDate instanceof Date)) {
            birthDate = new Date(birthDate) // Parse it if it's not already a Date
        }

        const currentDate = new Date()
        const ageInMilliseconds = currentDate.getTime() - birthDate.getTime()
        const ageInYears = Math.floor(
            ageInMilliseconds / (1000 * 3600 * 24 * 365.25) + 0.5
        )
        return ageInYears
    }

    const GET_DEPT = (Per, DOB) => {
        axios
            .get(
                ip.admission +
                    'ADM_Department/getByDistrict/' +
                    userData._id +
                    '|Tech'
            )
            .then((res) => {
                // setDeptList(res.data)
                // console.log(Per)
                // console.log(res.data)

                const employees = []

                for (let i = 0; i < res.data.length; i++) {
                    if (Per >= res.data[i].PERCENTAGE) {
                        const newEmployee = {
                            _id: res.data[i]._id,
                            DEPT_NAME: res.data[i].DEPT_NAME,
                            PERCENTAGE: parseInt(res.data[i].PERCENTAGE),
                        }
                        employees.push(newEmployee)
                    }
                }

                // UserAge
                const birthDate = new Date(DOB)
                const ageInYears = calculateAgeYears(birthDate)
                // console.log('Age in years:', ageInYears) // Output: 21

                // const age = calculateAgeYears(DOB)
                // console.log(age)

                if (ageInYears >= 17 && ageInYears <= 25) {
                } else {
                    setMessage({
                        messageTitle: 'Not Eligible!',
                        message:
                            'We appreciate you applying to Admissions 2023-24. Based on our current admissions criteria, Age limit is 17 - 25 years. For more information please read University Admission criteria.',
                        image: cancelImg,
                        button: 'Go to Dashboard',
                    })
                    setOpen(true)
                }

                if (employees === undefined || employees.length == 0) {
                    // array does not exist or is empty
                    setMessage({
                        messageTitle: 'Not Eligible!',
                        message:
                            'We appreciate you applying to Admissions 2023-24. Based on our current admissions criteria, we are unable to offer you any program. For more information please read University Admission criteria.',
                        image: cancelImg,
                        button: 'Go to Dashboard',
                    })
                    setOpen(true)
                    setDeptList(employees)
                } else {
                    // console.log(employees)
                    setDeptList(employees)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const [loading, setloading] = useState(false)
    const [open, setOpen] = useState(false)
    const [OpenBar, setOpenBar] = useState(false)
    const [openErr, setOpenErr] = useState(false)
    const [disableBtn, setdisableBtn] = useState(false)
    const [OpenConfirm, setOpenConfirm] = useState(false)
    const [ErrMessage, setErrMessage] = useState('')
    const [message, setMessage] = React.useState({
        messageTitle: 'Alert!',
        message: 'Are you sure you want to continue?',
        image: warningImg,
        button: 'yes, continue',
    })
    //
    const [state, setState] = useState({
        RollNo: '',
        TestCenter: '',
        Score: '',
        ScoreOutof: '',
    })

    const SaveData = () => {
        if (SelectDept == '') {
            setErrMessage('Please Select Department.')
            setOpenErr(true)
        } else if (SelectDept.length != DeptList.length) {
            setErrMessage(
                'Please select all [ ' +
                    DeptList.length +
                    ' ] departments to complete your application.'
            )
            setOpenErr(true)
        } else {
            setOpenConfirm(true)
        }
    }

    const handleSubmit = () => {}

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const { RollNo, TestCenter, Score, ScoreOutof } = state

    return (
        <div>
            {/*  */}

            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            {
                                name: 'Dashboard',
                                path: '/Tech/Choose Department',
                            },
                            { name: 'Choose Department' },
                        ]}
                    />
                </div>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                        <CardHeader>
                            <Title>Select Departments</Title>
                        </CardHeader>

                        <Box width="100%">
                            <div style={{ margin: 30, marginTop: 10 }}>
                                <div style={{ marginTop: 20 }}></div>
                                <Autocomplete
                                    size={'large'}
                                    fullWidth
                                    onChange={(event, value) => {
                                        setSelectDept(value)
                                    }}
                                    // loading={true}
                                    multiple
                                    limitTags={5}
                                    id="multiple-limit-tags"
                                    options={DeptList}
                                    getOptionLabel={(option) =>
                                        option.DEPT_NAME
                                    }
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="-- Select Departments"
                                            placeholder="Departments"
                                        />
                                    )}
                                />

                                <Grid
                                    container
                                    spacing={4}
                                    sx={{ m: 0, mb: -2 }}
                                >
                                    {SelectDept.map((e, index) => {
                                        return (
                                            <Grid
                                                key={index}
                                                lg={4}
                                                md={4}
                                                sm={12}
                                                xs={12}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        backgroundColor:
                                                            '#ebebeb',
                                                        padding: 10,
                                                        borderRadius: 5,
                                                        width: '93%',
                                                        marginBottom: 15,
                                                    }}
                                                >
                                                    <img
                                                        src={checkImg}
                                                        width="40px"
                                                        style={{
                                                            paddingRight: 10,
                                                        }}
                                                    ></img>

                                                    <div>
                                                        <b>
                                                            Choice {index + 1}
                                                        </b>
                                                        <div
                                                            style={{
                                                                color: '#767676',
                                                            }}
                                                        >
                                                            {e.DEPT_NAME}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        )
                                    })}
                                </Grid>

                                <div
                                    style={
                                        sessionData.MDCAT === 'Yes'
                                            ? {}
                                            : { display: 'none' }
                                    }
                                >
                                    <div style={styles.div_space_5}>
                                        <span style={styles.span_font}>
                                            MDCAT Details
                                        </span>
                                    </div>

                                    <TextField
                                        size={'small'}
                                        onChange={handleChange}
                                        type="text"
                                        validators={['required']}
                                        errorMessages={[
                                            'This field is required',
                                        ]}
                                        name="RollNo"
                                        value={RollNo || ''}
                                        label="MDCAT Roll No"
                                    />

                                    <TextField
                                        size={'small'}
                                        onChange={handleChange}
                                        type="text"
                                        validators={['required']}
                                        errorMessages={[
                                            'This field is required',
                                        ]}
                                        name="TestCenter"
                                        value={TestCenter || ''}
                                        label="MDCAT Test Centre"
                                    />

                                    <TextField
                                        size={'small'}
                                        onChange={handleChange}
                                        type="text"
                                        validators={['required']}
                                        errorMessages={[
                                            'This field is required',
                                        ]}
                                        name="Score"
                                        value={Score || ''}
                                        label="MDCAT Score"
                                    />

                                    <TextField
                                        size={'small'}
                                        onChange={handleChange}
                                        type="text"
                                        validators={['required']}
                                        errorMessages={[
                                            'This field is required',
                                        ]}
                                        name="ScoreOutof"
                                        value={ScoreOutof || ''}
                                        label="MDCAT Score out of"
                                    />
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    borderTop: '1px solid #e0e0e0 ',
                                    marginTop: 2,
                                }}
                            ></div>

                            <div
                                style={{
                                    padding: 30,
                                }}
                            >
                                <LoadingButton
                                    type="submit"
                                    onClick={() => SaveData()}
                                    loading={loading}
                                    loadingIndicator="Loading…"
                                    variant="contained"
                                    disabled={disableBtn}
                                >
                                    Apply for Admission
                                </LoadingButton>

                                <LoadingButton
                                    onClick={() => setloading(false)}
                                    color="secondary"
                                    variant="contained"
                                    style={{ marginLeft: 10 }}
                                >
                                    Cancel
                                </LoadingButton>
                            </div>
                        </Box>
                    </Card>
                </ValidatorForm>
                {/*  */}
                <Snackbar
                    open={OpenBar}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    onClose={() => setOpenBar(false)}
                >
                    <Alert
                        onClose={() => setOpenBar(false)}
                        sx={{ width: '100%' }}
                        severity={'success'}
                        variant="filled"
                    >
                        Record successfully saved! Head over to Dashboard now.
                    </Alert>
                </Snackbar>
            </Container>
            {/*  */}
            <Snackbar
                open={openErr}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={() => setOpenErr(false)}
            >
                <Alert
                    onClose={() => setOpenErr(false)}
                    sx={{ width: '100%' }}
                    severity={'error'}
                    variant="filled"
                >
                    {ErrMessage}
                </Alert>
            </Snackbar>
            {/*  */}
            <Dialog fullWidth maxWidth={'xs'} open={open}>
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
                                    navigate('/Tech/Tech_Dashboard')
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
            {/*  */}
            <Dialog
                fullWidth
                maxWidth={'xs'}
                open={OpenConfirm}
                onClose={() => {
                    setOpenConfirm(false)
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
                            <img src={warningImg} width="90px"></img>
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
                            Ready to Countinue?
                        </Typography>
                        <Typography
                            style={{
                                color: 'grey',
                                textAlign: 'center',
                                fontSize: 16,
                            }}
                        >
                            Looks Good!.. Please review your departments
                            selection. Is everything correct? If so, click
                            Continue to complete your application.
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
                                    SAVE_ELECTIVE_SUB()
                                }}
                                style={styles.model_button}
                                color="primary"
                            >
                                Yes, Continue
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
                                onClick={() => setOpenConfirm(false)}
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
        </div>
    )
}

export default StatCards2
