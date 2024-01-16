import React, { useEffect, useState, forwardRef, useRef } from 'react'
import ReactToPrint, { PrintContextConsumer } from 'react-to-print'
import { H6 } from 'app/components/Typography'
import {
    Box,
    Card,
    IconButton,
    MenuItem,
    Select,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    useTheme,
    Snackbar,
    Alert,
    Link,
    Grid,
} from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { H3 } from 'app/components/Typography'
import { useSelector } from 'react-redux'
import companyLogo from '../../../components/MatxLogo/aror_logo.png'
import ABLLogo from '../../../components/MatxLogo/ABL.png'
import challanimg from '../../../components/MatxLogo/challan.png'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import moment from 'moment'
import Modal from '@mui/material/Modal'
import PrintModal from '../../Admissions/PrintModal'
//
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

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

const Small = styled('small')(({ bgcolor }) => ({
    width: 50,
    height: 15,
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const ContentBox = styled('div')(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
}))

const TopSellingTable = () => {
    //
    const [OpenChallanImage, setOpenChallanImage] = React.useState(false)
    const [OpenChallanImage_ADM, setOpenChallanImage_ADM] =
        React.useState(false)
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    //
    const [ProgramFee, setProgramFee] = useState([])
    const [ProgramFaculty, setProgramFaculty] = useState('')
    const [LetterInfo, setLetterInfo] = useState([])
    const [OpenModal_challan, setOpenModal_challan] = useState(false)
    const [visstate, setvisstate] = React.useState('hidden')
    const [divvis, setdivvis] = React.useState('hidden')
    const [divvisadmit, setdivvisadmit] = React.useState('hidden')
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState({
        type: 'success',
        title: 'Record Saved Successfully',
    })
    const [Details_Edu, setDetails_Edu] = useState([{}])
    const [Voucher, setVoucher] = useState({})
    const [openModal_offer, setopenModal_offer] = useState(false)
    const [Program, setProgram] = useState([])

    const [Details, setDetails] = useState({
        SelectQouta: [{ _id: 1, TITLE: '' }],
    })
    const [open_Modal, setOpen_Modal] = React.useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openModal_card, setOpenModal_card] = useState(false)
    const [ChallanImage, setChallanImage] = useState('')
    const [ChallanImage_ADM, setChallanImage_ADM] = useState('')
    const [age, setage] = useState('')
    const ref = useRef()

    const ComponentToPrint = forwardRef((props, ref) => {
        return (
            <div ref={ref}>
                <PrintModal.Form
                    Voucher={Voucher}
                    Program={Program}
                    infoData={infoData}
                />
            </div>
        )
    })
    //
    const ComponentToPrint_card = forwardRef((props, ref) => {
        return (
            <div ref={ref}>
                <PrintModal.Form_Card
                    Voucher={Voucher}
                    infoData={infoData}
                    userData={userData}
                    Program={Program}
                />
            </div>
        )
    })

    const ComponentToPrint_offer = forwardRef((props, ref) => {
        return (
            <div ref={ref}>
                <PrintModal.OfferLetter_Print
                    LetterInfo={LetterInfo}
                    ProgramFaculty={ProgramFaculty}
                    infoData={infoData}
                />
            </div>
        )
    })

    const ComponentToPrint_challan = forwardRef((props, ref) => {
        return (
            <div ref={ref}>
                <PrintModal.Challan
                    LetterInfo={LetterInfo}
                    infoData={infoData}
                    ProgramFee={ProgramFee}
                />
            </div>
        )
    })

    useEffect(() => {
        GETALL_CARD_ISSUED_LIST()
        runInfoAdmission()
        GETALL_DASHBOARD()
        GETALL_DASHBOARD_VOUCHER()
    }, [])
    //

    const [infoData, setinfoData] = React.useState({
        UPLOAD_CHALLAN: '',
        DOWNLOAD_CHALLAN: '',
        DOWNLOAD_ADMIT_CARD: '',
        MESSAGE_USER: false,
        CHALLAN_END_DATE: '',
        ADMIT_CARD_TEST_DATE: '',
        REPORTING_TIME: '',
        TEST_TIME: '',
        DURATION: '',
    })

    const runInfoAdmission = () => {
        axios
            .get('http://121.52.155.34:5000/UniAdmission/getAll')
            .then((response) => {
                setinfoData(response.data[0])
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //
    const navigate = useNavigate()
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.success.main
    const [DashData, setDashData] = useState([{}])
    const [ProgramData, setProgramData] = useState('')
    const Div = styled('div')(() => ({
        flexDirection: 'row',
        display: 'flex',
        borderColor: 'black',
        borderWidth: '1px',
        borderStyle: 'solid',
        paddingLeft: 10,
        borderBottomWidth: '0px',
        //
    }))
    const [openCompletion, setopenCompletion] = useState(false)

    const userData = useSelector((data) => data.loginReducer.LoginData)
    const P = styled('a')(() => ({
        width: '50%',
        fontWeight: 'bold',
        fontFamily: 'Glory-Bold',
        paddingTop: 5,
        paddingBottom: 5,
    }))
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    function handleCloseCompletion() {
        setopenCompletion(false)
        navigate('/')
    }
    const [Details_Edu_Card, setDetails_Edu_Card] = useState('')
    //
    const GETALL_Details = (id) => {
        axios
            .get('http://121.52.155.34:5000/Applicant/' + id + '')
            .then((response) => {
                setDetails(response.data)
                setOpenModal(true)
            })
            .catch(function (error) {
                console.log(error)
                alert('error1')
            })
    }
    const Edu_Details = (id) => {
        axios
            .get('http://121.52.155.34:5000/applicantEdu/' + id + '')
            .then((response) => {
                setDetails_Edu(response.data)
            })
            .catch(function (error) {
                console.log(error)
                alert('error3')
            })
    }

    const GETALL_DASHBOARD_VOUCHER = () => {
        axios
            .get('http://121.52.155.34:5000/ApplicantEdu/' + userData._id)
            .then((response) => {
                if (!response.data[0]) {
                    setProgram(response.data.SelectProgram)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const GETALL_DASHBOARD = () => {
        axios
            .get('http://121.52.155.34:5000/Applicant/adm/' + userData._id)
            .then((response) => {
                console.log(response.data, 'DATTA')
                setDashData(response.data)
                setProgramData(response.data)
                if (response.data[0]) {
                    setVoucher(response.data[0])
                }

                if (!response.data[0].IsUpdate) {
                    setdivvisadmit('visible')
                }

                if (response.data[0].isLetterIssue) {
                    setdivvis('visible')
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function handleClose() {
        setOpen_Modal(false)
    }

    const ChallanSubmit = () => {
        axios
            .get(
                'http://121.52.155.34:5000/Applicant/FormChalan/' +
                    userData._id +
                    ''
            )
            .then((response) => {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
                alert('error localhost')
            })
    }

    const [userCNIC, setuserCNIC] = useState(
        'http://admissions.bnbwu.edu.pk/assets/images/avatar2.jpg'
    )

    //
    const GETALL_CARD_ISSUED_LIST = () => {
        axios
            .get(
                'http://121.52.155.34:5000/Applicant/offerLetterList_id/' +
                    userData._id
            )
            .then((response) => {
                let modify = response.data.map((v) => {
                    const val = v.ProgramDetails[0]
                    return {
                        ...v,
                        ProgramTitle: val.ProgramTitle,
                        ProgramID: val.ProgramID,
                        isModify: val.isModify,
                        ISSUE_DATE: val.ISSUE_DATE,
                    }
                })
                const filterData = { ...modify[0] }
                console.log(response.data)
                setLetterInfo({ ...modify[0] })
                GETALL_PROGRAM_FEE(filterData.ProgramID)
                GETALL_PROGRAM_FACULTY(filterData.ProgramID)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const GETALL_PROGRAM_FEE = (id) => {
        axios
            .get('http://121.52.155.34:5000/Program/getAll_Fee/' + id)
            .then((response) => {
                setProgramFee(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const GETALL_PROGRAM_FACULTY = (id) => {
        axios
            .get('http://121.52.155.34:5000/program/getone_Faculty/' + id)
            .then((response) => {
                setProgramFaculty(response.data.FACULTY)
            })
            .catch(function (error) {
                console.log(error)
                // alert('error5')
            })
    }
    //

    const VoucherPrintChallan = () => {
        var found = false
        const arr = [{ state: ChallanImage, value: '', name: 'CHALLAN' }]

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].state == arr[i].value) {
                setMessage({
                    type: 'error',
                    title:
                        'Alert ! Please upload ' +
                        [arr[i].name] +
                        '. Image Size should be less than 1 MB.',
                })
                setOpen(true)
                found = true
                break
            }
        }
        if (!found) {
            sendFile({ folder: 'Challan', file: ChallanImage })
            // ChallanSubmit()
            axios
                .get(
                    'http://121.52.155.34:5000/Applicant/Chalan/' + userData._id
                )
                .then((res) => {})
                .catch(function (error) {
                    console.log(error)
                })
            setOpenChallanImage(false)
            setopenCompletion(true)
        }
    }

    const VoucherPrintChallan_ADM = () => {
        var found = false
        const arr = [
            { state: ChallanImage_ADM, value: '', name: 'ADMISSION CHALLAN' },
        ]

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].state == arr[i].value) {
                setMessage({
                    type: 'error',
                    title:
                        'Alert ! Please upload ' +
                        [arr[i].name] +
                        '. Image Size should be less than 1 MB.',
                })
                setOpen(true)
                found = true
                break
            }
        }
        if (!found) {
            sendFile({ folder: 'ADM_Challan', file: ChallanImage_ADM })
            axios
                .get(
                    'http://121.52.155.34:5000/Applicant/FormChalan/' +
                        userData._id
                )
                .then((res) => {})
                .catch(function (error) {
                    console.log(error)
                })
            setOpenChallanImage_ADM(false)
            setopenCompletion(true)
        }
    }
    //
    const sendFile = (val) => {
        const data = new FormData()
        const file = val.file
        data.append('image', file)

        axios({
            method: 'post',
            data: data,
            url:
                'http://121.52.155.34:5000/applicantImg/upload?folder=' +
                val.folder +
                '&CNIC=' +
                userData.CNIC,
            headers: { 'content-type': 'multipart/form-data' },
        })
    }

    const StyledButton = styled(Button)(({ theme }) => ({
        margin: theme.spacing(1),
    }))

    const [img_UploadChallan, setimg_UploadChallan] = useState('')

    const numbers = [
        { Type: 'Bank Copy' },
        { Type: 'Bank Copy by Student' },
        { Type: 'Student Copy' },
        { Type: 'University Copy' },
    ]
    const [picture, setPicture] = useState(null)

    return (
        <>
            {infoData.MESSAGE_USER ? (
                <Alert
                    style={{ marginBottom: 20, backgroundColor: '#ff7369' }}
                    variant="filled"
                    severity="warning"
                >
                    The admissions has been closed - So you can not apply for
                    online admissions
                </Alert>
            ) : null}
            <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                <CardHeader>
                    <Title>My Applications</Title>
                </CardHeader>

                <Box width="100%">
                    <ProductTable>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        width: '12%',
                                        paddingLeft: 2,
                                    }}
                                >
                                    View Form
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '20%',
                                    }}
                                >
                                    Program
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '15%',
                                    }}
                                >
                                    Form No
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '15%',
                                    }}
                                >
                                    Applied Date
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '12%',
                                    }}
                                >
                                    Fee
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '20%',
                                    }}
                                >
                                    Action
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '6%',
                                    }}
                                >
                                    Edit
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {DashData?.map((product, index) => (
                                <>
                                    <TableRow key={index} hover>
                                        <TableCell
                                            align="left"
                                            onClick={() => {
                                                GETALL_Details(
                                                    product.ApplicantID
                                                )
                                                Edu_Details(product.ApplicantID)
                                            }}
                                        >
                                            <Small
                                                bgcolor={bgPrimary}
                                                style={{
                                                    cursor: 'pointer',
                                                    borderRadius: '5px',
                                                    fontSize: '14px',
                                                    width: '100%',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                View Form
                                            </Small>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {Program.slice(0, 1).map(
                                                (value) => {
                                                    return value.PROGRAM_TITLE
                                                }
                                            )}
                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {product.FormID}
                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {moment(product.createdAt).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Small
                                                bgcolor={bgError}
                                                style={{
                                                    cursor: 'not-allowed',
                                                    borderRadius: '5px',
                                                    fontSize: '14px',
                                                    width: '100%',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {product.FeeStatus}
                                            </Small>
                                        </TableCell>

                                        <TableCell>
                                            <Select
                                                value={age}
                                                displayEmpty
                                                style={{ width: '90%' }}
                                                size="small"
                                                inputProps={{
                                                    'aria-label':
                                                        'Without label',
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>-- Select Action</em>
                                                </MenuItem>
                                                <MenuItem
                                                    disabled={
                                                        product.FeeStatus !==
                                                        'PENDING'
                                                            ? true
                                                            : false
                                                    }
                                                    onClick={() =>
                                                        setOpen_Modal(true)
                                                    }
                                                >
                                                    Download Challan
                                                </MenuItem>

                                                <MenuItem
                                                    disabled={
                                                        product.FeeStatus !==
                                                        'PENDING'
                                                            ? true
                                                            : false
                                                    }
                                                    onClick={() =>
                                                        setOpenChallanImage(
                                                            true
                                                        )
                                                    }
                                                >
                                                    Upload Challan
                                                </MenuItem>
                                                <MenuItem
                                                    // disabled={product.IsUpdate}
                                                    onClick={() =>
                                                        setOpenModal_card(true)
                                                    }
                                                >
                                                    Download Admit Card
                                                </MenuItem>

                                                <MenuItem
                                                    disabled={
                                                        !product.isLetterIssue
                                                    }
                                                    onClick={() =>
                                                        setopenModal_offer(true)
                                                    }
                                                >
                                                    Download Offer Letter
                                                </MenuItem>
                                                <MenuItem
                                                    disabled={
                                                        !product.isLetterIssue
                                                    }
                                                    onClick={() =>
                                                        setOpenModal_challan(
                                                            true
                                                        )
                                                    }
                                                >
                                                    Download Admission Challan
                                                </MenuItem>
                                                <MenuItem
                                                    disabled={
                                                        !product.isLetterIssue
                                                    }
                                                    onClick={() =>
                                                        setOpenChallanImage_ADM(
                                                            true
                                                        )
                                                    }
                                                >
                                                    Upload Paid Admission
                                                    Challan
                                                </MenuItem>
                                                {/* <MenuItem>
                                                    Download Forms
                                                </MenuItem> */}
                                            </Select>
                                        </TableCell>

                                        <TableCell>
                                            <Link href="#" underline="hover">
                                                {'Edit'}
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </ProductTable>

                    <div
                        style={!divvis === 'visible' ? {} : { display: 'none' }}
                    >
                        <Button
                            disabled={
                                infoData.DOWNLOAD_CHALLAN === 'CLOSED'
                                    ? true
                                    : false
                            }
                            variant="contained"
                            component="label"
                            color="primary"
                            onClick={() => setopenModal_offer(true)}
                            sx={{
                                letterSpacing: '5px',
                                fontWeight: 'bolder',
                                width: '95%',
                                margin: '20px',
                                visibility: divvis,
                            }}
                        >
                            DOWNLOAD ADMISSION OFFER LETTER
                        </Button>
                    </div>
                </Box>

                {/* POPUP MESSAGE */}

                <Dialog
                    fullScreen
                    open={openModal_card}
                    onClose={() => setOpenModal_card(false)}
                >
                    <AppBar
                        sx={{ position: 'relative' }}
                        style={{ background: '#323639' }}
                    >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => setOpenModal_card(false)}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </IconButton>

                            <H3
                                sx={{
                                    flex: 1,
                                    marginLeft: theme.spacing(2),
                                }}
                            >
                                Admit Card Details
                            </H3>
                            {/* PRINT */}

                            <ReactToPrint content={() => ref.current}>
                                <PrintContextConsumer>
                                    {({ handlePrint }) => (
                                        <div
                                            style={{
                                                textAlign: 'right',
                                            }}
                                        >
                                            <StyledButton
                                                onClick={handlePrint}
                                                type="submit"
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                    letterSpacing: '5px',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                PRINT ADMIT CARD
                                            </StyledButton>
                                        </div>
                                    )}
                                </PrintContextConsumer>
                            </ReactToPrint>
                        </Toolbar>
                    </AppBar>

                    <Box width="100%" overflow="auto">
                        <div>
                            <div id="divToPrint">
                                <ComponentToPrint_card ref={ref} />
                            </div>
                        </div>
                    </Box>
                </Dialog>

                <Dialog fullScreen open={open_Modal}>
                    <AppBar
                        sx={{ position: 'relative' }}
                        style={{ background: '#323639' }}
                    >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <H6
                                sx={{
                                    flex: 1,
                                    marginLeft: theme.spacing(2),
                                }}
                            >
                                Challan Preview
                            </H6>

                            <ReactToPrint content={() => ref.current}>
                                <PrintContextConsumer>
                                    {({ handlePrint }) => (
                                        <div
                                            style={{
                                                textAlign: 'right',
                                            }}
                                        >
                                            <StyledButton
                                                onClick={handlePrint}
                                                type="submit"
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                    letterSpacing: '5px',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                PRINT CHALLAN
                                            </StyledButton>
                                        </div>
                                    )}
                                </PrintContextConsumer>
                            </ReactToPrint>
                        </Toolbar>
                    </AppBar>
                    <Box width="100%" overflow="auto">
                        <div>
                            <div id="divToPrint">
                                <ComponentToPrint ref={ref} />
                            </div>
                        </div>
                    </Box>
                </Dialog>

                <Dialog
                    fullScreen
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <AppBar
                        sx={{ position: 'relative' }}
                        style={{ background: '#323639' }}
                    >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => setOpenModal(false)}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </IconButton>

                            <H3
                                sx={{
                                    flex: 1,
                                    marginLeft: theme.spacing(2),
                                }}
                            >
                                Applicant Detail
                            </H3>
                        </Toolbar>
                    </AppBar>

                    <Box width="100%" overflow="auto">
                        <div
                            style={{
                                backgroundColor: '#525659',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    padding: 50,
                                    width: '800px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>
                                        <img
                                            style={{
                                                height: 90,
                                                width: 90,
                                                marginTop: '-100px',
                                            }}
                                            src={companyLogo}
                                        ></img>
                                    </div>
                                    <div
                                        style={{
                                            paddingLeft: 20,
                                            marginTop: '-100px',
                                            paddingRight: '-59px',
                                        }}
                                    >
                                        <h2
                                            style={{ fontFamily: 'Glory-Bold' }}
                                        >
                                            Peoples University of Medical &
                                            <br />
                                            Health Science for Women
                                            <br />
                                        </h2>
                                        <P style={{ marginRight: '-20px' }}>
                                            Form # : {Details.FormID}
                                        </P>
                                    </div>

                                    <div>
                                        <div>
                                            <img
                                                style={{
                                                    height: 200,
                                                    width: 200,
                                                }}
                                                src={`http://121.52.155.34:5000/uploads/Profile/${userData.CNIC}.jpg`}
                                                alt="Profile"
                                            />{' '}
                                        </div>{' '}
                                    </div>
                                </div>
                                {/* HEADER */}
                                <div
                                    style={{
                                        marginTop: '-53px',
                                        marginBottom: 50,
                                        marginLeft: 80,
                                    }}
                                >
                                    <P
                                        style={{
                                            fontWeight: 'normal',
                                            fontSize: 16,
                                            backgroundColor: '#7f6000',
                                            color: '#fff',
                                            paddingLeft: 30,
                                            paddingRight: 39,
                                        }}
                                    >
                                        ADMISSION FORM Fall 2022-2023
                                    </P>
                                    <div></div>
                                </div>
                                {/* HEADER */}
                                <div
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#7f6000',
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        marginBottom: 15,
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                    }}
                                >
                                    <P
                                        style={{
                                            fontWeight: 'normal',
                                            fontSize: 16,
                                            color: '#fff',
                                            paddingLeft: 30,
                                        }}
                                    >
                                        PART - I: PERSONAL INFORMATION
                                    </P>
                                </div>
                                <div>
                                    <Div>
                                        <P style={{}}>
                                            Name : {Details.S_name}
                                        </P>
                                    </Div>
                                    <Div>
                                        <P
                                            style={{
                                                width: '50%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Father's / Legal Guardian's Name :
                                            {'    '}
                                            {Details.F_Name}
                                        </P>
                                    </Div>
                                    <Div>
                                        <P
                                            style={{
                                                width: '50%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Date of Birth :{' '}
                                            {Details.DOB?.slice(0, 10)}
                                        </P>
                                    </Div>
                                    <Div>
                                        <P
                                            style={{
                                                width: '50%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Country : {Details.Country}
                                        </P>

                                        <P>Province : {Details.Province}</P>

                                        <P
                                            style={{
                                                width: '50%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            City : {Details.City}
                                        </P>
                                    </Div>
                                    <Div>
                                        <P
                                            style={{
                                                width: '50%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Cell No : {Details.S_Contact}
                                        </P>
                                        <P
                                            style={{
                                                width: '50%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Father's / Legal Guardian's Cell No:
                                            {Details.F_Contact}
                                        </P>
                                    </Div>
                                    <Div>
                                        <P
                                            style={{
                                                width: '100%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            National Identity Card #/ B-Form
                                            #/Passport # : {Details.CNIC}
                                        </P>
                                    </Div>
                                    <Div>
                                        <P
                                            style={{
                                                width: '50%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Father's / Legal Guardian's
                                            Occupation:
                                            {Details.F_OCC}
                                        </P>
                                    </Div>
                                    <Div>
                                        <P
                                            style={{
                                                width: '100%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Quota: {Details.Qouta}
                                        </P>
                                    </Div>
                                    <Div>
                                        <P
                                            style={{
                                                width: '100%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Current / Permanent Address:
                                            {Details.C_Address}
                                        </P>
                                    </Div>
                                    <Div style={{ borderBottomWidth: '1px' }}>
                                        <P
                                            style={{
                                                width: '100%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Mailing / Postal Address:
                                            {Details.PerAddress}
                                        </P>
                                    </Div>
                                </div>
                                {/* EDU */}
                                <div
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#7f6000',
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        marginTop: 15,
                                        marginBottom: 15,
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                    }}
                                >
                                    <P
                                        style={{
                                            fontWeight: 'normal',
                                            fontSize: 16,
                                            color: '#fff',
                                            paddingLeft: 30,
                                        }}
                                    >
                                        PART - II: EDUCATIONAL INFORMATION
                                    </P>
                                </div>
                                {/* EDU */}
                                <div
                                    style={{
                                        borderColor: 'black',
                                        borderBottomWidth: '1px',
                                        borderBottomStyle: 'solid',
                                    }}
                                >
                                    <Div>
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Board
                                        </P>
                                        <P
                                            style={{
                                                width: '20%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Marks Obtained
                                        </P>
                                        <P
                                            style={{
                                                width: '15%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Total Marks
                                        </P>
                                        <P
                                            style={{
                                                width: '15%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Percentage
                                        </P>
                                        <P
                                            style={{
                                                width: '15%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            PassingYear
                                        </P>
                                        <P
                                            style={{
                                                width: '15%',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            School
                                        </P>
                                    </Div>
                                    {/*  */}
                                    {Details_Edu.ApplicantEdu?.map(
                                        (product, index) => (
                                            <Div key={index}>
                                                <P
                                                    style={{
                                                        width: '30%',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {product.board}
                                                </P>
                                                <P
                                                    style={{
                                                        width: '20%',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {product.Obtained}
                                                </P>
                                                <P
                                                    style={{
                                                        width: '15%',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {product.Total}
                                                </P>
                                                <P
                                                    style={{
                                                        width: '15%',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {product.per}
                                                </P>
                                                <P
                                                    style={{
                                                        width: '15%',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {product.year}
                                                </P>
                                                <P
                                                    style={{
                                                        width: '15%',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {product.school}
                                                </P>
                                            </Div>
                                        )
                                    )}
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#7f6000',
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        marginTop: 15,
                                        marginBottom: 15,
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                    }}
                                >
                                    <P
                                        style={{
                                            fontWeight: 'normal',
                                            fontSize: 16,
                                            color: '#fff',
                                            paddingLeft: 30,
                                        }}
                                    >
                                        PART - III: PROGRAMS
                                    </P>
                                    {/*  */}
                                </div>
                                <div
                                    style={{
                                        borderColor: 'black',
                                        borderBottomWidth: '1px',
                                        borderBottomStyle: 'solid',
                                    }}
                                >
                                    {Details_Edu.SelectProgram?.map(
                                        (product, index) => (
                                            <Div key={index}>
                                                <P
                                                    style={{
                                                        width: '30%',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {index + 1}.{' '}
                                                    {product.PROGRAM_TITLE}
                                                </P>
                                            </Div>
                                        )
                                    )}
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#7f6000',
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        marginTop: 15,
                                        marginBottom: 15,
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                    }}
                                >
                                    <P
                                        style={{
                                            fontWeight: 'normal',
                                            fontSize: 16,
                                            color: '#fff',
                                            paddingLeft: 30,
                                        }}
                                    >
                                        PART - IV: UNDERTAKING BY APPLICANT
                                    </P>
                                    {/*  */}
                                </div>
                                <div
                                    style={{
                                        borderColor: 'black',
                                        borderBottomWidth: '1px',
                                        borderBottomStyle: 'solid',
                                    }}
                                >
                                    <P
                                        style={{
                                            width: '30%',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        It is Solemnly affirmed that all the
                                        information provided in this Admission
                                        Form is correct. If any information
                                        contained herein is found to be untrue,
                                        I shall be liable to any disciplinary
                                        action including rejection of this
                                        Admission Form by{' '}
                                        <b sx={{ fontWeight: 'bolder' }}>
                                            Peoples University of Medical &
                                            Health Science for Women for Fall
                                            2022-2023
                                        </b>
                                        . If approved I further affirmed that I
                                        have read and understood all the
                                        instructions of this Admission Form and
                                        shall abide by them.
                                    </P>
                                    <br />
                                    <br />
                                    <br />
                                    <br />

                                    <P
                                        style={{
                                            width: '30%',
                                            fontWeight: 'bold',
                                            marginTop: '20px',
                                        }}
                                    >
                                        Student's Signature __________________
                                        Father's / Guardian's Signature
                                        __________________
                                    </P>

                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <div>
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            REQUIRED DOCUMENTS (Attested):
                                        </P>
                                    </div>
                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            1. Pass Certificates (Matric &
                                            Intermediate)
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            2. Mark sheets (Matric &
                                            Intermediate)
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            3. Student’s CNIC / B-form
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            4. Father’s / Guardian’s CNIC
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            5. University Paid Challan Copy
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            6. Nadra Verified Covid Certificate
                                        </P>
                                    </div>
                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            7. Applicant's Domicile
                                        </P>
                                    </div>

                                    <br />
                                    <br />
                                    <br />
                                    <div>
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            REQUIRED DOCUMENTS For A Levels
                                            (Attested) :
                                        </P>
                                    </div>
                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            1. Equivalence Certificate & Mark
                                            sheet
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            2. Pass Certificates (O levels)
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            3. Mark sheets (O levels)
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            4. Student’s CNIC / B-form
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            5. Father’s / Guardian’s CNIC
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            6. University Paid Challan Copy
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            7. Nadra Verified Covid Certificate
                                        </P>
                                    </div>

                                    <div>
                                        {' '}
                                        <P
                                            style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                marginTop: '20px',
                                            }}
                                        >
                                            8. Applicant's Domicile
                                        </P>
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            {/*  */}
                        </div>
                    </Box>
                </Dialog>
                {/* OLD VOUCHER BELOW */}
                <Dialog
                    fullScreen
                    // open={open_Modal}
                    // TransitionComponent={Transition}
                >
                    <div
                        style={{
                            width: '100%',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 20,
                            flexDirection: 'row',
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {numbers.map((item) => (
                            <div
                                style={{
                                    paddingTop: 2,
                                    borderColor: 'black',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    marginRight: 10,
                                    marginBottom: 10,
                                    width: '25%',
                                }}
                            >
                                <div
                                    style={{
                                        marginLeft: 10,
                                        marginRight: 10,
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        <i>
                                            <img
                                                // src="/assets/images/aror_logo.png"
                                                src={companyLogo}
                                                width="100px"
                                                height="100px"
                                            />
                                        </i>
                                    </div>
                                    {/* <br /> */}
                                    <h6
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                            marginTop: '-10px',
                                        }}
                                    >
                                        {item.Type}
                                    </h6>
                                    {/* <br /> */}
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            marginTop: '-15px',
                                        }}
                                    >
                                        ADMISSION TEST FEE VOUCHER Fall
                                        2022-2023
                                    </p>
                                    <table
                                        style={{
                                            width: '100%',
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '17%',
                                                    paddingLeft: 4,
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Form#
                                            </td>
                                            <td
                                                style={{
                                                    width: '33%',
                                                    fontSize: 12,
                                                }}
                                            >
                                                {Voucher.FormID}
                                            </td>
                                            <td
                                                style={{
                                                    width: '22%',
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Issue Date
                                            </td>
                                            <td
                                                style={{
                                                    width: '28%',
                                                    fontSize: 12,
                                                }}
                                            >
                                                {moment().format('DD-MM-YYYY')}
                                            </td>
                                        </tr>
                                    </table>
                                    <br />
                                    <table
                                        style={{
                                            width: '100%',
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '34%',
                                                    paddingLeft: 4,
                                                    borderWidth: 1,
                                                    borderColor: 'black',
                                                    borderStyle: 'solid',
                                                    backgroundColor:
                                                        'lightgray',
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Name
                                            </td>
                                            <td
                                                style={{
                                                    width: '66%',
                                                    fontSize: 12,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                {Voucher.S_name}
                                            </td>
                                        </tr>
                                    </table>
                                    <table
                                        style={{
                                            width: '100%',
                                            borderWidth: 1,
                                            borderTop: 0,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '34%',
                                                    paddingLeft: 4,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        'lightgray',
                                                    borderStyle: 'solid',
                                                    borderTop: 0,
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Father's Name
                                            </td>
                                            <td
                                                style={{
                                                    width: '66%',
                                                    fontSize: 12,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                {Voucher.F_Name}
                                            </td>
                                        </tr>
                                    </table>
                                    <table
                                        style={{
                                            width: '100%',
                                            border: 1,
                                            borderTop: 0,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '34%',
                                                    paddingLeft: 4,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        'lightgray',
                                                    borderTop: 0,
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    borderStyle: 'solid',
                                                }}
                                            >
                                                CNIC/B-Form #
                                            </td>
                                            <td
                                                style={{
                                                    width: '66%',
                                                    fontSize: 12,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                {Voucher.CNIC}
                                            </td>
                                        </tr>
                                    </table>
                                    <br />
                                    <div style={{ textAlign: 'center' }}>
                                        <i>
                                            <img
                                                src={ABLLogo}
                                                width="60px"
                                                height="50px"
                                            />
                                        </i>
                                    </div>
                                    <br />
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            marginTop: -10,
                                        }}
                                    >
                                        ABL A/C-0010098089020032
                                    </p>
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            marginTop: -5,
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        PUMS University Collection Account
                                    </p>
                                    <table
                                        style={{
                                            width: '100%',
                                            border: 1,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '38%',
                                                    paddingLeft: 4,
                                                    borderWidth: 1,
                                                    borderStyle: 'solid',
                                                    backgroundColor:
                                                        'lightgray',
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Program
                                            </td>
                                            <td
                                                style={{
                                                    width: '62%',
                                                    fontSize: 12,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                {Program.slice(0, 1).map(
                                                    (value) => {
                                                        return value.PROGRAM_TITLE
                                                    }
                                                )}
                                            </td>
                                        </tr>
                                    </table>
                                    <table
                                        style={{
                                            width: '100%',
                                            border: 1,
                                            borderTop: 0,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '38%',
                                                    paddingLeft: 4,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        'lightgray',
                                                    borderTop: 0,
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    borderStyle: 'solid',
                                                }}
                                            >
                                                Admission Fee
                                            </td>
                                            <td
                                                style={{
                                                    width: '62%',
                                                    fontSize: 12,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                Rs. 1,200/
                                            </td>
                                        </tr>
                                    </table>
                                    <br />
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                        }}
                                    >
                                        <b>Due Date / Validity Date: </b>
                                        {infoData.CHALLAN_END_DATE}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            marginLeft: 17,
                                        }}
                                    >
                                        PAYMENT TERMS
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 26,
                                        }}
                                    >
                                        • Mode of Payment :- Local Pay Order /
                                        Allied
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 34,
                                            marginTop: -12,
                                        }}
                                    >
                                        Bank CC
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 27,
                                            marginTop: -12,
                                        }}
                                    >
                                        • Cheques are unacceptable
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 27,
                                            marginTop: -12,
                                        }}
                                    >
                                        • Pay Order / Allied Bank CC is
                                        acceptable till
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 34,
                                            marginTop: -12,
                                        }}
                                    >
                                        due date
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 27,
                                            marginTop: -12,
                                        }}
                                    >
                                        • No challan is acceptable after due
                                        date
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 27,
                                            marginTop: -12,
                                        }}
                                    >
                                        • PayOrder should be in favour of The
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 35,
                                            marginTop: -12,
                                        }}
                                    >
                                        The PUMS University Collection Account
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 35,
                                            marginTop: -12,
                                        }}
                                    >
                                        Account.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Dialog>

                {/*  */}
                <Dialog
                    fullScreen
                    open={openModal_offer}
                    onClose={() => setopenModal_offer(false)}
                    TransitionComponent={Transition}
                >
                    <AppBar
                        sx={{ position: 'relative' }}
                        style={{ background: '#323639' }}
                    >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => setopenModal_offer(false)}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </IconButton>

                            {/* <img src={companyLogo}></img> */}
                            <H3
                                sx={{
                                    flex: 1,
                                    marginLeft: theme.spacing(2),
                                }}
                            >
                                Offer Letter Details
                            </H3>
                            {/* PRINT */}

                            <ReactToPrint content={() => ref.current}>
                                <PrintContextConsumer>
                                    {({ handlePrint }) => (
                                        <div
                                            style={{
                                                textAlign: 'right',
                                            }}
                                        >
                                            <StyledButton
                                                onClick={handlePrint}
                                                type="submit"
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                    letterSpacing: '5px',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                PRINT OFFER LETTER
                                            </StyledButton>
                                        </div>
                                    )}
                                </PrintContextConsumer>
                            </ReactToPrint>
                        </Toolbar>
                    </AppBar>

                    <Box width="100%" overflow="auto">
                        <div>
                            <div id="divToPrint">
                                <ComponentToPrint_offer ref={ref} />
                            </div>
                        </div>
                    </Box>
                </Dialog>

                <Dialog
                    fullScreen
                    open={OpenModal_challan}
                    onClose={() => setOpenModal_challan(false)}
                    // TransitionComponent={Transition}
                >
                    <AppBar
                        sx={{ position: 'relative' }}
                        style={{ background: '#323639' }}
                    >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => setOpenModal_challan(false)}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </IconButton>

                            {/* <img src={companyLogo}></img> */}
                            <H3
                                sx={{
                                    flex: 1,
                                    marginLeft: theme.spacing(2),
                                }}
                            >
                                Challan Details
                            </H3>
                            {/* PRINT */}

                            <ReactToPrint content={() => ref.current}>
                                <PrintContextConsumer>
                                    {({ handlePrint }) => (
                                        <div
                                            style={{
                                                textAlign: 'right',
                                            }}
                                        >
                                            <StyledButton
                                                onClick={handlePrint}
                                                type="submit"
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                    letterSpacing: '5px',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                PRINT CHALLAN
                                            </StyledButton>
                                        </div>
                                    )}
                                </PrintContextConsumer>
                            </ReactToPrint>
                        </Toolbar>
                    </AppBar>

                    <Box width="100%" overflow="auto">
                        <div>
                            <div id="divToPrint">
                                <ComponentToPrint_challan ref={ref} />
                            </div>
                        </div>
                    </Box>
                </Dialog>
            </Card>

            <Modal
                open={openCompletion}
                onClose={handleCloseCompletion}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description">
                        <div style={{ textAlign: 'center' }}>
                            <img
                                width={300}
                                // src="/assets/images/aror_logo.png"
                                src={challanimg}
                            />

                            <h2>
                                Dear Applicant, Thank You for Submitting
                                Challan.{' '}
                            </h2>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            {/*  */}
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={OpenChallanImage}
                    onClose={() => setOpenChallanImage(false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {'UPLOAD PAID CHALLAN'}
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
                                                width: '100%',
                                                size: 'cover',
                                            }}
                                            src={
                                                ChallanImage == ''
                                                    ? 'https://www.namibiansun.com/theme_namibiansun/images/no-image.jpg'
                                                    : URL.createObjectURL(
                                                          ChallanImage
                                                      )
                                            }
                                        />
                                    </div>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        onClick={() => VoucherPrintChallan()}
                                        sx={{
                                            letterSpacing: '5px',
                                            fontWeight: 'bolder',
                                            width: '100%',
                                            marginBottom: '20px',
                                            marginTop: '20px',
                                            visibility: visstate,
                                        }}
                                    >
                                        SUBMIT
                                    </Button>
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
                                UPLOAD PAID CHALLAN
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
                                            setChallanImage(e.target.files[0])
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
                    open={OpenChallanImage_ADM}
                    onClose={() => setOpenChallanImage_ADM(false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {'UPLOAD PAID CHALLAN'}
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
                                                width: '100%',
                                                size: 'cover',
                                            }}
                                            src={
                                                ChallanImage_ADM == ''
                                                    ? 'https://www.namibiansun.com/theme_namibiansun/images/no-image.jpg'
                                                    : URL.createObjectURL(
                                                          ChallanImage_ADM
                                                      )
                                            }
                                        />
                                    </div>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        onClick={() =>
                                            VoucherPrintChallan_ADM()
                                        }
                                        sx={{
                                            letterSpacing: '5px',
                                            fontWeight: 'bolder',
                                            width: '100%',
                                            marginBottom: '20px',
                                            marginTop: '20px',
                                            visibility: visstate,
                                        }}
                                    >
                                        SUBMIT
                                    </Button>
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
                                UPLOAD ADMISSION PAID CHALLAN
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
                                            setChallanImage_ADM(
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
            <Snackbar
                open={open}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={() => setOpen(false)}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    sx={{ width: '100%' }}
                    severity={message.type}
                    variant="filled"
                >
                    {message.title}
                </Alert>
            </Snackbar>
        </>
    )
}

const productList = [
    {
        Program: 'BS-CS',
        FormNo: 'BS202201',
        Date: '01-Sep-22',
        Status: 'Pending',
        Fee: 0,
    },
]

export default TopSellingTable
