import React, { useState, useEffect } from 'react'
import {
    Alert,
    Button,
    Card,
    FormControlLabel,
    Radio,
    RadioGroup,
    Snackbar,
    styled,
    useTheme,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Box,
    TableBody,
    Table,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import ip from '../DB/IP_Address'
import axios from 'axios'
import { loadError, loadProgress, authLogin } from 'app/redux/action'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import warningImg from '../../components/MatxLogo/warning.png'
import checkImg from '../../components/MatxLogo/check.png'
import cancelImg from '../../components/MatxLogo/cancel.png'
import Typography from '@mui/material/Typography'
//
const styles = {
    textBox_Margin: {
        marginBottom: -2,
    },
    disable_box: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#c4c4c4',
        padding: 8,
        borderRadius: 5,
        paddingLeft: 15,
        backgroundColor: '#f0f0f0',
        paddingTop: 9,
    },
    disable_box_font: {
        fontWeight: 500,
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

const ContentBox = styled('div')(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
}))

const StatCards2 = () => {
    const userData = useSelector((data) => data.loginReducer.LoginData)
    const APLdata = JSON.parse(localStorage.getItem('checkUserAPL'))[0]

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (userData.Education == 1) {
            GET_EDUCATION_INFO()
        }
    }, [])
    //
    const SAVE_EDUCATION = () => {
        const dataTosend = {
            ADM_RegistraionID: userData._id,
            _id: state._id,
            Matric_Info: {
                M_Degree: M_Degree,
                M_Board: M_Board,
                M_PassingYear: M_PassingYear,
                M_SeatNo: M_SeatNo,
                M_ResultDate: M_ResultDate,
                M_MarksObt: M_MarksObt,
                M_MarksTotal: M_MarksTotal,
                M_Percentage: M_Percentage,
                M_Grade: M_Grade,
            },
            Inter_Info: {
                I_Degree: I_Degree,
                I_Board: I_Board,
                I_PassingYear: I_PassingYear,
                I_SeatNo: I_SeatNo,
                I_ResultDate: I_ResultDate,
                I_MarksObt: I_MarksObt,
                I_MarksTotal: I_MarksTotal,
                I_Percentage: I_Percentage,
                I_Grade: I_Grade,
            },
        }
        axios
            .post(
                ip.admission +
                    'ADM_Education/postAndUpdate/' +
                    userData.Education,
                dataTosend
            )
            .then((res) => {
                //
                sendFile({ folder: 'ADM_MatricImage', file: MatricPicture })
                sendFile({ folder: 'ADM_InterImage', file: InterPicture })
                // UPDATE_EDUCATION_USER()
                if (userData.Education == 0) {
                    UPDATE_EDUCATION_USER()
                } else {
                    dispatch(loadProgress(false))
                    setOpenMessage({
                        type: 'success',
                        message: 'Record Saved Successfully',
                    })
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

    const GET_EDUCATION_INFO = () => {
        axios
            .get(
                ip.admission + 'ADM_Education/getEducationData/' + userData._id
            )
            .then((res) => {
                //
                const dData = res.data
                const mData = dData.Matric_Info[0]
                const iData = dData.Inter_Info[0]
                setState({
                    ...state,
                    M_Degree: mData.M_Degree,
                    M_Board: mData.M_Board,
                    M_PassingYear: mData.M_PassingYear,
                    M_ResultDate: mData.M_ResultDate,
                    M_MarksObt: mData.M_MarksObt,
                    M_MarksTotal: mData.M_MarksTotal,
                    M_SeatNo: mData.M_SeatNo,
                    M_Percentage: mData.M_Percentage,
                    M_Grade: mData.M_Grade,
                    //
                    I_Degree: iData.I_Degree,
                    I_Board: iData.I_Board,
                    I_PassingYear: iData.I_PassingYear,
                    I_ResultDate: iData.I_ResultDate,
                    I_MarksObt: iData.I_MarksObt,
                    I_MarksTotal: iData.I_MarksTotal,
                    I_SeatNo: iData.I_SeatNo,
                    I_Percentage: iData.I_Percentage,
                    I_Grade: iData.I_Grade,
                    //
                    _id: dData._id,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const UPDATE_EDUCATION_USER = () => {
        axios
            .get(
                ip.admission +
                    'ADM_Registration/updateEducation/' +
                    userData._id
            )
            .then((res) => {
                dispatch(authLogin(res.data))
                localStorage.setItem('authData', JSON.stringify(res.data))
                //
                dispatch(loadProgress(false))
                setOpenMessage({
                    type: 'success',
                    message: 'Record Saved Successfully',
                })
                setOpen(true)

                setTimeout(() => {
                    navigate('/Tech/Tech_Dashboard')
                    setloading(false)
                }, 2000)
                setState({
                    M_ResultDate: new Date(),
                    I_ResultDate: new Date(),
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
    //
    const [loading, setloading] = useState(false)
    const [MatricPicture, setMatricPicture] = useState('')
    const [isM_Image, setisM_Image] = useState('0')
    const [InterPicture, setInterPicture] = useState('')
    const [isI_Image, setisI_Image] = useState('0')
    const [visstate, setvisstate] = useState('hidden')
    const [visstate_I, setvisstate_I] = useState('hidden')
    const [OpenMatricImage, setOpenMatricImage] = useState(false)
    const [OpenInterImage, setOpenInterImage] = useState(false)
    const [open, setOpen] = useState(false)
    const [openMessage, setOpenMessage] = useState({ type: '', message: '' })
    const [openAlert, setopenAlert] = React.useState(false)

    const [message, setMessage] = React.useState({
        messageTitle: 'Application Under Review!',
        message:
            'Please note that you are currently unable to edit your application information. This is because your application is undergoing review.',
        image: warningImg,
        button: 'OK, I Unserstand',
    })
    //
    const theme = useTheme()
    const { palette } = useTheme()
    //

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    //
    const bgPrimary = palette.primary.main
    const bgSuccess = palette.success.main
    //
    const BoardMatricArray = [
        { value: 'BISE-Karachi' },
        { value: 'BISE-Hyderabad' },
        { value: 'BISE-Larkana' },
        { value: 'BISE-MirpurKhas' },
        { value: 'BISE-Sukkur' },
        { value: 'BISE-Shaheed Benazirabad' },
        { value: 'BISE-Islamabad' },
        { value: 'BISE-Bahawalpur' },
        { value: 'BISE-Dera Ghazi Khan' },
        { value: 'BISE-Faisalabad' },
        { value: 'BISE-Gujranwala' },
        { value: 'BISE-Lahore' },
        { value: 'BISE-Multan' },
        { value: 'BISE-Rawalpindi' },
        { value: 'BISE-Sargodha' },
        { value: 'BISE-Abbottabad' },
        { value: 'BISE-Bannu' },
        { value: 'BISE-Dera Ismail Khan' },
        { value: 'BISE-Kohat' },
        { value: 'BISE-Malakand' },
        { value: 'BISE-Mardan' },
        { value: 'BISE-Peshawar' },
        { value: 'BISE-Swat' },
        { value: 'BISE-Quetta' },
        { value: 'BISE-Mirpur' },
        { value: 'BISE-Aga Khan' },
        { value: 'BISE-Ziauddin' },
        { value: 'IBCC' },
    ]

    const BoardInterArray = [
        { value: 'BISE-Karachi' },
        { value: 'BISE-Hyderabad' },
        { value: 'BISE-Larkana' },
        { value: 'BISE-MirpurKhas' },
        { value: 'BISE-Sukkur' },
        { value: 'BISE-Shaheed Benazirabad' },
        { value: 'BISE-Islamabad' },
        { value: 'BISE-Bahawalpur' },
        { value: 'BISE-Dera Ghazi Khan' },
        { value: 'BISE-Faisalabad' },
        { value: 'BISE-Gujranwala' },
        { value: 'BISE-Lahore' },
        { value: 'BISE-Multan' },
        { value: 'BISE-Rawalpindi' },
        { value: 'BISE-Sargodha' },
        { value: 'BISE-Abbottabad' },
        { value: 'BISE-Bannu' },
        { value: 'BISE-Dera Ismail Khan' },
        { value: 'BISE-Kohat' },
        { value: 'BISE-Malakand' },
        { value: 'BISE-Mardan' },
        { value: 'BISE-Peshawar' },
        { value: 'BISE-Swat' },
        { value: 'BISE-Quetta' },
        { value: 'BISE-Mirpur' },
        { value: 'BISE-Aga Khan' },
        { value: 'BISE-Ziauddin' },
        { value: 'IBCC' },
    ]

    const YearArray = [
        { value: '2023' },
        { value: '2022' },
        { value: '2021' },
        { value: '2020' },
        { value: '2019' },
        { value: '2018' },
        { value: '2017' },
        { value: '2016' },
        { value: '2015' },
        { value: '2014' },
        { value: '2013' },
        { value: '2012' },
        { value: '2011' },
        { value: '2010' },
        { value: '2009' },
        { value: '2008' },
        { value: '2007' },
        { value: '2006' },
        { value: '2005' },
        { value: '2004' },
        { value: '2003' },
        { value: '2002' },
        { value: '2001' },
        { value: '2000' },
    ]
    //
    const YearArray_Matric = [
        { value: '2021' },
        { value: '2020' },
        { value: '2019' },
        { value: '2018' },
        { value: '2017' },
        { value: '2016' },
        { value: '2015' },
        { value: '2014' },
        { value: '2013' },
        { value: '2012' },
        { value: '2011' },
        { value: '2010' },
        { value: '2009' },
        { value: '2008' },
        { value: '2007' },
        { value: '2006' },
        { value: '2005' },
        { value: '2004' },
        { value: '2003' },
        { value: '2002' },
        { value: '2001' },
        { value: '2000' },
    ]
    //
    const [state, setState] = useState({
        M_ResultDate: new Date(),
        I_ResultDate: new Date(),
    })
    // console.log(state)

    const handleSubmit = (event) => {
        if (APLdata === undefined || APLdata.length == 0) {
            if (MatricPicture == '' && userData.Education == 0) {
                setOpenMessage({
                    type: 'error',
                    message: 'Please Select Matric Image',
                })
                setOpen(true)
                return false
            }
            if (InterPicture == '' && userData.Education == 0) {
                setOpenMessage({
                    type: 'error',
                    message: 'Please Select Inter Image',
                })
                setOpen(true)
                return false
            }
            dispatch(loadProgress(true))
            setloading(true)
            SAVE_EDUCATION()
        } else {
            setopenAlert(true)
        }
    }

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange_M = (date) => {
        setState({
            ...state,
            M_ResultDate: moment(date).format('YYYY-MM-DD'),
        })
    }

    const handleDateChange_I = (date) => {
        setState({
            ...state,
            I_ResultDate: moment(date).format('YYYY-MM-DD'),
        })
    }

    // 40 to 49 = D
    // 50 to 59 = C
    // 60 to 69 = B
    // 70 to 79 = A
    // 80>= A one

    const calculate = (Obt, Total, type) => {
        const obtained = parseFloat(Obt)
        const total = parseFloat(Total)

        if (!isNaN(obtained) && !isNaN(total) && total > 0) {
            let percent

            // Check if obtained marks are valid
            if (obtained <= total) {
                percent = (obtained / total) * 100
            } else {
                percent = 0 // Set percentage to zero if obtained marks exceed total
            }

            const grade =
                percent >= 80
                    ? 'A1|#4cb050'
                    : percent >= 70
                    ? 'A|#4cb050'
                    : percent >= 60
                    ? 'B|#4cb050'
                    : percent >= 50
                    ? 'C|#4cb050'
                    : percent >= 40
                    ? 'D|#ea5a4f'
                    : 'F|#ea5a4f'

            const extColor = grade.split('|')
            if (type == 1) {
                GradeValue(extColor[0], percent.toFixed(5), extColor[1])
            } else {
                GradeValue_I(extColor[0], percent.toFixed(5), extColor[1])
            }
        } else {
            if (type == 1) {
                GradeValue(0, 0.0, '#ea5a4f')
            } else {
                GradeValue_I(0, 0.0, '#ea5a4f')
            }
        }
    }

    const GradeValue = (val, avg, col) => {
        setState({
            ...state,
            M_Color: col,
            M_Grade: val,
            M_Percentage: avg,
        })
    }

    const GradeValue_I = (val, avg, col) => {
        setState({
            ...state,
            I_Color: col,
            I_Grade: val,
            I_Percentage: avg,
        })
    }

    const {
        M_Degree,
        M_Board,
        M_PassingYear,
        M_ResultDate,
        M_MarksObt,
        M_MarksTotal,
        M_SeatNo,
        M_Percentage,
        M_Grade,
        M_Color,
        //
        I_Degree,
        I_Board,
        I_PassingYear,
        I_ResultDate,
        I_MarksObt,
        I_MarksTotal,
        I_SeatNo,
        I_Percentage,
        I_Grade,
        I_Color,
    } = state

    return (
        <div>
            {/*  */}

            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            {
                                name: 'Dashboard',
                                path: '/Tech/Tech_Dashboard',
                            },
                            { name: 'Education' },
                        ]}
                    />
                </div>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                        <CardHeader>
                            <Title>Add Educational Info</Title>
                        </CardHeader>

                        <Box width="100%">
                            <ProductTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                width: '2.8%',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            sx={{
                                                width: '10%',
                                            }}
                                        >
                                            S. No
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '26.2%',
                                            }}
                                        >
                                            Title
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '30%',
                                            }}
                                        >
                                            Matriculation / O-Levels
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '1%',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            sx={{
                                                width: '30%',
                                            }}
                                        >
                                            Intermediate / A-Levels
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {/* FIRST ROW */}

                                    <TableRow hover>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            01.
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Degree
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <Select
                                                style={styles.textBox_Margin}
                                                size="small"
                                                displayEmpty
                                                fullWidth
                                                value={M_Degree || ''}
                                                name="M_Degree"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Degree</em>
                                                </MenuItem>
                                                <MenuItem
                                                    value={'Matriculation'}
                                                >
                                                    Matriculation
                                                </MenuItem>
                                                <MenuItem value={'O-Levels'}>
                                                    O-Levels
                                                </MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <Select
                                                style={styles.textBox_Margin}
                                                size="small"
                                                displayEmpty
                                                fullWidth
                                                value={I_Degree || ''}
                                                name="I_Degree"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Degree</em>
                                                </MenuItem>
                                                <MenuItem
                                                    value={'Intermediate'}
                                                >
                                                    Intermediate
                                                </MenuItem>
                                                <MenuItem value={'A-Levels'}>
                                                    A-Levels
                                                </MenuItem>
                                            </Select>
                                        </TableCell>
                                    </TableRow>

                                    {/* SECOND ROW */}

                                    <TableRow hover>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            02.
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Board
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <Select
                                                style={styles.textBox_Margin}
                                                size="small"
                                                displayEmpty
                                                fullWidth
                                                value={M_Board || ''}
                                                name="M_Board"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Board</em>
                                                </MenuItem>
                                                {BoardMatricArray.map(
                                                    (item) => {
                                                        return (
                                                            <MenuItem
                                                                key={item.value}
                                                                value={
                                                                    item.value
                                                                }
                                                            >
                                                                {item.value}
                                                            </MenuItem>
                                                        )
                                                    }
                                                )}
                                            </Select>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <Select
                                                style={styles.textBox_Margin}
                                                size="small"
                                                displayEmpty
                                                fullWidth
                                                value={I_Board || ''}
                                                name="I_Board"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Board</em>
                                                </MenuItem>
                                                {BoardInterArray.map((item) => {
                                                    return (
                                                        <MenuItem
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.value}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </TableCell>
                                    </TableRow>

                                    {/* THIRD ROW */}

                                    <TableRow hover>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            03.
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Passing Year
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <Select
                                                style={styles.textBox_Margin}
                                                size="small"
                                                displayEmpty
                                                fullWidth
                                                value={M_PassingYear || ''}
                                                name={'M_PassingYear'}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Year</em>
                                                </MenuItem>
                                                {YearArray_Matric.map(
                                                    (item) => {
                                                        return (
                                                            <MenuItem
                                                                key={item.value}
                                                                value={
                                                                    item.value
                                                                }
                                                            >
                                                                {item.value}
                                                            </MenuItem>
                                                        )
                                                    }
                                                )}
                                            </Select>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <Select
                                                style={styles.textBox_Margin}
                                                size="small"
                                                displayEmpty
                                                fullWidth
                                                value={I_PassingYear || ''}
                                                name={'I_PassingYear'}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Year</em>
                                                </MenuItem>
                                                {YearArray.map((item) => {
                                                    return (
                                                        <MenuItem
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.value}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </TableCell>
                                    </TableRow>

                                    {/* ROW */}

                                    <TableRow hover>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            04.
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Seat No
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <TextField
                                                style={styles.textBox_Margin}
                                                size={'small'}
                                                placeholder="Enter Matric Seat #"
                                                type="number"
                                                onChange={handleChange}
                                                name="M_SeatNo"
                                                value={M_SeatNo || ''}
                                                validators={['required']}
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                            />
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <TextField
                                                style={styles.textBox_Margin}
                                                size={'small'}
                                                placeholder="Enter Inter Seat #"
                                                type="number"
                                                onChange={handleChange}
                                                name="I_SeatNo"
                                                value={I_SeatNo || ''}
                                                validators={['required']}
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {/* FORTH ROW */}

                                    <TableRow hover>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            05.
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Result Date
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DatePicker
                                                    maxDate={new Date()}
                                                    inputFormat="dd-MM-yyyy"
                                                    value={M_ResultDate || ''}
                                                    onChange={
                                                        handleDateChange_M
                                                    }
                                                    renderInput={(props) => (
                                                        <TextField
                                                            style={
                                                                styles.textBox_Margin
                                                            }
                                                            {...props}
                                                            size="small"
                                                            id="mui-pickers-date"
                                                            sx={{
                                                                mb: 2,
                                                                width: '100%',
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DatePicker
                                                    maxDate={new Date()}
                                                    inputFormat="dd-MM-yyyy"
                                                    value={I_ResultDate || ''}
                                                    onChange={
                                                        handleDateChange_I
                                                    }
                                                    renderInput={(props) => (
                                                        <TextField
                                                            style={
                                                                styles.textBox_Margin
                                                            }
                                                            {...props}
                                                            size="small"
                                                            id="mui-pickers-date"
                                                            sx={{
                                                                mb: 2,
                                                                width: '100%',
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </TableCell>
                                    </TableRow>

                                    {/* FIFTH ROW */}

                                    <TableRow hover>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            06.
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Obtained Marks
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <TextField
                                                style={styles.textBox_Margin}
                                                size={'small'}
                                                placeholder="Enter Matric Obrain Marks"
                                                type="number"
                                                name={'M_MarksObt'}
                                                value={M_MarksObt || ''}
                                                onChange={handleChange}
                                                validators={['required']}
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                                onKeyUp={() =>
                                                    calculate(
                                                        M_MarksObt,
                                                        M_MarksTotal,
                                                        1
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <TextField
                                                style={styles.textBox_Margin}
                                                size={'small'}
                                                placeholder="Enter Inter Obrain Marks"
                                                type="number"
                                                name={'I_MarksObt'}
                                                value={I_MarksObt || ''}
                                                onChange={handleChange}
                                                validators={['required']}
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                                onKeyUp={() =>
                                                    calculate(
                                                        I_MarksObt,
                                                        I_MarksTotal,
                                                        2
                                                    )
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {/* SIXTH ROW */}

                                    <TableRow hover>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            07.
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Total Marks
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <TextField
                                                style={styles.textBox_Margin}
                                                size={'small'}
                                                placeholder="Enter Matric Total Marks"
                                                type="number"
                                                onChange={handleChange}
                                                name="M_MarksTotal"
                                                value={M_MarksTotal || ''}
                                                validators={['required']}
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                                onKeyUp={() =>
                                                    calculate(
                                                        M_MarksObt,
                                                        M_MarksTotal,
                                                        1
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <TextField
                                                style={styles.textBox_Margin}
                                                size={'small'}
                                                placeholder="Enter Inter Total Marks"
                                                type="number"
                                                onChange={handleChange}
                                                name="I_MarksTotal"
                                                value={I_MarksTotal || ''}
                                                validators={['required']}
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                                onKeyUp={() =>
                                                    calculate(
                                                        I_MarksObt,
                                                        I_MarksTotal,
                                                        2
                                                    )
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {/* SEVEN ROW */}

                                    <TableRow hover>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            08.
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Percentage
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <div style={styles.disable_box}>
                                                <span
                                                    style={{
                                                        ...styles.disable_box_font,
                                                        color:
                                                            M_Color || '#000',
                                                    }}
                                                >
                                                    {M_Percentage || '0'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <div style={styles.disable_box}>
                                                <span
                                                    style={{
                                                        ...styles.disable_box_font,
                                                        color:
                                                            I_Color || '#000',
                                                    }}
                                                >
                                                    {I_Percentage || '0'}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    {/* EIGHT ROW */}

                                    <TableRow hover>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            09.
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Grade
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <div style={styles.disable_box}>
                                                <span
                                                    style={{
                                                        ...styles.disable_box_font,
                                                        color:
                                                            M_Color || '#000',
                                                    }}
                                                >
                                                    {M_Grade || '--'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <div style={styles.disable_box}>
                                                <span
                                                    style={{
                                                        ...styles.disable_box_font,
                                                        color:
                                                            I_Color || '#000',
                                                    }}
                                                >
                                                    {I_Grade || '--'}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    {/* 9TH ROW */}

                                    <TableRow hover>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            10.
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Attachment
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <RadioGroup value={isM_Image}>
                                                <FormControlLabel
                                                    value={'1'}
                                                    control={
                                                        <Radio color="success" />
                                                    }
                                                    label=""
                                                />
                                            </RadioGroup>
                                            <Button
                                                onClick={() =>
                                                    setOpenMatricImage(true)
                                                }
                                                variant="contained"
                                                component="label"
                                                sx={{
                                                    fontSize: 12,
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                SELECT Matric Marksheet
                                            </Button>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <RadioGroup value={isI_Image}>
                                                <FormControlLabel
                                                    value="1"
                                                    control={
                                                        <Radio color="success" />
                                                    }
                                                    label=""
                                                />
                                            </RadioGroup>
                                            <Button
                                                onClick={() =>
                                                    setOpenInterImage(true)
                                                }
                                                variant="contained"
                                                component="label"
                                                sx={{
                                                    fontSize: 12,
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                SELECT INTER Marksheet
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                    {/* END ROW */}
                                </TableBody>
                            </ProductTable>
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
                                    // onClick={() => setloading(true)}
                                    loading={loading}
                                    loadingIndicator="Loading…"
                                    variant="contained"
                                >
                                    Save and Next
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
                <div>
                    <Dialog
                        fullScreen={fullScreen}
                        open={OpenMatricImage}
                        onClose={() => setOpenMatricImage(false)}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            {'UPLOAD MATRIC MARKSHEET'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Card elevation={3}>
                                    <br />
                                    <ContentBox>
                                        <div
                                            style={{
                                                marginLeft: 'auto',
                                                width: '100%',
                                            }}
                                        >
                                            <img
                                                style={{
                                                    height: 300,
                                                    width: 600,
                                                    objectFit: 'contain',
                                                    backgroundColor: '#f9f9f9',
                                                }}
                                                src={
                                                    MatricPicture == ''
                                                        ? 'https://amples.se/wp-content/uploads/2017/06/wood-blog-placeholder.jpg'
                                                        : URL.createObjectURL(
                                                              MatricPicture
                                                          )
                                                }
                                            />
                                        </div>
                                        {visstate == 'visible' ? (
                                            <Button
                                                variant="contained"
                                                component="label"
                                                color="primary"
                                                onClick={() => {
                                                    setOpenMatricImage(false)
                                                    setisM_Image('1')
                                                }}
                                                sx={{
                                                    letterSpacing: '5px',
                                                    fontWeight: 'bolder',
                                                    width: '100%',
                                                    marginBottom: '20px',
                                                    marginTop: '20px',
                                                }}
                                            >
                                                SUBMIT
                                            </Button>
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    marginTop: '20px',
                                                    marginBottom: '20px',
                                                }}
                                            ></Box>
                                        )}
                                    </ContentBox>
                                </Card>
                                {/*  */}
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="success"
                                    sx={{
                                        height: '50px',
                                        fontWeight: 'bolder',
                                        width: '100%',
                                    }}
                                    onClick={() => {}}
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
                                                setMatricPicture(
                                                    e.target.files[0]
                                                )
                                                setvisstate('visible')
                                            }}
                                        />
                                    </form>
                                </Button>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>
                {/*  */}
                <div>
                    <Dialog
                        fullScreen={fullScreen}
                        open={OpenInterImage}
                        onClose={() => setOpenInterImage(false)}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            {'UPLOAD INTER MARKSHEET'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Card elevation={3}>
                                    <br />
                                    <ContentBox>
                                        <div
                                            style={{
                                                marginLeft: 'auto',
                                                width: '100%',
                                            }}
                                        >
                                            <img
                                                style={{
                                                    height: 300,
                                                    width: 600,
                                                    objectFit: 'contain',
                                                    backgroundColor: '#f9f9f9',
                                                }}
                                                src={
                                                    InterPicture == ''
                                                        ? 'https://amples.se/wp-content/uploads/2017/06/wood-blog-placeholder.jpg'
                                                        : URL.createObjectURL(
                                                              InterPicture
                                                          )
                                                }
                                            />
                                        </div>
                                        {visstate_I == 'visible' ? (
                                            <Button
                                                variant="contained"
                                                component="label"
                                                color="primary"
                                                onClick={() => {
                                                    setOpenInterImage(false)
                                                    setisI_Image('1')
                                                }}
                                                sx={{
                                                    letterSpacing: '5px',
                                                    fontWeight: 'bolder',
                                                    width: '100%',
                                                    marginBottom: '20px',
                                                    marginTop: '20px',
                                                }}
                                            >
                                                SUBMIT
                                            </Button>
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    marginBottom: '20px',
                                                    marginTop: '20px',
                                                }}
                                            ></Box>
                                        )}
                                    </ContentBox>
                                </Card>
                                {/*  */}
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="success"
                                    sx={{
                                        height: '50px',
                                        fontWeight: 'bolder',
                                        width: '100%',
                                    }}
                                    onClick={() => {}}
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
                                                setInterPicture(
                                                    e.target.files[0]
                                                )
                                                setvisstate_I('visible')
                                            }}
                                        />
                                    </form>
                                </Button>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>
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
                        severity={openMessage.type}
                        variant="filled"
                    >
                        {openMessage.message}
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

export default StatCards2
